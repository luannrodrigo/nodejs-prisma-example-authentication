import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import auth from './middlewares/auth';

const routes = Router();

// users
routes.post('/users', UserController.store);

// sessions
routes.post('/sessions', SessionController.store);

// authenticated routes
routes.use(auth);
routes.put('/users', UserController.update);

export default routes;
