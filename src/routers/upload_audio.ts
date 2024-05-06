import { Router } from "express";
import multer from "multer";
import { storage } from "../configuration/multerConfig";

const upload_audio_router = Router();

const upload = multer({ storage: storage });

upload_audio_router.post("/", upload.single("file"), (req, res) => {
  return res.json({ message: "file uploaded successfully" });
});

export { upload_audio_router };
