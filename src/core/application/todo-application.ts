import { NewTodoDTO } from '../shared/dto/new-todo.dto';

export interface TodoApplication {
  createTodo: (newTodo: NewTodoDTO) => Promise<number>;
  // updateTodo: (id: string, title: string, description: string) => Promise<void>;
  // deleteTodo: (id: string) => Promise<void>;
  // getTodoById: (id: string) => Promise<void>;
  // getAllTodos: (userId: string) => Promise<void>;
}
