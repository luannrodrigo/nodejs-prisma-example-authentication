import AppError from '../../errors/AppError';
import UserRepository from '../repositories/UserRepository';

class CreateUserService {
  constructor(repository = UserRepository) {
    this.orm = repository;
  }

  inject(repository) {
    this.orm = repository;
  }

  async run({ name, email, password }) {
    const checkUserExist = await this.orm.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('Email already exist!', 401);
    }

    const user = await this.orm.create(name, email, password);

    return user;
  }
}

export default CreateUserService;
