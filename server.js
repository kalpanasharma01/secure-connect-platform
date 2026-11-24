require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.on("chatMessage", (msg) => {

    console.log("Message:", msg);

    io.emit("chatMessage", msg);

  });

  socket.on("disconnect", () => {

    console.log("User Disconnected");

  });

});

server.listen(process.env.PORT, () => {

  console.log(
    `Server running on port ${process.env.PORT}`
  );

});