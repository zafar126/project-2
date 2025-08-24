import express from "express";
import multer from "multer";
import { scanReport, quickAnalyze } from "../controllers/scanController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/upload", upload.single("report"), scanReport);
router.post("/text", quickAnalyze);

export default router;
