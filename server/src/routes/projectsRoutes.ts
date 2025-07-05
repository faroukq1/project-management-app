import { Router } from 'express';
import { createProject, getProject } from '../controllers/projectController';

const router = Router();
router.get('/', getProject);
router.post('/', createProject);
export default router;
