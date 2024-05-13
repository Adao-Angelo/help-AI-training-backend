import { Request, Response } from "express";
import dotenv from "dotenv";
import { generatePrompt } from "../utils/generatePrompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const google_api_key: string = String(process.env.googleKey);
const generative_ai = new GoogleGenerativeAI(google_api_key);

class Gemini_Controller {
  public oldSms: [];
  constructor() {
    this.oldSms = [];
  }
  public getGemini = async (messages: string) => {
    const prompt: string = generatePrompt(messages);
    const model = generative_ai.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(prompt);
    const message = result.response;
    const text = message.text();
    return {
      status: "success",
      message: text,
      name: "Gemini",
    };
  };
}

export default new Gemini_Controller();
