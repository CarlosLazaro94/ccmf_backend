import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { json, urlencoded } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '100mb' }))
  app.use(urlencoded({ extended: true, limit: '100mb', parameterLimit: 50000}));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
