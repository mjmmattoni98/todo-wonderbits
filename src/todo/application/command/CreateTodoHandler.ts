import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { HeroRepository } from '../../repository/hero.repository';
import { CreateTodoCommand } from './CreateTodoCommand';
import { Transactional } from 'libs/Transactional';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  @Inject()
  private readonly repository: HeroRepository;
  @Inject()
  private readonly publisher: EventPublisher;

  @Transactional()
  async execute(command: CreateTodoCommand) {
    const { title } = command;
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(heroId),
    );
    hero.killEnemy(dragonId);
    hero.commit();
  }
}
