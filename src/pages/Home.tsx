import { useEffect, useState } from "react";
import { getDashboardStats, getRecentTrips } from "../utils/dashboardStats";
import StatCard from "../components/common/StatCard";
import RecentTrips from "../components/dashboard/RecentTrips";

export default function Home() {
  const [stats, setStats] = useState({
    totalTrips: 0,
    uniqueDestinations: 0,
    upcomingTrips: 0,
  });

  const [recentTrips, setRecentTrips] = useState<any[]>([]);

  useEffect(() => {
    setStats(getDashboardStats());
    setRecentTrips(getRecentTrips(5));
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm dark:text-gray-200">
          Plan and explore your next trip with ease.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Trips Planned"
          value={stats.totalTrips}
          color="text-blue-600"
        />
        <StatCard
          title="Saved Destinations"
          value={stats.uniqueDestinations}
          color="text-indigo-600"
        />
        <StatCard
          title="Upcoming Trips"
          value={stats.upcomingTrips}
          color="text-green-600"
        />
      </div>

      {/* Recent Trips */}
      {stats.totalTrips > 0 && (
        <RecentTrips trips={recentTrips} />
      )}

      {/* Empty State */}
      {stats.totalTrips === 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center text-gray-500">
          No trips planned yet 🌍 <br />
          Start by searching destinations!
        </div>
      )}
    </div>
  );
}