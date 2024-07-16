import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TodoEntity } from '../infrastructure/entities/todo.entity';

@ApiTags('todo')
@Controller()
export class TodoController {
  @Inject() private readonly queryBus: QueryBus;
  @Inject() private readonly commandBus: CommandBus;

  @Get()
  @ApiOkResponse({ type: [TodoEntity] })
  @UseInterceptors(CacheInterceptor)
  // getAll(): Promise<TodoEntity[]> {
  getAll() {
    return 'Hello World';
    // return this.queryBus.execute(new GetTodosQuery());
  }
}
