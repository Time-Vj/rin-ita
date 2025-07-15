'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const isPasswordStrong = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Registrazione fallita');
    } else {
      setMessage('Registrazione completata! Ora puoi accedere.');
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl border border-gray-200">

        {/* Colonna Sinistra */}
        <div className="hidden md:flex md:w-1/2 bg-[#40a644] text-white flex-col justify-between p-10">
          <div>
            <h1 className="text-4xl font-bold">Rinnovaitalia</h1>
            <p className="mt-8 text-lg leading-relaxed">
              Unisciti alla nostra piattaforma e trasforma la tua casa in un esempio di efficienza e sostenibilità.
            </p>
          </div>
          <div>
            <a
              href="/"
              className="inline-block border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-[#40a644] transition"
            >
              Torna al sito →
            </a>
          </div>
        </div>

        {/* Colonna Destra: Form di Registrazione */}
        <div className="w-full md:w-1/2 bg-white text-black px-10 py-12">
          <h2 className="text-3xl font-bold mb-2">Registrati</h2>
          <p className="text-sm text-gray-600 mb-8">
            Hai già un account?{' '}
            <a href="/login" className="text-[#40a644] hover:underline">
              Accedi
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm block mb-1">
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-sm focus:ring-2 focus:ring-[#40a644] outline-none"
                placeholder="Mario Rossi"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-sm focus:ring-2 focus:ring-[#40a644] outline-none"
                placeholder="tuo@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm block mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-sm focus:ring-2 focus:ring-[#40a644] outline-none"
                placeholder="••••••••"
              />
              {!isPasswordStrong && (
                <p className="text-sm text-red-500 mt-1">
                  La password deve contenere almeno 6 caratteri.
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <input type="checkbox" id="terms" required className="accent-[#40a644]" />
              <label htmlFor="terms">
                Accetto i{' '}
                <a href="#" className="text-[#40a644] hover:underline">
                  Termini & Condizioni
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isPasswordStrong}
              className="w-full py-2 bg-[#40a644] hover:bg-[#2e8336] text-white rounded-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Registrati
            </button>
          </form>

          {message && (
            <p className="text-center text-sm mt-6 text-[#40a644] font-medium">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
