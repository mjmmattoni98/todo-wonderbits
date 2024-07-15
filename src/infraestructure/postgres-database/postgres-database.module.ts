import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../shared/config/database.config';
import { TodoEntity } from './entities/todo.entity';

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
          // host: database.host,
          // port: database.port,
          // username: database.user,
          // password: database.password,
          // database: database.name,
          entities: [TodoEntity],
          synchronize: false,
          logging: ['query'],
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresDatabaseModule {}
