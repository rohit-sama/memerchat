"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";


interface ChatData {
  _id: string;
  userId: string;
  history: ChatMessage[];
  // Other properties
}
interface ChatMessage {
  role: "user" | "model";
  parts: string;
  gif: string;
  // Add any other properties if needed
}

interface User {
  user : string
}
const Chat = (user: User) => {
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [finalResult, setFinalResult] = useState<ChatData>();
  const [history, sethistory] = useState();
  const handlechange = (event: any) => {
    setMessage(event.target.value);
  };
console.log(user)
  const handleSubmit = async (event : any) => {
    event.preventDefault();
    if (!message) {
      alert("Please enter something");
    } else {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await axios.post("/api/getairesponse", {
          context: message,
        });
        getHistory();
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("server is down, please try again later");
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success/failure
        setMessage(""); // Reset the input value
        getHistory();
      }
    }
  };
  useEffect(() => {
    if (bottomRef.current === null) {
    } else {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, history]);


  const handleKeyPress = (event : any) => {
    if (event.key === 'Enter' && !isLoading) {
      event.preventDefault();
      handleSubmit(event);
    }
  };



  const getHistory = async () => {
    try {
      const response = await axios.get("/api/gethistory");
      if (response.status === 200) {
        // Set the response data directly to the state
        setFinalResult(response.data);
        sethistory(response.data.history);
      } else {
        console.error("Failed to fetch history:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching history:");
    }
  };

  useEffect(() => {
    getHistory();
  }, []);


  return (
    <div className="bg-black">
      <div className="lg:mx-20 min-h-[85vh]  flex flex-col justify-end">
        {/* Chat Messages */}
        <div className="flex-grow pt-20 flex flex-col p-4">
  {/* Rendering Chat History */}
  {finalResult?.history && finalResult.history.length > 0 ? (
    finalResult.history.slice(8).map((message, index) => (
      <div
        key={index}
        className={`flex  justify-${
          message.role === "user" ? "end" : "start pb-10"
        } mb-4`}
      >
         {message.role !== "user"  && ( /* Conditionally rendering image */
            <Image width={25} height={25} src="/favicon.ico" alt="" className="w-12 h-12 rounded-full ml-2" />
          )}
        <div className="flex items-center"> {/* Added a wrapper div for message and image */}
          <div className="bg-gray-900 bg-opacity-20 border-2 border-gray-800 rounded-lg p-3 max-w-md mx-2">
            {message.role === "user" ? (
              // <Image src={} />
              <p className="text-white">{message.parts}</p>
            ) : (
              <div>
                {typeof message.parts.split("|").length ? (
                  <p className="text-white">{message.parts.split("|")[1]}</p>
                ) : (
                  <p className="text-white">{message.parts}</p>
                )}
              </div>
            )}
            {message.gif && (
              <img src={message.gif} alt="" className="mt-2 rounded-md" />
            )}
          </div>
          {message.role !== "model" && user.user  && ( /* Conditionally rendering image */
            <Image width={25} height={25} src={user.user} alt="" className="w-12 h-12 rounded-full ml-2" />
          )}
        </div>
        <div ref={bottomRef} />
      </div>
    ))
  ) : (
    <div className="pt-20">
      <p className="text-gray-400 text-center">
        No chat history available
      </p>
      <h1 className="text-2xl text-gray-300 text-center">
        START CHATTING NOW !!
      </h1>
    </div>
  )}
</div>


<form onSubmit={handleSubmit}>
      <div className="flex lg:px-20 bg-black fixed bottom-0 left-0 w-full z-10 p-4">
        <input
          className="bg-black border-2 border-gray-600 text-white px-3 py-2 rounded-lg w-full mr-2"
          type="text"
          name="chatinput"
          value={message}
          onChange={handlechange}
          onKeyPress={handleKeyPress} // Trigger on Enter key press
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className={
            isLoading
              ? 'bg-orange-200 text-black px-4 py-2 rounded-lg'
              : 'bg-green-200 text-black px-4 py-2 rounded-lg'
          }
          disabled={isLoading}
        >
          {isLoading ? 'Typing...' : 'Send'}
        </button>
      </div>
    </form>
      </div>
      
    </div>
  );
};

export default Chat;
