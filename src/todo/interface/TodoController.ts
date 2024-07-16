import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { FindNotificationQuery } from 'src/todo/application/query/FindNotificationQuery';
import { FindNotificationResult } from 'src/todo/application/query/FindNotificationResult';

import { FindAccountNotificationRequestParam } from 'src/todo/interface/dto/FindAccountNotificationRequestParam';
import { FindNotificationRequestQueryString } from 'src/todo/interface/dto/FindNotificationRequestQueryString';
import { FindNotificationResponseDto } from 'src/todo/interface/dto/FindNotificationResponseDto';
import { CreateTodoDto } from './dto/CreateTodoDto';
import { CreateTodoCommand } from '../application/command/CreateTodoCommand';

@ApiTags('Todo')
@Controller()
export class TodoController {
  @Inject() private readonly queryBus: QueryBus;
  @Inject() private readonly commandBus: CommandBus;

  @Get('todos')
  @ApiOkResponse({ type: FindNotificationResponseDto })
  @UseInterceptors(CacheInterceptor)
  find(
    @Query() querystring: FindNotificationRequestQueryString,
  ): Promise<FindNotificationResponseDto> {
    return this.queryBus.execute<FindNotificationQuery, FindNotificationResult>(
      new FindNotificationQuery(querystring),
    );
  }

  @Get('accounts/:accountId/todos')
  @ApiOkResponse({ type: FindNotificationResponseDto })
  @UseInterceptors(CacheInterceptor)
  findByAccount(
    @Param() param: FindAccountNotificationRequestParam,
    @Query() querystring: FindNotificationRequestQueryString,
  ): Promise<FindNotificationResponseDto> {
    return this.queryBus.execute<FindNotificationQuery, FindNotificationResult>(
      new FindNotificationQuery({ ...param, ...querystring }),
    );
  }

  @Post('add')
  async createTodo(@Body() dto: CreateTodoDto) {
    return this.commandBus.execute(new CreateTodoCommand(dto.title));
  }
}
