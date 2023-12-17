const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function POST(req: Request) {

try {
   const {context} = await req.json();
   console.log(process.env.API_KEY)
   

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const result = await model.generateContent(context);

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: "Hello, I have 2 dogs in my house.",
      },
      {
        role: "model",
        parts: "Great to meet you. What would you like to know?",
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });


  const response = await result.response;
  const text = response.text();
 console.log(text)

  return new Response (text,  { status: 200, headers: { 'Content-Type': 'application/json' } })
} catch (error) {
    return new Response ("error", {status: 500, headers : { 'Content-Type': 'application/json' }})
}

}