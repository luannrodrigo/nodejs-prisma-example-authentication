import AppError from '../../errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

let service;

describe('CreateUserService', () => {
  beforeEach(() => {
    service = new CreateUserService(FakeUserRepository);
  });
  it('should be able create a new user', async () => {
    const user = await service.run({
      name: 'jhon doe',
      email: 'jhon@doe.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able create two user with same email', async () => {
    await service.run({
      name: 'jhon tree',
      email: 'jhon@tree.com',
      password: '123',
    });

    await expect(
      service.run({
        name: 'jhon tree',
        email: 'jhon@tree.com',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
