import bcrypt from 'bcryptjs';

export default async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 8);

  return hash;
}
