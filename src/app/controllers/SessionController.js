import SessionService from '../services/SessionService';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const session = await SessionService.run({ email, password });

    return response.status(201).json(session);
  }
}

export default new SessionController();
