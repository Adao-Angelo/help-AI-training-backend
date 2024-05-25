import express, { NextFunction, Request, Response, text } from "express";
import "express-async-errors";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { AppError } from "../../errors/appError";
import gemini_controller from "../../controllers/gemini_controller";

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

/*____________config io _______*/
io.on("connection", (socket) => {
  socket.join("home");
  socket.on("send", async (message) => {
    socket.emit("received", message);

    socket.emit("loading", "loading");

    const result = await gemini_controller.getGemini(message.text);
    const filter = {
      text: result.message,
      user: "Gemini",
    };
    socket.emit("received", filter);
  });

  socket.on("send-audio", (data) => {
    socket.emit("receive-audio", data);
  });
});

const port: number = 5000;
server.listen(port, () =>
  console.info("server web socket running at port: ", port)
);
