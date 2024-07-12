import { Todo } from '../../entities/todo';

export interface TodoRepository {
  save(todo: Todo): Promise<Todo>;
}
