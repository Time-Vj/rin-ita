import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '../../../../lib/prisma';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = user.id; // Replace with JWT later if needed

  const cookie = serialize('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  const res = NextResponse.json({ message: 'Login successful' });
  res.headers.set('Set-Cookie', cookie);
  return res;
}