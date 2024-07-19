const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http, {
  cors: {
    origin: ['http://localhost:4200','http://192.168.1.152:4200']
  }
});

const MAX_USERS = 2;
let connectedUsers = 0;

app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

io.on('connection', (socket) => {
  if (connectedUsers >= MAX_USERS) {
    console.log('User limit reached. Connection refused.');
    socket.emit('connectionRefused', 'User limit reached');
    socket.disconnect();
    return;
  }

  connectedUsers++;
  console.log(`A user connected. Total users: ${connectedUsers}`);

  socket.on('playerData', (playerData) => {
    socket.broadcast.emit('playerData', playerData);
  });

  socket.on('enemyData', (data) => {
    socket.broadcast.emit('enemyData', data);
  });

  io.emit('userCount', connectedUsers);

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('message', msg);
  });


  socket.on('disconnect', () => {
    connectedUsers--;
    console.log(`A user disconnected. Total users: ${connectedUsers}`);
    io.emit('userLeave', true);
    io.emit('userCount', connectedUsers);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  for (const socketId in io.sockets.sockets) {
    io.sockets.sockets[socketId].disconnect(true);
  }
  connectedUsers = 0;
});
