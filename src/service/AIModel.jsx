import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIChatSession = model.startChat({
  generationConfig,
  history: [
    //   {
    //     role: "user",
    //     parts: [
    //       {
    //         text: "job title: Full Stack React developer, Depends on job title give me a summary for my resume within 4-5 lines to just copy paste.\n",
    //       },
    //     ],
    //   },
    //   {
    //     role: "model",
    //     parts: [
    //       {
    //         text: "## Full Stack React Developer Summary:\n\nHighly motivated and experienced Full Stack React developer with a proven track record of building and deploying robust web applications. Possessing strong expertise in JavaScript, React, Node.js, and various backend technologies, I excel in developing high-performance, user-friendly, and scalable solutions. My passion lies in crafting clean and maintainable code, collaborating effectively within teams, and consistently delivering high-quality work. Eager to contribute my skills and knowledge to a dynamic and innovative environment. \n",
    //       },
    //     ],
    //   },
  ],
});
