import { Request, Response } from "express";
import dotenv from "dotenv";
import { generatePrompt } from "../utils/generatePrompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const google_api_key: string = String(process.env.googleKey);
const generative_ai = new GoogleGenerativeAI(google_api_key);

class Gemini_Controller {
  constructor() {}
  public getGemini = async (request: Request, response: Response) => {
    const prompt: string = generatePrompt(request.body.prompt);
    const model = generative_ai.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(prompt);
    const message = result.response;
    const text = message.text();
    return response.status(200).json({
      status: "success",
      message: text,
    });
  };
}

export { Gemini_Controller };
