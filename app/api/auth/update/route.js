import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { updateUser } from '../../../../lib/user'; // Ensure this function uses Mongoose

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
