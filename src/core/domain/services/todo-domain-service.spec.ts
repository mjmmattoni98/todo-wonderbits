import { Todo } from '../entities/todo';
import { TodoService } from '../ports/inbound/todo-service';
import { TodoRepository } from '../ports/outbound/todo-repository';
import { TodoDomainService } from './todo-domain-service';

function todoRepositoryMock(todo: Todo): TodoRepository {
  return {
    save: jest.fn().mockResolvedValue(todo),
  };
}

describe('TodoDomainService', () => {
  let service: TodoService = null;

  it('should call ProductRepository.save()', async () => {
    const repositoryMock = todoRepositoryMock(Todo.create('title', 'description', 'userId'));
    service = new TodoDomainService(repositoryMock);
    await service.save(Todo.create('title', 'description', 'userId'));

    expect(repositoryMock.save).toHaveBeenCalled();
  });
});
