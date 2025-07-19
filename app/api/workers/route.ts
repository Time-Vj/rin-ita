import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || (user.role === 'CLIENTE')) {
    return NextResponse.json({ error: 'Accesso negato' }, { status: 403 });
  }

  // Leggi ?role=DIPENDENTE (o altro ruolo) dalla query string
  const role = req.nextUrl.searchParams.get("role");

  let where: any = {};
  if (role) {
    where.role = role;
  }

  const users = await prisma.user.findMany({
    where,
    select: { id: true, name: true, email: true, role: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ users });
}
