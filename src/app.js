import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import Youch from 'youch';
import http from 'http';
import cors from 'cors';

import routes from './routes';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    this.middlewares();
    this.routes();
    this.exceptions();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  exceptions() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const { error } = await new Youch(err, req).toJSON();

        return res.status(error.status).json(error);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
