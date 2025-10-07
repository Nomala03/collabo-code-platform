import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export interface TokenPayload extends JwtPayload {
  id: string;
  email?: string;
  role: 'REVIEWER' | 'SUBMITTER' | 'ADMIN';
}

export const generateToken = (payload: TokenPayload): string => {
  const defaultOptions: SignOptions = {
  expiresIn: '1h', 
};
  return jwt.sign(payload, JWT_SECRET, defaultOptions);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
};
