import AppError from '../../errors/AppError';
import SessionService from './SessionService';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

let sessionService;
let createUserService;
describe('SessionService', () => {
  beforeEach(() => {
    sessionService = new SessionService(FakeUserRepository);
    createUserService = new CreateUserService(FakeUserRepository);
  });

  it('should be able authenticate user if email and password is equal', async () => {
    const user = await createUserService.run({
      name: 'jhon doe',
      email: 'jhon@doe.com',
      password: '123',
    });

    const userAuthenticated = await sessionService.run({
      email: 'jhon@doe.com',
      password: '123',
    });

    expect(userAuthenticated).toEqual(user);
  });
});
