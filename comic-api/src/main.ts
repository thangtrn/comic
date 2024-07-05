import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './api/app/app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Variable
  const appPort = process.env.APP_PORT || 5000;
  const enviroment = process.env.NODE_ENV || 'development';

  // Middleware
  app.setGlobalPrefix('/api');
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Comic Api')
    .setDescription('Api service for commic web and mobile.')
    .setVersion('1.0')
    // .addBearerAuth({ in: 'header', type: 'http' })
    .addTag('Category', 'Enpoints to manipulate Category data')
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
    if (enviroment === 'development')
      console.log(
        `Application is running on: http://localhost:${appPort}/api-docs`,
      );
  });
}
bootstrap();
