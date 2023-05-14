const express = require("express");
// const WebSockets = require("./utils/WebSockets");

const app = express();

//socket
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Socket Router
const SocketRouter = require("./routes/routes")(io);

const port = 5000;

app.use(express.json({ extended: false }));

app.use("/api", SocketRouter);

//socket connection
io.on("connection", (socket) => {
  socket.on("send_token", (tokenid) => {
    socket.broadcast.emit("recieve_token", tokenid);
    console.log(tokenid);
  });

  socket.on("enter_name", (pname) => {
    socket.emit("recieve_name", pname);
    console.log(pname);
  });

  socket.on("enter_phone", (phone) => {
    socket.emit("recieve_phone", phone);
    console.log(phone);
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
