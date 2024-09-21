import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { updateUser } from '../../../../lib/user'; // Ensure this function uses Mongoose
import { getUserById } from '../../../../lib/user';

export async function GET(request) {
    try {
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (!token) {
        console.error('No token provided');
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      }
  
      let userId;
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (err) {
        console.error('Invalid token:', err);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
  
      const user = await getUserById(userId);
      if (!user) {
        console.error('User not found:', userId);
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ email: user.email });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
// Update user data by ID
export async function PUT(request) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { email, password } = await request.json();

    const result = await updateUser(userId, email, password);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: 'Profile updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
