import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ServerConfig } from './infraestructure/shared/config/server.config';
import { LoggingInterceptor } from 'libs/LoggingInterceptor';
import { HttpExceptionFilter } from 'libs/HttpExceptionFilter';

function getServerConfig(app: INestApplication): ServerConfig {
  const config: ConfigService = app.get(ConfigService);
  return config.get<ServerConfig>('server');
}

function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Nest.js cqrs ddd example')
    .setDescription('This is example for nest.js cqrs ddd')
    .setVersion('1.0')
    .addTag('todo')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = getServerConfig(app);
  setupSwagger(app);
  await app.listen(config.port);
}
bootstrap();
