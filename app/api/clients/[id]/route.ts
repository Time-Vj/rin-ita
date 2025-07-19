import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// GET: Leggi i dati del cliente
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role === "CLIENTE") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 403 });
  }

  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: { documenti: true },
  });

  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ client });
}

// PUT: Modifica i dati del cliente
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    // SOLO i campi previsti dal model Client
    const allowed = [
      "nome", "cognome", "ragioneSociale", "tipo", "piva", "cf",
      "indirizzo", "telefono", "email", "responsabileId", "dataFineContratto"
    ];
    const data: any = {};
    for (const key of allowed) {
      if (key in body) data[key] = body[key] === "" ? null : body[key];
    }

    // Debug log
    console.log("Update client:", params.id, data);

    const updated = await prisma.client.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ client: updated });
  } catch (error) {
    console.error("Errore preciso:", error);
    return NextResponse.json({ error: "Errore aggiornamento" }, { status: 500 });
  }
}

// DELETE: Cancella il cliente
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role === "CLIENTE") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 403 });
  }

  try {
    await prisma.client.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Errore eliminazione" }, { status: 500 });
  }
}
