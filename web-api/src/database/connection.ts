import { DataSource, DataSourceOptions } from 'typeorm';

import { Task } from '../entities';

const dataSourceOptions: DataSourceOptions = {
  synchronize: true,
  type: process.env.DB_ENGINE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: String(process.env.DB_LOG).toLowerCase() == 'true',
} as DataSourceOptions;

const databaseSource = new DataSource({
  ...dataSourceOptions,
  entities: [Task],
});

export { databaseSource };
