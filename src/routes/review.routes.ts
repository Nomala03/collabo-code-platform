import { Router } from 'express';
import { Server } from 'socket.io';
import { authenticateToken } from '../middlewares/auth.middleware';
import {
  approveSubmission,
  requestChanges,
  getReviewHistory,
} from '../controllers/review.controller';

const router = Router();

// passing io instance from main server
export const reviewRoutes = (io: Server) => {
  router.use(authenticateToken);

  router.post('/:id/approve', (req, res) => approveSubmission(req, res, io));
  router.post('/:id/request-changes', (req, res) => requestChanges(req, res, io));
  router.get('/:id/history', getReviewHistory);

  return router;
};
