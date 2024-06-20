import { DataSource, DataSourceOptions } from 'typeorm';

import { Task } from '../entities';

const postgresDataSourceOptions: DataSourceOptions = {
  type: process.env.DB_ENGINE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
} as DataSourceOptions;

const sqlLiteDataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: "tasks-manager.db",
} as DataSourceOptions;

const databaseSource = new DataSource({
  ...(process.env.DB_ENGINE ? postgresDataSourceOptions : sqlLiteDataSourceOptions),
  synchronize: true,
  logging: String(process.env.DB_LOG).toLowerCase() == 'true',
  entities: [Task],
});

export { databaseSource };
