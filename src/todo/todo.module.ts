import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTodoHandler } from './application/command/create-todo.handler';
import { GetTodoByIdHandler } from './application/query/get-todo-by-id.handler';
import { GetTodosHandler } from './application/query/get-todos.handler';
import { TodoEntity } from './infrastructure/entities/todo.entity';
import { TodoRepository } from './infrastructure/repository/todo.repository';
import { TodoController } from './interface/todo.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TodoEntity])],
  providers: [
    GetTodosHandler,
    TodoRepository,
    GetTodoByIdHandler,
    CreateTodoHandler,
  ],
  controllers: [TodoController],
})
export class TodoModule {}
