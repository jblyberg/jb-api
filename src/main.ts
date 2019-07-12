import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  dotenv.config();
  const port = process.env.APP_PORT;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
