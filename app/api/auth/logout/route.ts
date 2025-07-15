import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  // Clear the session cookie
  const cookie = serialize('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  // Redirect to homepage using absolute URL
  const response = NextResponse.redirect(new URL('/', req.url));
  response.headers.set('Set-Cookie', cookie);
  return response;
}
