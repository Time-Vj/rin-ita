import React from 'react';
import { requireRole } from '@/lib/auth';

export default async function WorkersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(['ADMIN', 'IT_SUPPORT']);

  return (
    <section>
      <h1>Area Workers - Accesso riservato a Admin e IT Support</h1>
      {children}
    </section>
  );
}