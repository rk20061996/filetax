const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);


  socket.on("send_message", (data) => {
    console.log("data-->",data)
    io.emit('receive_message', data);
    // socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    console.log("success----yayyyy")
  });

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});