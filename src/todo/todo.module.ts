import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EmailAdaptorImplement } from 'src/todo/infrastructure/adaptor/EmailAdaptorImplement';
import { TodoRepositoryImplement } from 'src/todo/infrastructure/repository/TodoRepositoryImplement';
import { TodoQueryImplement } from 'src/todo/infrastructure/query/TodoQueryImplement';

import { TodoIntegrationController } from 'src/todo/interface/TodoIntegrationController';
import { TodoController } from 'src/todo/interface/TodoController';

import { SendEmailHandler } from 'src/todo/application/command/SendEmailHandler';
import { InjectionToken } from 'src/todo/application/InjectionToken';
import { FindTodoHandler } from 'src/todo/application/query/FindTodoHandler';

import { TodoFactory } from 'src/todo/domain/TodoFactory';

const infrastructure = [
  {
    provide: InjectionToken.EMAIL_ADAPTOR,
    useClass: EmailAdaptorImplement,
  },
  {
    provide: InjectionToken.NOTIFICATION_REPOSITORY,
    useClass: TodoRepositoryImplement,
  },
  {
    provide: InjectionToken.NOTIFICATION_QUERY,
    useClass: TodoQueryImplement,
  },
];

const application = [SendEmailHandler, FindTodoHandler];

const domain = [TodoFactory];

@Module({
  imports: [CqrsModule],
  providers: [...infrastructure, ...application, ...domain],
  controllers: [TodoController],
})
export class TodoModule {}
