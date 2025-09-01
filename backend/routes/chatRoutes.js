// // // backend/routes/chatRoutes.js
// // import express from "express";
// // import OpenAI from "openai";
// // import dotenv from "dotenv";

// // dotenv.config();
// // const router = express.Router();

// // const client = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // // Simple in-memory chat history (you can use DB later)
// // const chatHistory = {};

// // router.post("/send", async (req, res) => {
// //   const { userId = "guest", message } = req.body;
// //   if (!message) return res.status(400).json({ error: "Message required" });

// //   try {
// //     if (!chatHistory[userId]) chatHistory[userId] = [];

// //     // Save user message
// //     chatHistory[userId].push({ role: "user", content: message });

// //     // Ask OpenAI
// //     const response = await client.chat.completions.create({
// //       model: "gpt-3.5-turbo", // you can change to gpt-4
// //       messages: chatHistory[userId],
// //     });

// //     const reply = response.choices[0].message.content;

// //     // Save bot reply
// //     chatHistory[userId].push({ role: "assistant", content: reply });

// //     res.json({ reply });
// //   } catch (error) {
// //     console.error("Chatbot error:", error);
// //     res.status(500).json({ error: "Chatbot service failed" });
// //   }
// // });

// // // Get chat history
// // router.get("/history/:userId", (req, res) => {
// //   const { userId } = req.params;
// //   res.json(chatHistory[userId] || []);
// // });

// // export default router;
// // backend/routes/chatRoutes.js
// import express from "express";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();
// const router = express.Router();

// // Gemini client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // In-memory chat history
// const chatHistory = {};

// router.post("/send", async (req, res) => {
//   const { userId = "guest", message } = req.body;
//   if (!message) return res.status(400).json({ error: "Message required" });

//   try {
//     if (!chatHistory[userId]) chatHistory[userId] = [];

//     // Save user message
//     chatHistory[userId].push({ role: "user", content: message });

//     // Call Gemini
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// or use "gemini-1.5-pro" if you want better but slower responses
//     const result = await model.generateContent(message);

//     const reply = result.response.text();

//     // Save bot reply
//     chatHistory[userId].push({ role: "assistant", content: reply });

//     res.json({ reply });
//   } catch (error) {
//     console.error("Chatbot error:", error);
//     res.status(500).json({ error: "Chatbot service failed" });
//   }
// });

// router.get("/history/:userId", (req, res) => {
//   const { userId } = req.params;
//   res.json(chatHistory[userId] || []);
// });

// export default router;

import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

// Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory chat history (will reset on server restart)
const chatHistory = {};

router.post("/send", async (req, res) => {
  const { userId = "guest", message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    if (!chatHistory[userId]) chatHistory[userId] = [];

    // Save user message
    chatHistory[userId].push({ role: "user", content: message });

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// or use "gemini-1.5-pro" if you want better but slower responses
    const result = await model.generateContent(message);

    const reply = result.response.text();

    // Save bot reply
    chatHistory[userId].push({ role: "assistant", content: reply });

    res.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Chatbot service failed" });
  }
});

router.get("/history/:userId", (req, res) => {
  const { userId } = req.params;
  res.json(chatHistory[userId] || []);
});

export default router;
