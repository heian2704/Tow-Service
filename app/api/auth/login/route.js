import { NextResponse } from 'next/server';
import { verifyUser } from '../../../../lib/user';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    if (request.headers.get('content-type') !== 'application/json') {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const result = await verifyUser(email, password);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const token = jwt.sign({ userId: result.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token, email: result.email }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
