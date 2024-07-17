import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoCommand } from '../application/command/create-todo.command';
import { GetTodoByIdQuery } from '../application/query/get-todo-by-id.query';
import { GetTodosQuery } from '../application/query/get-todos.query';
import { TodoEntity } from '../infrastructure/entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  @Inject() private readonly queryBus: QueryBus;
  @Inject() private readonly commandBus: CommandBus;

  @Get(':id')
  @ApiOkResponse({ type: TodoEntity })
  getTodoById(@Param('id') id: string): Promise<TodoEntity> {
    return this.queryBus.execute(new GetTodoByIdQuery(parseInt(id)));
  }

  @Get()
  @ApiOkResponse({ type: [TodoEntity] })
  getAll(): Promise<TodoEntity[]> {
    return this.queryBus.execute(new GetTodosQuery());
  }

  @Post('add')
  @ApiOkResponse({ type: TodoEntity })
  addTodo(@Body() dto: CreateTodoDto): Promise<TodoEntity> {
    return this.commandBus.execute(new CreateTodoCommand(dto.title));
  }
}
