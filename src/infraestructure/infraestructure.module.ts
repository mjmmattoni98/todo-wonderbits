import { Module } from '@nestjs/common';
import { TursoDatabaseModule } from './turso-database/turso-database.module';
import { PostgresDatabaseModule } from './postgres-database/postgres-database.module';
import { TodoController } from './http-server/controllers/todo.controller';

@Module({
  imports: [TursoDatabaseModule, PostgresDatabaseModule],
  controllers: [TodoController],
})
export class InfraestructureModule {}
