// /app/api/refresh-token/route.js
import { verifyRefreshToken, generateAccessToken } from '@/lib/jwt';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  await connectToDatabase();

  const { refreshToken } = await req.json(); // Extract the refresh token from the request body

  if (!refreshToken) {
    return new Response(
      JSON.stringify({ success: false, message: 'Refresh token is required' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Verify the refresh token
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid or expired refresh token' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Generate a new access token
  const newAccessToken = generateAccessToken(decoded.userId);

  return new Response(
    JSON.stringify({ success: true, accessToken: newAccessToken }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
