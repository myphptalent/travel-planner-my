export default function StatCard({
  title,
  value,
  color,
}: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow hover:shadow-md transition hover:-translate-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-200">{title}</p>

      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
}