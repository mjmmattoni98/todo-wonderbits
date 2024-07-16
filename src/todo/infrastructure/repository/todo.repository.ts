import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/domain/todo';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(TodoEntity) private repository: Repository<TodoEntity>,
  ) {}

  save(todo: Todo) {
    return this.repository.save({
      title: todo.title,
      isCompleted: todo.isCompleted,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      deletedAt: todo.deletedAt,
    });
  }

  async findAll() {
    return this.repository.find();
  }
}
