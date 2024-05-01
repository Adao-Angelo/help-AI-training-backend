import { Request, Response } from "express";
import dotenv from "dotenv";
import { generatePrompt } from "../utils/generatePrompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const google_api_key: string = String(process.env.googleKey);

class Gemini_Controller {
  constructor() {}
  public getGemini = async (request: Request, response: Response) => {
    const prompt: string = generatePrompt(request.body.prompt);
  };
}

export { Gemini_Controller };
