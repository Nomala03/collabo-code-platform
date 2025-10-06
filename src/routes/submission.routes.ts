import { Router } from 'express';
import {
  createSubmission,
  listSubmissionsByProject,
  getSubmission,
  updateStatus,
  deleteSubmission,
} from '../controllers/submission.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
router.use(authenticateToken);

router.post('/', createSubmission);
router.get('/project/:id', listSubmissionsByProject);
router.get('/:id', getSubmission);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteSubmission);

export default router;
