import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user:join', (user) => {
    activeUsers.set(socket.id, { ...user, socketId: socket.id });
    io.emit('users:active', Array.from(activeUsers.values()));
  });

  socket.on('message:private', ({ to, message }) => {
    const timestamp = new Date().toISOString();
    socket.to(to).emit('message:receive', {
      from: socket.id,
      message,
      timestamp
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    activeUsers.delete(socket.id);
    io.emit('users:active', Array.from(activeUsers.values()));
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
