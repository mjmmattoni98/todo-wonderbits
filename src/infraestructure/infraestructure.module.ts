import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { SharedModule } from './shared/shared.module';
import { PostgresDatabaseModule } from './postgres-database/postgres-database.module';
import { TodoRepositoryAdapter } from './adapters/todo.repository.adapter';
import { TodoEntity } from './postgres-database/entities/todo.entity';
import { TodoController } from './http-server/controllers/todo.controller';

@Module({
  providers: [TodoRepositoryAdapter],
  exports: [TodoRepositoryAdapter],
  imports: [
    PostgresDatabaseModule,
    SharedModule,
    CoreModule.register({
      modules: [InfraestructureModule],
      adapters: {
        todoRepository: TodoRepositoryAdapter,
      },
    }),
    TypeOrmModule.forFeature([TodoEntity]),
  ],
  controllers: [TodoController],
})
export class InfraestructureModule {}
