import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Store Documentation')
    .setDescription('Backend API Store Documentation')
    .setVersion('0.0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
  await app.listen(PORT);
  console.log(`🚀 Server running at http://localhost:${ PORT }`);
  console.log(`📘 Documentation running at http://localhost:${ PORT }/api`);
}
bootstrap();
