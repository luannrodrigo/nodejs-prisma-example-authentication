import { v4 as uuid } from 'uuid';

class FakeUserRepository {
  constructor() {
    this.users = [];
  }

  async findByEmail(email) {
    const checkUser = this.users.find((user) => user.email === email);

    return checkUser;
  }

  async findById(id) {
    const checkUser = this.users.find((user) => user.id === id);

    return checkUser;
  }

  async update(id, name, password) {
    const checkUser = this.users.findIndex((user) => user.id === id);

    const user = { name, password };

    this.users[checkUser] = { id, name: user?.name, password: user?.password };

    return this.users[checkUser];
  }

  async create(name, email, password) {
    const user = { name, email, password };

    const userWithId = Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
    });

    this.users.push(user);

    return userWithId;
  }
}

export default new FakeUserRepository();
