import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoController } from 'src/todo/interface/TodoController';
import { GetTodosQuery } from './application/query/get-todos.query';
import { TodoRepository } from './infrastructure/repository/todo.repository';

@Module({
  imports: [CqrsModule],
  providers: [GetTodosQuery, TodoRepository],
  controllers: [TodoController],
})
export class TodoModule {}
