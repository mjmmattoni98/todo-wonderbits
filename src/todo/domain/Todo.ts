import { AggregateRoot } from '@nestjs/cqrs';

export type TodoProperties = Readonly<{
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}>;

export class Todo extends AggregateRoot {
  private readonly id: string;
  private readonly title: string;
  private readonly isCompleted: boolean;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date;

  constructor(properties: TodoProperties) {
    super();
    Object.assign(this, properties);
  }
}
