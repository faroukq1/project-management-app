import { Router } from 'express';
import {
  createTask,
  getTasks,
  getUserTasks,
  updateTaskStatus,
} from '../controllers/taskController';

const router = Router();
router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:taskId', updateTaskStatus);
router.get('/user/:userId', getUserTasks);
export default router;
