'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  user: { email: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-gray-800">🛡️ AuthApp</Link>

      <nav className="relative">
        {!user ? (
          <div className="space-x-4">
            <a
              href="/login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </a>
            <a
              href="/register"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Register
            </a>
          </div>
        ) : (
          <div className="relative inline-block text-left">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                {user.email[0].toUpperCase()}
              </span>
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                <a
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </a>
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
