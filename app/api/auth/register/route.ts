import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '../../../../lib/prisma';

export async function POST(req: Request) {
  const { name, email, role, password } = await req.json();

  if (!email || !password || password.length < 6) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name || '',
      role: role,
    },
  });

  return NextResponse.json({ message: 'User registered' });
}
