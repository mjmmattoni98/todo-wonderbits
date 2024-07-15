import { DynamicModule, Module, Type } from '@nestjs/common';
import { TodoApplicationService } from './application/services/todo-application-service';
import { TodoRepository } from './domain/ports/outbound/todo-repository';
import { TodoDomainService } from './domain/services/todo-domain-service';

/**
 * Options for core module
 */
export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    todoRepository: Type<TodoRepository>;
  };
};

/**
 * Providers token for netsjs injection
 */
export const TODO_APPLICATION = 'TODO_APPLICATION';
export const TODO_SERVICE = 'TODO_SERVICE';

@Module({})
export class CoreModule {
  static register({ modules, adapters }: CoreModuleOptions): DynamicModule {
    const { todoRepository } = adapters;

    const TodoApplicationProvider = {
      provide: TODO_APPLICATION,
      useFactory(todo: TodoDomainService) {
        return new TodoApplicationService(todo);
      },
      inject: [TODO_SERVICE],
    };

    const TodoServiceProvider = {
      provide: TODO_SERVICE,
      useFactory(repository: TodoRepository) {
        return new TodoDomainService(repository);
      },
      inject: [todoRepository],
    };

    return {
      module: CoreModule,
      imports: [...modules],
      providers: [TodoApplicationProvider, TodoServiceProvider],
      exports: [TODO_APPLICATION],
    };
  }
}
