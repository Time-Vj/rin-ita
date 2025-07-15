import { cookies } from 'next/headers';
import prisma from './prisma';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
}

export async function requireRole(allowedRoles: string[]) {
  const user = await getCurrentUser();

  if (!user || !allowedRoles.includes(user.role)) {
    redirect('/dashboard'); // redirect a pagina base CRM o access denied
  }

  return user;
}
