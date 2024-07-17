import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todo/infrastructure/repository/todo.repository';
import { GetTodoByIdQuery } from './get-todo-by-id.query';

@QueryHandler(GetTodoByIdQuery)
export class GetTodoByIdHandler implements IQueryHandler<GetTodoByIdQuery> {
  @Inject()
  private readonly repository: TodoRepository;

  async execute(query: GetTodoByIdQuery) {
    return this.repository.findById(query.id);
  }
}
