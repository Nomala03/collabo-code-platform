import { Router } from 'express';
import {
  createProject,
  listProjects,
  addMember,
  removeMember,
} from '../controllers/project.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.post('/', createProject);
router.get('/', listProjects);
router.post('/:id/members', addMember);
router.delete('/:id/members/:userId', removeMember);

export default router;

