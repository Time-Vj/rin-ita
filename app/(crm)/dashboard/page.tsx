import { getCurrentUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="bg-white p-4 mb-6 shadow rounded border">
        <p className="text-gray-700 text-sm">
          <strong>Name:</strong> {user?.name || 'N/A'}
        </p>
        <p className="text-gray-700 text-sm">
          <strong>User ID:</strong> {user?.id}
        </p>
        <p className="text-gray-700 text-sm">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="text-gray-700 text-sm">
          <strong>Ruolo:</strong> {user?.role}
        </p>
      </div>

      
    </div>
  );
}
