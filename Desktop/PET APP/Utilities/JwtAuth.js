import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  const token = jwt.sign({ UserId: userId }, 'your-secret-key', { expiresIn: '1h' });
  return token;
};