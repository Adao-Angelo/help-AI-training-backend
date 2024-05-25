import multer from "multer";
import path from "path";
import { AppError } from "../errors/appError";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!file) {
      throw new AppError("File not found");
    }
    callback(null, path.resolve("uploads"));
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});
