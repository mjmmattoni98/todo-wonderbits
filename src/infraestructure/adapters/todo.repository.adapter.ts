import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { TURSO_CONNECTION } from 'src/constants';
import { Todo } from 'src/core/domain/entities/todo';
import { TodoRepository } from 'src/core/domain/ports/outbound/todo-repository';
import * as schema from '../turso-database/entities/todo.entity';

@Injectable()
export class TodoRepositoryAdapter implements TodoRepository {
  constructor(
    @Inject(TURSO_CONNECTION)
    private db: LibSQLDatabase<typeof schema>,
  ) {}

  save(todo: Todo): Promise<Todo> {
    return this.db.insert(schema.todo).values({
      title: todo.title,
      description: todo.description,
      userId: todo.userId,
    });
  }
}
