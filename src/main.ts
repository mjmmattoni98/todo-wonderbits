import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ServerConfig } from './shared/config/server.config';

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
  app.useGlobalPipes(new ValidationPipe());
  const config = getServerConfig(app);
  setupSwagger(app);
  await app.listen(config.port);
}
bootstrap();
