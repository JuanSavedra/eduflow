import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS para que o frontend possa se comunicar com o backend
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Backend rodando em: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
