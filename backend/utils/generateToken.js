import jwt from 'jsonwebtoken';

export const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET || 'hirehub_super_secret_jwt_key_2026';
  const expire = process.env.JWT_EXPIRE || '7d';
  return jwt.sign({ id, role }, secret, {
    expiresIn: expire,
  });
};

export default generateToken;
