import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from 'src/core/domain/ports/outbound/todo-repository';
import { Repository } from 'typeorm';
import { TodoEntity } from '../postgres-database/entities/todo.entity';
import * as schema from '../turso-database/entities/todo.entity';
import { Todo } from 'src/core/domain/entities/todo';

@Injectable()
export class TodoRepositoryAdapter implements TodoRepository {
  constructor(
    @InjectRepository(TodoEntity) private repository: Repository<TodoEntity>,
  ) {}

  save(todo: Todo): Promise<Todo> {
    return this.repository.save(todo);
  }
}
