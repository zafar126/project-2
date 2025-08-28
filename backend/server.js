// backend/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";


import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();
connectDB();

// dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect MongoDB Atlas
connectDB();

// Routes
app.get("/", (req, res) =>
  res.send({ ok: true, service: "Medical Report Analyzer Backend" })
);

app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/chat", chatRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);
