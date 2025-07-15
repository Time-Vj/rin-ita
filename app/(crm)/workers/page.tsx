"use client";

import React, { useEffect, useState } from "react";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
};

const roles = ["ADMIN", "IT_SUPPORT", "DIPENDENTE", "CLIENTE"];

export default function ManageWorkers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState<string>("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/workers");
      if (!res.ok) throw new Error("Errore nel caricamento utenti");
      const data = await res.json();
      setUsers(data.users);  // <-- qui la modifica principale
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateUserRole(userId: string, newRole: string) {
    try {
      const res = await fetch(`/api/workers/role/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      if (!res.ok) throw new Error("Errore nell'aggiornamento ruolo");
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (e) {
      alert("Errore nell'aggiornamento ruolo");
    }
  }

  const filteredUsers =
    filterRole === "All" ? users : users.filter((u) => u.role === filterRole);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestione Lavoratori</h2>

      <div className="mb-4">
        <label htmlFor="roleFilter" className="mr-2 font-semibold">
          Filtra per ruolo:
        </label>
        <select
          id="roleFilter"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="All">Tutti</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Caricamento utenti...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-1">Nome</th>
              <th className="border border-gray-300 px-3 py-1">Email</th>
              <th className="border border-gray-300 px-3 py-1">Ruolo</th>
              <th className="border border-gray-300 px-3 py-1">Modifica Ruolo</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-3 py-1">
                    {user.name ?? "N/A"}
                  </td>
                  <td className="border border-gray-300 px-3 py-1">{user.email}</td>
                  <td className="border border-gray-300 px-3 py-1">{user.role}</td>
                  <td className="border border-gray-300 px-3 py-1">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Nessun utente trovato
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
