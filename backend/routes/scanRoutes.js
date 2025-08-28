// backend/routes/scanRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";
import { DISEASES } from "../utils/diseaseDB.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 🔹 Analyze text for diseases
function analyzeText(text) {
  const results = [];

  for (const key in DISEASES) {
    const disease = DISEASES[key];
    const found = disease.keywords.some((kw) =>
      text.toLowerCase().includes(kw.toLowerCase())
    );

    if (found) {
      results.push({
        name: disease.name,
        risks: disease.risks,
        diet: disease.diet,
        sleep: disease.sleep,
        lifestyle: disease.lifestyle,
        vitaminsNeeded: disease.vitaminsNeeded,
        recommendedVeggies: disease.recommendedVeggies,
        doctor: disease.doctor,
        dailyRoutine: disease.dailyRoutine,
        recoveryTips: disease.recoveryTips,
        percent: Math.floor(Math.random() * 40) + 60, // demo score (60–100%)
      });
    }
  }

  return { results };
}

// 🔹 Upload & scan file
router.post("/upload", upload.single("report"), async (req, res) => {
  try {
    let text = "";

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (req.file.mimetype.includes("pdf")) {
      // ✅ Always parse PDF correctly
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdf = await pdfParse(dataBuffer);
      text = pdf.text;
    } else {
      // ✅ Fallback for txt/doc
      text = fs.readFileSync(req.file.path, "utf8");
    }

    const analysis = analyzeText(text);

    // Delete file after processing
    fs.unlinkSync(req.file.path);

    res.json(analysis);
  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ error: "File processing failed" });
  }
});

// 🔹 Direct text analysis
router.post("/text", (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const analysis = analyzeText(text);
    res.json(analysis);
  } catch (err) {
    console.error("Text analysis error:", err);
    res.status(500).json({ error: "Text analysis failed" });
  }
});

export default router;
