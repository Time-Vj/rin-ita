"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import AutocompleteDipendente from "@/components/AutocompleteDipendente";
import deepEqual from "fast-deep-equal";

export default function ClientDetailPage() {
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [cliente, setCliente] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [tempCliente, setTempCliente] = useState<any>(null); // per modifiche in edit
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/clients/${id}`)
      .then(res => res.json())
      .then(data => {
        setCliente(data.client);
        setTempCliente(data.client);
      })
      .catch(() => setError("Errore nel caricamento"))
      .finally(() => setLoading(false));
  }, [id]);

  // Handler per modifiche campo in edit
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTempCliente({ ...tempCliente, [e.target.name]: e.target.value });
  };

  // Aggiorna dipendente assegnato
  const handleResponsabileChange = (dipId: string) => {
    setTempCliente({ ...tempCliente, responsabileId: dipId });
  };

  // Salva modifiche
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempCliente),
      });
      if (!res.ok) throw new Error("Errore nel salvataggio");
      setSuccess("Modifiche salvate!");
      setCliente(tempCliente);      // aggiorna la vista read-only
      setEditMode(false);
    } catch (err: any) {
      setError(err.message || "Errore");
    } finally {
      setLoading(false);
    }
  };

  // Elimina cliente
  const handleDelete = async () => {
    if (!confirm("Sei sicuro di voler eliminare questo cliente?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Errore nell'eliminazione");
      router.push("/clients");
    } catch (err: any) {
      setError(err.message || "Errore");
    } finally {
      setLoading(false);
    }
  };

  // ANNULLA edit mode
  const handleCancel = () => {
    setTempCliente(cliente);
    setEditMode(false);
    setSuccess(null);
    setError(null);
  };

  if (loading) return <div className="p-6">Caricamento...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!cliente) return <div className="p-6">Cliente non trovato.</div>;

  const isDirty = !deepEqual(cliente, tempCliente);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <div className="mb-4 flex justify-between items-center">
        <Link href="/clients">
          <button className="text-blue-700 hover:text-blue-900 underline text-sm">&larr; Torna ai clienti</button>
        </Link>
        {!editMode && (
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow" onClick={() => setEditMode(true)}>
            Modifica
          </button>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-6">Dettaglio Cliente</h1>

      {!editMode ? (
        // ----- READ-ONLY MODE -----
        <div className="space-y-4">
          <div><b>Tipo Cliente:</b> {cliente.tipo}</div>
          {cliente.tipo === "PRIVATO" ? (
            <>
              <div><b>Nome:</b> {cliente.nome || <span className="text-gray-400">-</span>}</div>
              <div><b>Cognome:</b> {cliente.cognome || <span className="text-gray-400">-</span>}</div>
            </>
          ) : (
            <div><b>Ragione Sociale:</b> {cliente.ragioneSociale || <span className="text-gray-400">-</span>}</div>
          )}
          <div><b>Dipendente responsabile:</b> {cliente.responsabile?.name || cliente.responsabileId || <span className="text-gray-400">-</span>}</div>
          <div><b>Partita IVA:</b> {cliente.piva || <span className="text-gray-400">-</span>}</div>
          <div><b>Codice Fiscale:</b> {cliente.cf || <span className="text-gray-400">-</span>}</div>
          <div><b>Indirizzo:</b> {cliente.indirizzo || <span className="text-gray-400">-</span>}</div>
          <div><b>Telefono:</b> {cliente.telefono || <span className="text-gray-400">-</span>}</div>
          <div><b>Email:</b> {cliente.email || <span className="text-gray-400">-</span>}</div>
          <div><b>Data fine contratto:</b> {cliente.dataFineContratto ? cliente.dataFineContratto.slice(0, 10) : <span className="text-gray-400">-</span>}</div>
          <div className="pt-3">
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
            >
              Elimina Cliente
            </button>
          </div>
        </div>
      ) : (
        // ----- EDIT MODE -----
        <form className="space-y-5" onSubmit={handleSave}>
          <div>
            <label className="block text-sm font-semibold mb-1">Tipo Cliente</label>
            <select
              name="tipo"
              value={tempCliente.tipo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled
            >
              <option value="PRIVATO">Privato</option>
              <option value="AZIENDA">Azienda</option>
            </select>
          </div>
          {tempCliente.tipo === "PRIVATO" ? (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">Nome</label>
                <input
                  name="nome"
                  value={tempCliente.nome || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Cognome</label>
                <input
                  name="cognome"
                  value={tempCliente.cognome || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-semibold mb-1">Ragione Sociale</label>
              <input
                name="ragioneSociale"
                value={tempCliente.ragioneSociale || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}

          <AutocompleteDipendente value={tempCliente.responsabileId || ""} onChange={handleResponsabileChange} />

          <div>
            <label className="block text-sm font-semibold mb-1">Partita IVA</label>
            <input
              name="piva"
              value={tempCliente.piva || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Codice Fiscale</label>
            <input
              name="cf"
              value={tempCliente.cf || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Indirizzo</label>
            <input
              name="indirizzo"
              value={tempCliente.indirizzo || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Telefono</label>
            <input
              name="telefono"
              value={tempCliente.telefono || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              name="email"
              value={tempCliente.email || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Data fine contratto</label>
            <input
              type="date"
              name="dataFineContratto"
              value={tempCliente.dataFineContratto ? tempCliente.dataFineContratto.slice(0, 10) : ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex gap-4 pt-3">
            <button
              type="submit"
              disabled={loading || !isDirty}
              className={`bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded shadow ${(!isDirty || loading) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Salvataggio..." : "Salva Modifiche"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded shadow"
            >
              Annulla
            </button>
          </div>
          {success && <div className="text-green-600">{success}</div>}
          {error && <div className="text-red-600">{error}</div>}
        </form>
      )}
    </div>
  );
}
