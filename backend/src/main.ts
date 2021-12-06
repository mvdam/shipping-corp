import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

const PORT = process.env.PORT || 9000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);

  console.info(`Shipping Corp Backend running at PORT ${PORT}`);
}
bootstrap();
