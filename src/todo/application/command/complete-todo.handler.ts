import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todo/infrastructure/repository/todo.repository';
import { CompleteTodoCommand } from './complete-todo.command';

@CommandHandler(CompleteTodoCommand)
export class CompleteTodoHandler implements ICommandHandler<CompleteTodoCommand> {
  constructor(private readonly repository: TodoRepository) {}

  async execute(command: CompleteTodoCommand) {
    return this.repository.completeTodo(command.id);
  }
}
