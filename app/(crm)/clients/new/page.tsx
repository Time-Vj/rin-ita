"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import AutocompleteDipendente from "@/components/AutocompleteDipendente";

function validaPartitaIva(piva: string) {
  return /^\d{11}$/.test(piva); // 11 cifre numeriche
}
function validaCodiceFiscale(cf: string) {
  return /^[A-Z0-9]{16}$/i.test(cf); // 16 caratteri alfanumerici
}

export default function NewContactPage() {
  const [tipoCliente, setTipoCliente] = useState<"PRIVATO" | "AZIENDA">("PRIVATO");
  const [loading, setLoading] = useState(false);
  const [responsabileId, setResponsabileId] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // UI Feedback per il submit
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = formRef.current;
    if (!form) return;

    // Prendi i dati per le validazioni custom
    const data = new FormData(form);
    const piva = (data.get("piva") || "").toString().trim();
    const cf = (data.get("cf") || "").toString().trim();
    const telefono = (data.get("telefono") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();

    // PARTITA IVA E CF DEVONO ESSERE VALIDI (se inseriti)
    if (piva && !validaPartitaIva(piva)) {
      setError("La Partita IVA deve contenere 11 cifre.");
      setLoading(false);
      return;
    }
    if (cf && !validaCodiceFiscale(cf)) {
      setError("Il Codice Fiscale deve contenere 16 caratteri alfanumerici.");
      setLoading(false);
      return;
    }

    // Assegna dipendente OBBLIGATORIO
    if (!responsabileId) {
      setError("Seleziona il dipendente responsabile.");
      setLoading(false);
      return;
    }

    // Telefono O Email obbligatori
    if (!telefono && !email) {
      setError("Compila almeno uno tra Telefono o Email.");
      setLoading(false);
      return;
    }

    const formData = new FormData(form);
    try {
      const res = await fetch("/api/clients/addNew", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Errore nel salvataggio cliente");

      setSuccess("Cliente aggiunto con successo!");
      form.reset();
      setResponsabileId("");
    } catch (err: any) {
      setError(err.message || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      {/* Torna alla lista */}
      <div className="mb-4">
        <Link href="/clients">
          <button className="text-blue-700 hover:text-blue-900 underline text-sm">&larr; Torna ai miei clienti</button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Nuovo Cliente</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        {/* Tipo Cliente */}
        <div>
          <label className="block text-sm font-semibold mb-1">Tipo Cliente</label>
          <select
            name="tipoCliente"
            value={tipoCliente}
            onChange={e => setTipoCliente(e.target.value as "PRIVATO" | "AZIENDA")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="PRIVATO">Privato</option>
            <option value="AZIENDA">Azienda</option>
          </select>
        </div>

        {/* Nome/Cognome (solo privato) */}
        {tipoCliente === "PRIVATO" && (
          <>
            <div>
              <label className="block text-sm font-semibold mb-1">Nome</label>
              <input name="nome" required className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Cognome</label>
              <input name="cognome" required className="w-full border rounded px-3 py-2" />
            </div>
          </>
        )}

        {/* Ragione Sociale (solo azienda) */}
        {tipoCliente === "AZIENDA" && (
          <div>
            <label className="block text-sm font-semibold mb-1">Ragione Sociale</label>
            <input name="ragioneSociale" required className="w-full border rounded px-3 py-2" />
          </div>
        )}

        {/* Assegna dipendente */}
        <AutocompleteDipendente value={responsabileId} onChange={setResponsabileId} />

        {/* P.IVA, CF, indirizzo, telefono, email */}
        <div>
          <label className="block text-sm font-semibold mb-1">Partita IVA</label>
          <input name="piva" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Codice Fiscale</label>
          <input name="cf" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Indirizzo</label>
          <input name="indirizzo" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Telefono</label>
          <input name="telefono" type="tel" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input name="email" type="email" className="w-full border rounded px-3 py-2" />
        </div>

        {/* Upload documenti */}
        <div>
          <label className="block text-sm font-semibold mb-1">Documenti (PDF, JPG, PNG, max 10MB ciascuno)</label>
          <input name="documenti" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="block mt-1" />
        </div>

        {/* Submit */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded shadow"
          >
            {loading ? "Salvataggio..." : "Aggiungi Cliente"}
          </button>
        </div>

        {/* Messaggi */}
        {success && <div className="text-green-600">{success}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}
