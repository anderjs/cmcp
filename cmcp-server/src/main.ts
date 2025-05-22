/* eslint-disable prettier/prettier */
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import helmet from 'helmet';
import * as compression from 'compression';

import { JwtGuard } from './guards/jwt.guard';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './filters/exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const metadata = app.get(Reflector);

  const authorization = new JwtGuard(metadata);

  app.enableCors({ origin: '*' });

  app.useGlobalGuards(authorization);

  app.use(helmet());

  app.use(compression());

  app.useGlobalPipes(new ZodValidationPipe());

  app.useGlobalFilters(new ExceptionsFilter());

  app.setGlobalPrefix('/api/v1');

  const document = new DocumentBuilder()
    .setTitle('CMCP - Books API')
    .addTag('Books')
    .setVersion('1.0')
    .setDescription('CMCP - Services')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, document);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('Error starting the server:', err);

  process.exit(1);
});

/**
 * Bootstraps the NestJS application.
 *
 * - Initializes the application with the `AppModule`.
 * - Enables CORS, security headers (Helmet), and response compression.
 * - Applies global validation using Zod and a global exception filter.
 * - Sets a global API prefix (`/api/v1`).
 * - Configures Swagger documentation at `/api`.
 * - Starts the server on the port specified by the `PORT` environment variable or defaults to 3000.
 *
 * @async
 * @function bootstrap
 * @throws Logs and exits the process if the server fails to start.
 */
