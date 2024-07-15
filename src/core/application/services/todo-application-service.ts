import { TodoService } from "src/core/domain/ports/inbound/todo-service";
import { TodoApplication } from "../todo-application";
import { NewTodoDTO } from "../../shared/dto/new-todo.dto";
import { Todo } from "src/core/domain/entities/todo";

export class TodoApplicationService implements TodoApplication {
  constructor(private todo: TodoService) {}

  async createTodo(newTodo: NewTodoDTO): Promise<number> {
    const entity = Todo.create(newTodo.title, newTodo.description, newTodo.userId);
    const saved = await this.todo.save(entity);

    return saved.id;
  }
}