import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function ContactsPage() {
  const user = await getCurrentUser();

  // Recupera tutti i clienti (puoi filtrare per ruolo/responsabile se vuoi)
  const clienti = await prisma.client.findMany({
    include: {
      responsabile: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Anagrafica Clienti</h1>
        {user?.role !== 'CLIENTE' && (
          <Link href="/clients/new">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow">
              + Nuovo Cliente
            </button>
          </Link>
        )}
      </div>

      {/* Lista clienti */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow border">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Nome / Ragione Sociale</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Responsabile</th>
              <th className="px-4 py-2 text-left">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {clienti.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  Nessun cliente presente.
                </td>
              </tr>
            ) : (
              clienti.map(cliente => (
                <tr key={cliente.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-4 py-2">{cliente.tipo}</td>
                  <td className="px-4 py-2">
                    {cliente.tipo === "AZIENDA"
                      ? cliente.ragioneSociale
                      : `${cliente.nome ?? ""} ${cliente.cognome ?? ""}`}
                  </td>
                  <td className="px-4 py-2">{cliente.email}</td>
                  <td className="px-4 py-2">
                    {cliente.responsabile?.name
                      ? cliente.responsabile.name
                      : cliente.responsabile?.email
                        ? cliente.responsabile.email
                        : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/clients/${cliente.id}`}
                      className="text-blue-700 underline hover:text-blue-900"
                    >
                      Dettagli
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
