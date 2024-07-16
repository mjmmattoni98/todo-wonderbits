import { AggregateRoot } from '@nestjs/cqrs';

export class Todo extends AggregateRoot {
  constructor(
    readonly title: string,
    readonly isCompleted: boolean,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly id?: string,
    readonly deletedAt?: Date,
  ) {
    super();
  }
}
