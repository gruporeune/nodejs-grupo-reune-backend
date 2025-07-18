import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'https://site-grupo-reune.vercel.app', 
      'https://painel.gruporeune.com',
      'http://localhost:5173'
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('GRUPO REUNE - BFF')
    .setDescription('API BFF com autenticação JWT')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        type: 'http', 
        scheme: 'bearer', 
        bearerFormat: 'JWT', 
        description: 'Insira o token JWT obtido no /login' 
      }
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
