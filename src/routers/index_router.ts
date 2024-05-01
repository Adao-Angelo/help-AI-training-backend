import { Router } from "express";
import { gemini_router } from "./gemini.router";

const router = Router();

router.use("/gemini", gemini_router);

export { router };
