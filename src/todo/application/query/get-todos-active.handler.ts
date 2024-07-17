import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todo/infrastructure/repository/todo.repository';
import { GetTodosActiveQuery } from './get-todos-active.query';

@QueryHandler(GetTodosActiveQuery)
export class GetTodosActiveHandler
  implements IQueryHandler<GetTodosActiveQuery>
{
  constructor(private readonly repository: TodoRepository) {}

  async execute(query: GetTodosActiveQuery) {
    return this.repository.findActive();
  }
}
