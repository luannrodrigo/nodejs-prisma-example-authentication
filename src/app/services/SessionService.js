import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import UserRepository from '../repositories/UserRepository';
import authConfig from '../../config/auth';

class SessionService {
  constructor(respository = UserRepository) {
    this.orm = respository;
  }

  async run({ email, password }) {
    const isUserExist = await this.orm.findByEmail(email);

    if (!isUserExist) {
      throw new AppError('Email/Password incorrect', 401);
    }

    const checkPassword = await bcrypt.compare(password, isUserExist.password);

    if (!checkPassword) {
      throw new AppError('Email/Password incorrect', 401);
    }

    const { id, name } = isUserExist;

    return {
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  }
}

export default new SessionService();
