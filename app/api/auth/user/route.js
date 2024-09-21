import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getUserById } from '../../../../lib/user';

export async function GET(request) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ email: user.email }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
