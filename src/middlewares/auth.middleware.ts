import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(403).json({ message: 'Invalid or expired token' });

  req.user = decoded;
  next();
};

