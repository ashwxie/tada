export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Sidebar - Maintenance/Recovery Links */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4">
        <h2 className="text-sm font-semibold text-zinc-500 mb-4">TADA</h2>
        <nav className="space-y-2">
          <div className="p-2 rounded hover:bg-zinc-200 cursor-pointer">Dashboard</div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-6">
          <span className="text-sm font-medium">Status: Online</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}