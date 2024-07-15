import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { TodoApplication } from 'src/core/application/todo-application';
import { TODO_APPLICATION } from '../../../core/core.module';
import { Log } from '../../shared/Log';
import { AppResponse } from '../model/app.response';
import { CreateTodoRequest } from '../model/create-todo.request';

@Controller('/todo')
export class TodoController {
  constructor(@Inject(TODO_APPLICATION) private application: TodoApplication) {}

  @Post()
  async createTodo(@Body() request: CreateTodoRequest): Promise<AppResponse> {
    Log.info(`(POST) Create todo`, request);
    const todoId = await this.application.createTodo(request);

    return {
      status: 201,
      message: `Todo(id=${todoId}) created OK`,
    };
  }

  @Get()
  async getTodos(): Promise<AppResponse> {
    Log.info(`(GET) Get todos`);
   
    return {
      status: 200,
      message: 'Todos retrieved OK',
      data: [],
    };
  }
}
