import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Gemini_Controller } from "../../controllers/gemini_controller";
const gemini = new Gemini_Controller();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
app.use(cors());
let usersConected = 0;
io.on("connection", (socket) => {
  usersConected += 1;
  console.log("users-conected: " + usersConected);
  socket.join(`${Math.random() * 1000000}`);

  socket.on("message", async (message) => {
    console.log("message: " + message.text);
    const result = await gemini.getGemini(message.text);
    socket.emit("gemini", result);
  });
  socket.on("send-audio", (data) => {
    console.log("Received audio message:", data);
    socket.emit("receive-audio", data);
  });
});

server.listen(5000, () => {
  console.log("websokect : 5000");
});
