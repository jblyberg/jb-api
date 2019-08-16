import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const corsOptionsDelegate: any = (req, callback) => {
    let corsOptions: object;

    // tslint:disable-next-line: prefer-conditional-expression
    if (serverConfig.origin.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }

    callback(null, corsOptions);
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
