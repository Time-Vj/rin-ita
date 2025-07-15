'use client';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  color?: 'blue' | 'orange' | 'indigo';
}

const themeColorMap: Record<string, string> = {
  blue: '#2563eb',     // Tailwind blue-600
  orange: '#f97316',   // Tailwind orange-500
  indigo: '#6366f1',   // Tailwind indigo-500
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  color = 'blue',
}: AuthLayoutProps) {
  const gradient =
    color === 'orange'
      ? 'from-orange-500 to-orange-400'
      : color === 'indigo'
      ? 'from-indigo-600 to-indigo-400'
      : 'from-blue-600 to-blue-400';

  const hexColor = themeColorMap[color];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      style={{ ['--theme-color' as string]: hexColor }}
    >
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className={`bg-gradient-to-br ${gradient} text-white p-10 flex flex-col justify-center md:w-1/2`}>
          <div>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-sm opacity-90">{subtitle}</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-10 md:w-1/2 w-full">{children}</div>
      </div>
    </div>
  );
}
