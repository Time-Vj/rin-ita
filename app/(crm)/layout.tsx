import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';

export default async function CRMLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-semibold">Unauthorized</h1>
        <p className="mt-2">
          Please <Link href="/" className="text-blue-600 underline">log in</Link> to access the CRM.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-800 text-white flex flex-col justify-between shadow-2xl">
        <div className="flex flex-col h-full">
          <div className="px-8 pt-8 pb-4 flex items-center space-x-2">
            <span className="text-2xl font-extrabold tracking-wide">CRM</span>
          </div>
          {/* Menu */}
          <nav className="flex-1 px-8 py-2 space-y-4">
            <div>
              <div className="text-xs uppercase text-blue-300 tracking-widest mb-2">Anagrafica</div>
              <Link href="/dashboard" className="block py-2 px-2 rounded hover:bg-blue-900 transition">Dashboard</Link>
              {user.role !== "CLIENTE" && (
                <>
                  <Link href="/clients" className="block py-2 px-2 rounded hover:bg-blue-900 transition">Clienti</Link>
                  <Link href="/notes" className="block py-2 px-2 rounded hover:bg-blue-900 transition">Note Generali</Link>
                  <Link href="/calendar" className="block py-2 px-2 rounded hover:bg-blue-900 transition">Calendario</Link>
                </>
              )}
            </div>
            {user.role !== "CLIENTE" && (
              <div>
                <div className="text-xs uppercase text-blue-300 tracking-widest mb-2">Gestione</div>
                <Link href="/deals" className="block py-2 px-2 rounded hover:bg-blue-900 transition">Opportunità/Deals</Link>
                <Link href="/exports" className="block py-2 px-2 rounded hover:bg-blue-900 transition">Esportazioni</Link>
                <Link href="/settings" className="block py-2 px-2 rounded hover:bg-blue-900 transition">Impostazioni</Link>

                {(user.role === 'ADMIN' || user.role === 'IT_SUPPORT') && (
                  <Link href="/workers" className="block py-2 px-2 rounded hover:bg-blue-900 transition">Gestione Utenti</Link>
                )}
              </div>
            )}
          </nav>
          <form action="/api/auth/logout" method="POST" className="px-8 pb-2 pt-2">
            <button type="submit" className="text-sm text-blue-200 underline hover:text-blue-100 mb-5">Logout</button>
          </form>
        </div>
        {/* User Info */}
        <div className="px-8 pb-8">
          <div className="rounded-xl bg-blue-950 bg-opacity-60 p-4 text-xs flex flex-col items-start shadow-lg">
            <span className="font-semibold text-white mb-1">{user.name || user.email}</span>
            <span className="text-blue-200 capitalize">{user.role.toLowerCase()}</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-auto">{children}</main>
    </div>
  );
}
