import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DuplicateResourceFilter,
  InvalidCredentialsFilter,
} from './infra/http/filters';
import { AppModule } from './infra/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new DuplicateResourceFilter(),
    new InvalidCredentialsFilter(),
  );

  await app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on port: ${process.env.PORT}`);
  });
}

bootstrap();
