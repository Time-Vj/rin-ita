import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user || (user.role !== 'ADMIN' && user.role !== 'IT_SUPPORT')) {
    return NextResponse.json({ error: 'Accesso negato' }, { status: 403 });
  }

  const { id: userId, role } = await request.json();
  const validRoles = ['ADMIN', 'IT_SUPPORT', 'DIPENDENTE', 'CLIENTE'];

  if (!userId || !validRoles.includes(role)) {
    return NextResponse.json({ error: 'Dati non validi' }, { status: 400 });
  }

  // Protezione: non puoi cambiarti ruolo da solo (opzionale)
  if (userId === user.id && role !== user.role) {
    return NextResponse.json({ error: "Non puoi modificare il tuo ruolo." }, { status: 400 });
  }

  try {
    // Recupera il ruolo precedente dell'utente
    const userBefore = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!userBefore) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    // Aggiorna il ruolo
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    // Salva il log della modifica
    await prisma.roleChangeLog.create({
      data: {
        userId: userId,
        changedById: user.id,
        oldRole: userBefore.role,
        newRole: role,
        // changedAt viene inserito automaticamente
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Errore durante l'aggiornamento del ruolo" }, { status: 500 });
  }
}
