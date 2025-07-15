'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Login failed');
    } else {
      window.location.href = '/dashboard';
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
              Efficienza energetica, sostenibilità e innovazione al servizio della tua casa.
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

        {/* Colonna Destra: Login Form */}
        <div className="w-full md:w-1/2 bg-white text-black px-10 py-12">
          <h2 className="text-3xl font-bold mb-2">Accedi</h2>
          <p className="text-sm text-gray-600 mb-8">
            Non hai un account?{' '}
            <Link href="/register" className="text-[#40a644] hover:underline">Registrati</Link>
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-sm block mb-1">Email</label>
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
              <label htmlFor="password" className="text-sm block mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-sm focus:ring-2 focus:ring-[#40a644] outline-none"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" className="accent-[#40a644]" />
                <label htmlFor="terms">
                  Accetto i <a href="#" className="text-[#40a644] hover:underline">Termini & Condizioni</a>
                </label>
              </div>
              <a href="#" className="text-[#40a644] hover:underline">Password dimenticata?</a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#40a644] hover:bg-[#2e8336] text-white rounded-md font-semibold transition-all"
            >
              Accedi
            </button>

            {message && (
              <p className="text-center text-red-500 mt-2">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
