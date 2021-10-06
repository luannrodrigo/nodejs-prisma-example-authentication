import { v4 as uuid } from 'uuid';

class FakeUserRepository {
  async create(name, email, password) {
    const users = [];

    const user = { name, email, password };

    Object.assign(user, { id: uuid(), name, email, password });

    users.push(user);

    return users;
  }
}

export default new FakeUserRepository();
