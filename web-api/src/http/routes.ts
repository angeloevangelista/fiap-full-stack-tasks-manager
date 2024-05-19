import { Router } from 'express';

import { handleErrors } from './errors';
import { HealthController } from '../controllers/health-controller';
import { TasksController } from '../controllers/tasks-controller';

const appRouter = Router();

appRouter.get('/api/health', HealthController.handleCheckHealth);

appRouter.post('/api/tasks', TasksController.create);
appRouter.get('/api/tasks', TasksController.list);
appRouter.get('/api/tasks/:task_id', TasksController.get);
appRouter.put('/api/tasks/:task_id', TasksController.update);
appRouter.patch('/api/tasks/:task_id', TasksController.markAsCompleted);
appRouter.delete('/api/tasks/:task_id', TasksController.delete);

appRouter.use(handleErrors);

export { appRouter };
