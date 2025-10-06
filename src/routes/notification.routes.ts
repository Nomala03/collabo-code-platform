import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { getNotifications } from '../controllers/notification.controller';
import { getProjectStats } from '../controllers/project.stats.controller';

const router = Router();
router.use(authenticateToken);

router.get('/user', getNotifications);
router.get('/project/:id/stats', getProjectStats);

export default router;
