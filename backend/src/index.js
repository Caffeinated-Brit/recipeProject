import http from "http";
import { app } from "./app.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

//may want to move this to app.js later
import { initDatabase } from "./db/init.js";
await initDatabase();

const PORT = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
