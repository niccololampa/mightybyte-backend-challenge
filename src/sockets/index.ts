import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const socketConnection = (server: HttpServer): SocketIOServer => {
  const io = new SocketIOServer(server);

  io.on('connection', (socket) => {
    console.log(`New user connected ${socket.id}`);

    socket.on('acknowledge', (data) => {
      console.log(`Acknowledgment data received from client ${socket.id}:`, data);
    });

    socket.on('disconnect', () => {
      console.log('User Disconnected');
    });
  });

  return io;
};

export default socketConnection;
