export class Todo {
  id?: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  userId: string;

  static create(title: string, description: string, userId: string): Todo {
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.isCompleted = false;
    todo.createdAt = new Date();
    todo.userId = userId;
    return todo;
  }
}
