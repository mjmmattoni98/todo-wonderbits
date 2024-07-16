import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EmailAdaptorImplement } from 'src/notification/infrastructure/adaptor/EmailAdaptorImplement';
import { TodoRepositoryImplement } from 'src/notification/infrastructure/repository/TodoRepositoryImplement';
import { TodoQueryImplement } from 'src/notification/infrastructure/query/TodoQueryImplement';

import { TodoIntegrationController } from 'src/notification/interface/TodoIntegrationController';
import { TodoController } from 'src/notification/interface/TodoController';

import { SendEmailHandler } from 'src/notification/application/command/SendEmailHandler';
import { InjectionToken } from 'src/notification/application/InjectionToken';
import { FindTodoHandler } from 'src/notification/application/query/FindTodoHandler';

import { TodoFactory } from 'src/notification/domain/TodoFactory';

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
