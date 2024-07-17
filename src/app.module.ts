import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './shared/config/database.config';
import { SharedModule } from './shared/shared.module';
import { TodoEntity } from './todo/infrastructure/entities/todo.entity';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const database = config.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          url: database.url,
          ssl: true,
          entities: [TodoEntity],
          synchronize: false,
          logging: ['query'],
        };
      },
      inject: [ConfigService],
    }),
    TodoModule,
    SharedModule,
  ],
})
export class AppModule {}
