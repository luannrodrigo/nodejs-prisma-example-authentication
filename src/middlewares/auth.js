import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token not informad' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    request.userId = decoded.id;

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalid!' });
  }
};
