import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { json, urlencoded } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.use(json({ limit: '100mb' }))
  app.use(urlencoded({ extended: true, limit: '100mb', parameterLimit: 50000}));
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
