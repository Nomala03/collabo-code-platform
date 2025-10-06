import { Request, Response } from 'express';
import prisma from '../config/db';

// Create a project
export const createProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const ownerId = req.user!.id;

  try {
    const project = await prisma.project.create({
      data: { name, description, ownerId },
    });
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// List all projects
export const listProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { owner: true, members: true, submissions: true },
    });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Assign user to project
export const addMember = async (req: Request, res: Response) => {
  const { id: projectId } = req.params;
  const { userId, role } = req.body;

  try {
    const membership = await prisma.projectMembership.create({
      data: { projectId, userId, role },
    });
    res.status(201).json(membership);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove user from project
export const removeMember = async (req: Request, res: Response) => {
  const { id: projectId, userId } = req.params;

  try {
    await prisma.projectMembership.deleteMany({
      where: { projectId, userId },
    });
    res.json({ message: 'Member removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
