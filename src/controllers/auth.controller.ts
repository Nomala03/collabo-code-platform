import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/db';
import { generateToken, TokenPayload } from '../utils/jwt';

// Define valid roles (matches Prisma enum)
type Role = 'REVIEWER' | 'SUBMITTER' | 'ADMIN';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  // Validate role
  const validRoles: Role[] = ['REVIEWER', 'SUBMITTER', 'ADMIN'];
  if (!role || !validRoles.includes(role)) {
    return res.status(400).json({ message: `Role must be one of: ${validRoles.join(', ')}` });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role },
    });

    // Optional: generate token on registration
    const payload: TokenPayload = { id: user.id, email: user.email, role };
    const token = generateToken(payload);

    return res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT payload
    const payload: TokenPayload = { id: user.id, email: user.email, role: user.role };
    const token = generateToken(payload);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


