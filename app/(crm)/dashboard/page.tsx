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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">📇 Contacts: 0</div>
        <div className="bg-white p-4 shadow rounded">💼 Deals: 0</div>
        <div className="bg-white p-4 shadow rounded">📈 Revenue: $0</div>
      </div>
    </div>
  );
}
