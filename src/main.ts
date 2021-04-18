import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  app.use(helmet());
  app.use(csurf());
  app.use(compression());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));
}
bootstrap();
