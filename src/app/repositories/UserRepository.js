import bcrypt from 'bcryptjs';
import prisma from '../../database';

class UserRepository {
  async findByEmail(email) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async findById(id) {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  async create(name, email, password) {
    const hashPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    delete user.password;

    return user;
  }

  async update(userid, name, password) {
    const hashPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.update({
      where: {
        id: userid,
      },
      data: {
        name,
        password: hashPassword,
      },
    });

    return user;
  }
}

export default new UserRepository();
