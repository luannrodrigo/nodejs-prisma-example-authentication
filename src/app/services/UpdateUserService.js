import AppError from '../../errors/AppError';
import UserRepository from '../repositories/UserRepository';

class CreateUserService {
  /* istanbul ignore next */
  // only disable line coverage for this constructor
  constructor(repository = UserRepository) {
    this.orm = repository;
  }

  async run({ id, name, password }) {
    const checkUserExist = await this.orm.findById(id);

    if (!checkUserExist) {
      throw new AppError('User not exist', 401);
    }

    const user = await this.orm.update(id, name, password);

    return user;
  }
}

export default CreateUserService;
