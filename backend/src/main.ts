import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AuthMiddleware } from './common/middleware/auth.middleware.js';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL', 'http://localhost:3000'), // Allow specific domain
    credentials: true, // Allow cookies to be sent
    allowedHeaders: 'Content-Type, Authorization', // Permitted request headers
  });

  app.enableCsrfProtection();
  // app.use(AuthMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: true,
    }),
  );

  app.use(compression());

  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('City Silver 925 & Bags API')
    .setDescription(
      'API documentation for City Silver 925 & Bags e-commerce platform.',
    )
    .setVersion('1.0')
    .addTag('Authentication', 'User authentication and authorization')
    .addTag('Users', 'User profile and account management')
    .addTag('Products', 'Products catalog and management')
    .addTag('Categories', 'Product categories management')
    .addTag('Cart', 'Shopping cart management')
    .addTag('Orders', 'Customer orders management')
    .addTag('Payments', 'Payment processing')
    .addTag('Reviews', 'Product reviews and ratings')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  const port = configService.get<number>('PORT', 4000);

  await app.listen(port);
}
await bootstrap();
