import { Role } from '@prisma/client';
import { TokenPayload } from '../../utils/jwt';

export interface JwtPayload {
  id: string;
  email: string;
  role: Role;
}

//Express Request includes `user`
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
