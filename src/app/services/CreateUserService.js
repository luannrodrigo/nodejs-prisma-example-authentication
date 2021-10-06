import AppError from '../../errors/AppError';
import UserRepository from '../repositories/UserRepository';

class CreateUserService {
  constructor(repository = UserRepository) {
    this.orm = repository;
  }

  async run({ name, email, password }) {
    const isUserExist = await this.orm.findByEmail(email);

    if (isUserExist) {
      throw new AppError('Email already exist!', 401);
    }

    const user = await this.orm.create(name, email, password);

    return user;
  }
}

export default new CreateUserService();
