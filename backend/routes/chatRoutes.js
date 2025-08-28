// backend/routes/chatRoutes.js
import express from "express";
const router = express.Router();

// Dummy Chatbot route
router.post("/", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  res.json({ reply: `You said: ${message}. (Chatbot reply here)` });
});

export default router;
