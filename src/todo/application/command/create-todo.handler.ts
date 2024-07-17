import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todo/infrastructure/repository/todo.repository';
import { CreateTodoCommand } from './create-todo.command';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  @Inject()
  private readonly repository: TodoRepository;

  async execute(command: CreateTodoCommand) {
    const { title } = command;
    return this.repository.save(title);
  }
}
