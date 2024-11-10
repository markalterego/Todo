import { Router } from 'express';
import { auth } from '../helpers/auth.js';
import { deleteTask, getTasks, postTask } from '../controllers/taskController.js';

const todoRouter = Router();

todoRouter.get('/', getTasks);
todoRouter.post('/create', auth, postTask);
todoRouter.delete('/delete/:id', auth, deleteTask);

export default todoRouter;