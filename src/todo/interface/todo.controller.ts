import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompleteTodoCommand } from '../application/command/complete-todo.command';
import { CreateTodoCommand } from '../application/command/create-todo.command';
import { GetTodoByIdQuery } from '../application/query/get-todo-by-id.query';
import { GetTodosQuery } from '../application/query/get-todos.query';
import { TodoEntity } from '../infrastructure/entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  @Inject() private readonly queryBus: QueryBus;
  @Inject() private readonly commandBus: CommandBus;

  @Get(':id')
  @ApiOkResponse({ type: TodoDto })
  getTodoById(@Param('id') id: string): Promise<TodoEntity> {
    return this.queryBus.execute(new GetTodoByIdQuery(parseInt(id)));
  }

  @Get()
  @ApiOkResponse({ type: [TodoDto] })
  getAll(): Promise<TodoEntity[]> {
    return this.queryBus.execute(new GetTodosQuery());
  }

  @Post('add')
  @ApiOkResponse({ type: TodoDto })
  addTodo(@Body() dto: CreateTodoDto): Promise<TodoEntity> {
    return this.commandBus.execute(new CreateTodoCommand(dto.title));
  }

  @Put('complete/:id')
  @ApiOkResponse({ type: TodoDto })
  completeTodoById(@Param('id') id: string): Promise<TodoEntity> {
    return this.commandBus.execute(new CompleteTodoCommand(parseInt(id)));
  }
}
