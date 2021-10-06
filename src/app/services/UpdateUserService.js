import AppError from '../../errors/AppError';
import UserRepository from '../repositories/UserRepository';

class CreateUserService {
  constructor(repository = UserRepository) {
    this.orm = repository;
  }

  async run({ id, name, password }) {
    const isUserExist = await this.orm.findById(id);

    if (!isUserExist) {
      throw new AppError('User not exist', 401);
    }

    const user = await this.orm.update(id, name, password);

    return user;
  }
}

export default new CreateUserService();
