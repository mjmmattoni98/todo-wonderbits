import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(TodoEntity) private repository: Repository<TodoEntity>,
  ) {}

  save(title: string) {
    return this.repository.save({
      title: title,
    });
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  async findAll() {
    return this.repository.find();
  }

  async completeTodo(id: number) {
    return this.repository.update(id, {
      isCompleted: true,
      updatedAt: new Date(),
    });
  }
}
