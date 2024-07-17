import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompleteTodoHandler } from './application/command/complete-todo.handler';
import { CreateTodoHandler } from './application/command/create-todo.handler';
import { DeleteTodoHandler } from './application/command/delete-todo.handler';
import { GetTodoByIdHandler } from './application/query/get-todo-by-id.handler';
import { GetTodosActiveHandler } from './application/query/get-todos-active.handler';
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
    CompleteTodoHandler,
    GetTodosActiveHandler,
    DeleteTodoHandler,
  ],
  controllers: [TodoController],
})
export class TodoModule {}
