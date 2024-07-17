import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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

  async findActive() {
    return this.repository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async completeTodo(id: number) {
    return this.repository.update(id, {
      isCompleted: true,
      updatedAt: new Date(),
    });
  }

  async delete(id: number) {
    return this.repository.update(id, {
      deletedAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
