import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

class UserController {
  async store(request, response) {
    const { name, email, password } = request.body;

    const service = new CreateUserService();

    const user = await service.run({ name, email, password });

    return response.status(201).json(user);
  }

  async update(request, response) {
    const { name, password } = request.body;
    const id = request.userId;

    const user = await UpdateUserService.run({ id, name, password });

    return response.status(201).json(user);
  }
}

export default new UserController();
