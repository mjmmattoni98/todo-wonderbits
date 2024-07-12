import { Todo } from '../../entities/todo';

export interface TodoService {
  save(todo: Todo): Promise<Todo>;
}
