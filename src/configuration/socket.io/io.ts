import { io } from "./server_websocket";
import gemini_controller from "../../controllers/gemini_controller";

io.on("connection", (socket) => {
  socket.join(socket.id);

  socket.on("message", async (message) => {
    const result = await gemini_controller.getGemini(message.text);
    socket.emit("gemini", result);
  });

  socket.on("send-audio", (data) => {
    socket.emit("receive-audio", data);
  });
});
