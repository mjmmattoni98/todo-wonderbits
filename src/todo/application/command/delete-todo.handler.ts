import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todo/infrastructure/repository/todo.repository';
import { DeleteTodoCommand } from './delete-todo.command';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(private readonly repository: TodoRepository) {}

  async execute(command: DeleteTodoCommand) {
    return this.repository.delete(command.id);
  }
}
