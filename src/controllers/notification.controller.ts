import { Request, Response } from 'express';
import prisma from '../config/db';

// Get user notifications
export const getNotifications = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
