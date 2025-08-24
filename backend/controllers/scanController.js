import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createWorker } from "tesseract.js";
import { DISEASES } from "../utils/diseaseDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");
const reportsFile = path.join(dataDir, "reports.json");
if (!fs.existsSync(reportsFile)) fs.writeFileSync(reportsFile, "[]");

function analyzeText(text) {
  const lower = (text || "").toLowerCase();
  let matches = [];
  for (const key of Object.keys(DISEASES)) {
    const d = DISEASES[key];
    let score = 0;
    d.keywords.forEach(k => {
      if (lower.includes(k)) score += 1;
    });
    if (score > 0) {
      const percent = Math.min(95, 40 + score * 15);
      matches.push({
        key,
        name: d.name,
        percent,
        risks: d.risks,
        diet: d.diet,
        sleep: d.sleep,
        lifestyle: d.lifestyle
      });
    }
  }
  if (matches.length === 0) {
    matches.push({
      key: "general",
      name: "General Wellness",
      percent: 10,
      risks: ["No major risk detected from text"],
      diet: { eat: ["Fruits", "Leafy vegetables", "Whole grains"], avoid: ["Excess sugar", "Ultra-processed foods"] },
      sleep: "7–8 hours",
      lifestyle: ["Regular activity", "Hydration"]
    });
  }
  return matches.sort((a,b)=>b.percent-a.percent);
}

export const quickAnalyze = async (req, res) => {
  const { text, userId } = req.body;
  const results = analyzeText(text || "");
  const reports = JSON.parse(fs.readFileSync(reportsFile, "utf-8"));
  const entry = { id: Date.now().toString(), userId: userId || null, text, results, createdAt: new Date().toISOString() };
  reports.push(entry);
  fs.writeFileSync(reportsFile, JSON.stringify(reports, null, 2));
  res.json(entry);
};

export const scanReport = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const worker = await createWorker("eng");
    const ret = await worker.recognize(req.file.path);
    await worker.terminate();
    const text = ret.data.text || "";
    const results = analyzeText(text);
    const reports = JSON.parse(fs.readFileSync(reportsFile, "utf-8"));
    const entry = { id: Date.now().toString(), userId: req.body.userId || null, file: req.file.filename, text, results, createdAt: new Date().toISOString() };
    reports.push(entry);
    fs.writeFileSync(reportsFile, JSON.stringify(reports, null, 2));
    res.json(entry);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "OCR failed" });
  }
};
