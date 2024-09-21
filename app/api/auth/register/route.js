import { NextResponse } from 'next/server';
import { registerUser } from '../../../../lib/user';

export async function POST(request) {
  try {
    if (request.headers.get('content-type') !== 'application/json') {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const result = await registerUser(email, password);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
