import 'dotenv/config';
import 'reflect-metadata';

import ip from 'ip';
import express from 'express';

import { appRouter } from './http';

const app = express();
const appPort = process.env.PORT || 3333;

app.use(express.json());
app.use(appRouter);

app.listen(appPort, () =>
  console.log(
    `server is running, check health at http://${ip.address()}:${appPort}/api/health`,
  ),
);
