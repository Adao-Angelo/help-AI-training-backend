import Express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import "./configuration/webSocketServer/server_websocket";
import { AppError } from "./errors/appError";

const app = Express();
app.use(cors());
app.use(Express.json());

/*_________error_handling_config_________*/
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server Error - ${err.message}`,
    });
  }
);

app.listen(8000);
