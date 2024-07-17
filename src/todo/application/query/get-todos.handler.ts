import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todo/infrastructure/repository/todo.repository';
import { GetTodosQuery } from './get-todos.query';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  @Inject()
  private readonly repository: TodoRepository;

  async execute(query: GetTodosQuery) {
    return this.repository.findAll();
  }
}
