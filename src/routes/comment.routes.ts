import { Router } from 'express';
import {
  addComment,
  listComments,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
router.use(authenticateToken);

router.post('/', addComment);
router.get('/submission/:id', listComments);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
