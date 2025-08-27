import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DISEASES } from "../utils/diseaseDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");
const chatsFile = path.join(dataDir, "chats.json");
if (!fs.existsSync(chatsFile)) fs.writeFileSync(chatsFile, "[]");

function botReply(message) {
  const m = (message || "").toLowerCase();

  for (const key of Object.keys(DISEASES)) {
    const d = DISEASES[key];
    if (d.keywords.some(k => m.includes(k))) {
      return `It sounds related to ${d.name}. Eat: ${d.diet.eat.join(", ")}. Avoid: ${d.diet.avoid.join(", ")}. Sleep: ${d.sleep}. Lifestyle: ${d.lifestyle.join("; ")}.`;
    }
  }

  if (m.includes("hello") || m.includes("hi")) return "Hello! How can I help with your report, diet, or sleep today?";
  if (m.includes("doctor")) return "Consult: Dentist (teeth), Cardiologist (heart), Dermatologist (skin), Neurologist (brain), Nutritionist (diet).";
  if (m.includes("diet")) return "General diet: fruits, leafy greens, whole grains, adequate water; avoid excess sugar.";

  return "Share your symptom or paste report text to get advice.";
}

export const sendMessage = (req, res) => {
  const { userId, message } = req.body;
  if (!message) return res.status(400).json({ error: "Missing message" });

  const reply = botReply(message);
  const chats = JSON.parse(fs.readFileSync(chatsFile, "utf-8"));
  const convo = { id: Date.now().toString(), userId: userId || null, message, reply, createdAt: new Date().toISOString() };
  chats.push(convo);
  fs.writeFileSync(chatsFile, JSON.stringify(chats, null, 2));
  res.json(convo);
};

export const getHistory = (req, res) => {
  const { userId } = req.params;
  const chats = JSON.parse(fs.readFileSync(chatsFile, "utf-8"));
  const filtered = chats.filter(c => (userId ? c.userId === userId : true)).slice(-50);
  res.json(filtered);
};
