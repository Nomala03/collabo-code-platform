import { Request, Response } from 'express';
import prisma from '../config/db';

// Create submission
export const createSubmission = async (req: Request, res: Response) => {
  const { title, description, code, projectId } = req.body;
  const authorId = req.user!.id;

  try {
    const submission = await prisma.submission.create({
      data: { title, description, code, projectId, authorId },
    });
    res.status(201).json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// List submissions by project
export const listSubmissionsByProject = async (req: Request, res: Response) => {
  const { id: projectId } = req.params;

  try {
    const submissions = await prisma.submission.findMany({
      where: { projectId },
      include: { author: true, comments: true, reviews: true },
    });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// View single submission
export const getSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: { author: true, comments: true, reviews: true },
    });
    res.json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update submission status
export const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await prisma.submission.update({
      where: { id },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete submission
export const deleteSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.submission.delete({ where: { id } });
    res.json({ message: 'Submission deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
