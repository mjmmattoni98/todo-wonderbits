import { Todo } from '../entities/todo';
import { TodoService } from '../ports/inbound/todo-service';
import { TodoRepository } from '../ports/outbound/todo-repository';

export class TodoDomainService implements TodoService {
  constructor(private repository: TodoRepository) {}

  async save(todo: Todo): Promise<Todo> {
    return this.repository.save(todo);
  }
}
