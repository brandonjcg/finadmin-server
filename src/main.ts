import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Server ready at http://localhost:${PORT}`);

  // TODO: implementar borrado lógico
  // TODO: implementar commit-msg
}
bootstrap();
