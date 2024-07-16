import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from './get-todos.query';
import { TodoRepository } from 'src/todo/infrastructure/repository/todo.repository';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(private readonly repository: TodoRepository) {}

  async execute(query: GetTodosQuery) {
    return this.repository.findAll();
  }
}
