import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 9000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);

  console.info(`Running at :${PORT}`);
}
bootstrap();
