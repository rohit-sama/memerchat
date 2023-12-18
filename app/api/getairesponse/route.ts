import { connectDb } from "@/utils/db.js";
import axios from "axios";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require('mongoose');
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { ChatData } from "@/models/ChatData"
import { auth } from '@clerk/nextjs';


export async function POST(req: Request, res: Response) {

  try {

    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { context } = await req.json();

    await connectDb();
    ChatData.findOne({ userId: userId }).then((existingData) => {
      if (existingData) {
        console.log("data exists")
      } else {
        // If no document exists for the userId, create a new ChatData instance
        const newData = new ChatData({
          userId: userId,
          history: [
            {
              role: "user",
              parts: "Hello, select a emotion and a keyword from your response that you think is important and whenever you want to give a response in future just type 'emotion and keyword |' and then your response",
            },
            {
              role: "model",
              parts: "happy hello | Great to meet you. What would you like to know?",
            },
            {
              role: "user",
              parts: "hello",
            },
            {
              role: "model",
              parts: "happy hello | hey, how are you doing",
            },
            {
              role: "user",
              parts: "why arent you replying as i have said you to reply?",
            },
            {
              role: "model",
              parts: "sad reply | I apologize for not following your instructions correctly. I am still under development and learning to navigate different types of interactions. Can you please provide me with a clear and specific example of how you would like me to respond in certain situations?",
            },
            {
              role: "user",
              parts: "only reply as i have said to reply before and dont give same response twice",
            },
            {
              role: "model",
              parts: "embarrased ok | I apologize for not following your instructions correctly. i will reply as you have instructed to me in the starting of our conversation",
            },
            
          ]
        });
        // Save the new ChatData instance
        return newData.save();
      }
    })

    // Define a type for each item in the history array
    interface HistoryItem {
      role: string;
      parts: string;
      _id: string;
    }
    // Define the structure of the entire history data
    interface ChatHistory {
      toJSON: any;
      _id: string;
      history: HistoryItem[];
      __v: number;

    }


    const history: ChatHistory | null = await ChatData.findOne({ userId: userId });
    let finalHistory: { role: string; parts: string }[] = [];
    if (history) {
      const historyData: ChatHistory = history.toJSON();

      finalHistory = historyData.history.map(
        (item: HistoryItem) => {
          return {
            role: item.role,
            parts: item.parts,
          };
        }
      );

      console.log(finalHistory);
    }



    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);


    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: finalHistory,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const resultchat = await chat.sendMessage(context);
    const responsechat = await resultchat.response;
    const textchat = responsechat.text();
    const finalResponse = textchat.split("|");
    const gifresponse = finalResponse[0] + 'meme indian';
    const responsegif = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=AufhSdFV4jsryCg9jVIRZz7VGsHktrix&q=${gifresponse}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
      {}
    );
    const random = Math.floor(Math.random() * 3);
    const inputGif = responsegif.data.data[random].images.original.url;
    console.log(gifresponse)
    let SavedData;

    ChatData.findOne({ userId: userId })
      .then((existingData) => {
        if (existingData) {
          // If a document exists for the userId, update it by appending to the history
          existingData.history.push({
            role: "user",
            parts: context,
          });
          existingData.history.push({
            role: "model",
            parts: textchat,
            gif: inputGif,
          });
          console.log(inputGif)
          // Save the updated document
          return existingData.save();
        }
      })
      .then((savedData) => {
        SavedData = savedData;

      })
      .catch((err) => {
        console.error('Error updating or creating ChatData:', err);
      });
    // const outputGif = 'output.gif';
    // const textToDraw = finalResponse[1];

    // const ffmpeg = createFFmpeg({ log: true });
    // await ffmpeg.load();
    // ffmpeg.FS('writeFile', 'input.gif', await fetchFile(inputGif));
    // await ffmpeg.run('-i', 'input.gif', 'output.mp4');
    // const data = ffmpeg.FS('readFile', 'output.gif');
    // const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/gif' }));

    console.log(SavedData);
    const finalresult = JSON.stringify(SavedData);
    return new Response(finalresult, { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response("error", { status: 500, headers: { 'Content-Type': 'application/json' } })
  }

}