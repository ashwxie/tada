export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard title="SAN" value="85%" color="bg-emerald-500" />
      <MetricCard title="Dice" value="1.2" color="bg-amber-500" />
      <MetricCard title="XP" value="4500" color="bg-blue-500" />
      <MetricCard title="FP" value="12%" color="bg-indigo-500" />
    </div>
  );
}

function MetricCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
      <div className="text-xs text-zinc-500 mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`h-1 w-full mt-2 rounded-full ${color} opacity-20`} />
    </div>
  );
}