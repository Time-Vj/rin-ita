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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 space-y-6">
        <h1 className="text-xl font-bold">CRM</h1>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block hover:text-blue-200">Dashboard</Link>
          <Link href="/contacts" className="block hover:text-blue-200">Contacts</Link>
          <Link href="/deals" className="block hover:text-blue-200">Deals</Link>
          <Link href="/workers" className="block hover:text-blue-200">Workers</Link>
        </nav>
        <form action="/api/auth/logout" method="POST" className="pt-6">
          <button type="submit" className="text-sm text-white underline">Logout</button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
