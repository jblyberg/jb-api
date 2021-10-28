import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const databaseConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: databaseConfig.type,
  host: process.env.RDS_HOSTNAME || databaseConfig.host,
  port: process.env.RDS_PORT || databaseConfig.port,
  username: process.env.RDS_USERNAME || databaseConfig.username,
  password: process.env.RDS_PASSWORD || databaseConfig.password,
  database: process.env.RDS_DB_NAME || databaseConfig.database,
  entities: [__dirname + '/../database/entities/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || databaseConfig.synchronize,
};
