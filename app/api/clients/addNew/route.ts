import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  // User autenticato
  const user = await getCurrentUser();
  if (!user || user.role === 'CLIENTE') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 });
  }

  // Usa formData() per estrarre dati e file (Next.js 14+)
  const formData = await req.formData();

  const tipoCliente = formData.get('tipoCliente') as string;
  const nome = formData.get('nome') as string | null;
  const cognome = formData.get('cognome') as string | null;
  const ragioneSociale = formData.get('ragioneSociale') as string | null;
  const piva = formData.get('piva') as string | null;
  const cf = formData.get('cf') as string | null;
  const indirizzo = formData.get('indirizzo') as string | null;
  const telefono = formData.get('telefono') as string | null;
  const email = formData.get('email') as string;
  const responsabileId = formData.get('responsabileId') as string | null;

  // Prepara upload directory
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  // Gestione file
  const files = formData.getAll('documenti');
  const uploadedDocs = [];

  for (const file of files) {
    if (
      typeof file === "object" &&
      "arrayBuffer" in file &&
      (file as File).size > 0 // solo se c’è un vero file
    ) {
      // Assicurati che ogni file abbia un nome unico
      let filename = (file as File).name;
      if (!filename) {
        filename = randomUUID() + ".dat";
      }
      const bytes = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, bytes);

      uploadedDocs.push({
        url: `/uploads/${filename}`,
        filename,
      });
    }
  }

  // Salva il cliente nel DB
  const client = await prisma.client.create({
    data: {
      tipo: tipoCliente,
      nome: nome || undefined,
      cognome: cognome || undefined,
      ragioneSociale: ragioneSociale || undefined,
      piva: piva || undefined,
      cf: cf || undefined,
      indirizzo: indirizzo || undefined,
      telefono: telefono || undefined,
      email,
      responsabileId: responsabileId || undefined,
      documenti: {
        create: uploadedDocs.map(doc => ({
          url: doc.url,
          filename: doc.filename,
        })),
      },
    },
    include: { documenti: true }
  });

  return NextResponse.json({ success: true, client });
}
