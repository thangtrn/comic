import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '~/api/app/app.module';
import { ResponseInterceptor } from '~/interceptors/response.interceptor';
import { MongoExceptionFilter } from './interceptors/mongo-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Variable
  const appPort = process.env.APP_PORT || 5000;

  // Config
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Middleware
  app.use(compression());
  app.use(cookieParser());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Comic Api')
    .setDescription('Api service for commic web and mobile.')
    .setVersion('1.0')
    .addBearerAuth({
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .addTag('Genres', 'Enpoints to manipulate genres data')
    .addTag('Author', 'Enpoints to manipulate author data')
    .addTag('Comic', 'Enpoints to manipulate comic data')
    .addTag('Chapter', 'Enpoints to manipulate chapter data')
    .addTag('Upload', 'Enpoints to manipulate files and folder action')
    .addTag('Notification', 'Enpoints to manipulate notification data')
    .addTag('Notification template', 'Enpoints to manipulate notification template data')
    .addTag('Follow', 'Enpoints to manipulate follow data')
    .addTag('Comment', 'Enpoints to manipulate comment data')
    .addTag('User', 'Enpoints to manipulate user data')
    .addTag('Auth', 'Enpoints to manipulate auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'API Documentation - Comic API',
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // Listening
  await app.listen(appPort, () => {
    console.log(`🚀 ~ Application is running on: http://localhost:${appPort}/api-docs`);
  });
}
bootstrap();
