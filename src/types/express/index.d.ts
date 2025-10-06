import { TokenPayload } from '../../utils/jwt';


//Express Request includes `user`
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
