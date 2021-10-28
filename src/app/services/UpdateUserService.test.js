import AppError from '../../errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import UpdateUserService from './UpdateUserService';

let updateService;
let createService;

describe('UpdateUserService', () => {
  beforeEach(() => {
    updateService = new UpdateUserService(FakeUserRepository);
    createService = new CreateUserService(FakeUserRepository);
  });

  it('should be update user', async () => {
    const user = await createService.run({
      name: 'jhon doe',
      email: 'jhon@doe.com',
      password: '123',
    });

    const updatedUser = await updateService.run({
      id: user.id,
      name: 'jhon tree',
      password: '123456',
    });

    expect(updatedUser.name).toBe('jhon tree');
    expect(updatedUser.password).toBe('123456');
  });

  it('should be not able to update user if not exist', async () => {
    await expect(
      updateService.run({
        id: 'non-exist-user',
        name: 'jhon tree',
        password: 'password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
