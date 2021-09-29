/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  setupSwagger(app);
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Pet Hospital')
    .setDescription(`
      Welcome to the Pet Hospital project!

      The controllers taged for accessablity.
      Each controller can be seen in more then one tag.
      Also, endpoints with lock on the row requires Authentication and Authorization (login and provide the key).

      For Authentication:
      Send post request to get access token using admin/admin from http://localhost:3000/api/auth/login.
      See http://localhost:3000/api/#/Authenthication/AuthController_login controller.
      
      For Authorization:
      Click on the button 'Authorize' and provide the access token you got from Authentication
    `)
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token (Get token from http://localhost:3000/api/#/Authenthication/AuthController_login)',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
