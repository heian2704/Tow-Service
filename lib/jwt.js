import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '853836bd100b2fa0b38a36ac875e8a682f9eabba089d7e35433e6faa6b846cf6ee7ffcff79a65386a898cc82af1e662aeb100a59a20c2431cead85d9e2344de0';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
