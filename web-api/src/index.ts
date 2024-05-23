import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import ip from 'ip';
import cors from 'cors';
import express from 'express';

import { appRouter } from './http';
import { databaseSource } from './database';

databaseSource.initialize();

const app = express();
const appPort = process.env.PORT || 3333;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(appRouter);

app.listen(appPort, () =>
  console.log(
    `server is running, check health at http://${ip.address()}:${appPort}/api/health`,
  ),
);
