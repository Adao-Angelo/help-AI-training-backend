import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { AppError } from "../../errors/appErros";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
app.use(cors());

//_________error_handling_config_________
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

server.listen(5000, () => console.log("SOCKET: 5000"));
export { io };
