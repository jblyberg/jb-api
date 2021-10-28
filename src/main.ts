import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './modules/app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const corsOptionsDelegate: CorsOptionsDelegate<any> = (request, callback) => {
    const corsOptions = serverConfig.origin.includes(request.header('Origin')) ? { origin: true } : { origin: false };
    callback(undefined, corsOptions);
  };

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors(corsOptionsDelegate);
  }

  const ip = process.env.IP || serverConfig.ip;
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port, ip);
  logger.log(`Application listening on ${ip ? ip : '*'}:${port}`);
}
bootstrap();
