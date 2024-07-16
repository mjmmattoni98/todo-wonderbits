import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './shared/config/database.config';
import { TodoEntity } from './todo/infrastructure/entities/todo.entity';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
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
    // CacheModule.register({ isGlobal: true }),
    // ThrottlerModule.forRoot(),
    TodoModule,
    // ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
