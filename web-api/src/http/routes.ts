import { Router } from 'express';

import { handleErrors } from './errors';
import { HealthController } from '../controllers/health-controller';

const appRouter = Router();

appRouter.get('/api/health', HealthController.handleCheckHealth);

appRouter.use(handleErrors);

export { appRouter };
