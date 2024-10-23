const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

let userIdCounter = 0;

// Mapping of socket ID to user ID
const userIdMap = new Map();

// Serve static files from the 'public' folder
app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Generate a unique ID
  const userId = ++userIdCounter;
  userIdMap.set(socket.id, userId);

  console.log(userId, socket.id);

  // Broadcast the new user's ID and content class to all connected users
  io.to(socket.id).emit("new-user-content", { userId });

  // Broadcast the new user's ID to all connected users
  io.to(socket.id).emit("new-user-id", userId);

  socket.on("disconnect", () => {
    console.log("user disconnected");

    // Remove the user from the mapping
    userIdMap.delete(socket.id);

    // Notify other users about the disconnection
    io.emit("user-disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
