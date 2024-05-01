import { Router } from "express";

import { Gemini_Controller } from "../controllers/gemini_controller";

const gemini_router = Router();

gemini_router.post("/", async (request, response) => {
  const gemini_controller = new Gemini_Controller();

  await gemini_controller.getGemini(request, response);
});

export { gemini_router };
