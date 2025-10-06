import { Request, Response } from 'express';
import prisma from '../config/db';

// Add comment
export const addComment = async (req: Request, res: Response) => {
  const { submissionId, content, filePath, lineNumber } = req.body;
  const authorId = req.user!.id;

  if (req.user!.role !== 'REVIEWER') {
    return res.status(403).json({ message: 'Only reviewers can comment' });
  }

  try {
    const comment = await prisma.comment.create({
      data: { submissionId, content, filePath, lineNumber, authorId },
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// List comments for a submission
export const listComments = async (req: Request, res: Response) => {
  const { id: submissionId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { submissionId },
      include: { author: true },
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update comment
export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.authorId !== req.user!.id) return res.status(403).json({ message: 'Unauthorized' });

    const updated = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete comment
export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.authorId !== req.user!.id) return res.status(403).json({ message: 'Unauthorized' });

    await prisma.comment.delete({ where: { id } });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
