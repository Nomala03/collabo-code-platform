import { Request, Response } from 'express';
import prisma from '../config/db';

// Project-level stats
export const getProjectStats = async (req: Request, res: Response) => {
  const { id: projectId } = req.params;

  try {
    const submissions = await prisma.submission.findMany({ where: { projectId } }) as { status: string }[];
    const total = submissions.length;
    const approved = submissions.filter(s => s.status === 'APPROVED').length;
    const rejected = submissions.filter(s => s.status === 'CHANGES_REQUESTED').length;

    res.json({
      totalSubmissions: total,
      approved,
      rejected,
      approvalRate: total ? (approved / total) * 100 : 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
