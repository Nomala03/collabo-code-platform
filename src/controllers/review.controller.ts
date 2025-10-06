import { Request, Response } from 'express';
import prisma from '../config/db';
import { sendNotification } from '../sockets/notifications';
import { Server } from 'socket.io';

// Approve submission
export const approveSubmission = async (req: Request, res: Response, io: Server) => {
  const { id: submissionId } = req.params;
  const reviewerId = req.user!.id;

  try {
    const review = await prisma.review.create({
      data: { submissionId, reviewerId, status: 'APPROVED' },
    });

    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'APPROVED' },
    });

    // Notify author
    const submission = await prisma.submission.findUnique({ where: { id: submissionId } });
    if (submission) await sendNotification(submission.authorId, 'Your submission was approved', io);

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Request changes
export const requestChanges = async (req: Request, res: Response, io: Server) => {
  const { id: submissionId } = req.params;
  const { summary } = req.body;
  const reviewerId = req.user!.id;

  try {
    const review = await prisma.review.create({
      data: { submissionId, reviewerId, summary, status: 'CHANGES_REQUESTED' },
    });

    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'CHANGES_REQUESTED' },
    });

    const submission = await prisma.submission.findUnique({ where: { id: submissionId } });
    if (submission) await sendNotification(submission.authorId, 'Changes requested for your submission', io);

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// we are tracking review history
export const getReviewHistory = async (req: Request, res: Response) => {
  const { id: submissionId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { submissionId },
      include: { reviewer: true },
    });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
