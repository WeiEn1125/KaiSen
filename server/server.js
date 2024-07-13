const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

const MAX_USERS = 2; // 設定最大用戶數量
let connectedUsers = 0;

app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

io.on('connection', (socket) => {
  if (connectedUsers >= MAX_USERS) {
    console.log('User limit reached. Connection refused.');
    socket.emit('connectionRefused', 'User limit reached');
    socket.disconnect(); // 斷開新連接
    return;
  }

  connectedUsers++;
  console.log(`A user connected. Total users: ${connectedUsers}`);
  
  // 通知所有客戶端當前連接人數
  io.emit('userCount', connectedUsers);

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('message', msg); // 將消息廣播給所有客戶端
  });

  socket.on('disconnect', () => {
    connectedUsers--;
    console.log(`A user disconnected. Total users: ${connectedUsers}`);
    
    // 通知所有客戶端當前連接人數
    io.emit('userCount', connectedUsers);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  for (const socketId in io.sockets.sockets) {
    console.log(socketId);
    io.sockets.sockets[socketId].disconnect(true);
  }
  connectedUsers = 0;
  console.log(`Server is running on port ${PORT}`);
});
