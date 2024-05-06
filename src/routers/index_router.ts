import { Router } from "express";
import { gemini_router } from "./gemini.router";
import { upload_audio_router } from "./upload_audio";

const router = Router();

router.use("/gemini", gemini_router);
router.use("/audio/upload", upload_audio_router);
export { router };
