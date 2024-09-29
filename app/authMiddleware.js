import { verify } from 'jsonwebtoken';

const authenticate = async (req) => {
  const token = req.cookies.get('auth-token'); // Using the cookies API in the app directory

  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = verify(token, process.env.SECRET_KEY); // Decode the JWT
    req.user = decoded; // Attach the user to the request object
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export default authenticate;
