import { Server } from 'socket.io';
import prisma from '../config/db';

export const initNotifications = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('subscribe', (userId: string) => {
      socket.join(userId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

export const sendNotification = async (userId: string, message: string, io: Server) => {
  await prisma.notification.create({ data: { userId, message } });
  io.to(userId).emit('notification', message);
};
