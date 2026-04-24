import { useNavigate } from "react-router-dom";

export default function RecentTrips({ trips }: any) {
  const navigate = useNavigate();
  
  if (!trips.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center text-gray-500">
        No recent trips yet 🌍 <br />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Recent Trips
        </h2>

        <button
          onClick={() => navigate("/saved-trips")}
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </button>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 transition ">
        {trips.map((trip: any, index: number) => {
            const start = trip.startDate
            ? new Date(trip.startDate).toLocaleDateString()
            : null;

            const end = trip.endDate
            ? new Date(trip.endDate).toLocaleDateString()
            : null;

            return (
            <div
                key={trip.id || index}
                onClick={() => navigate(`/trip/${trip.id || index}`)}
        className="rounded-xl p-4 hover:shadow-md transition cursor-pointer bg-gray-50 dark:bg-gray-700"
      >
        {/* City */}
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          {trip.city}
        </h3>

        {/* Country with Flag */}
        <div className="flex items-center gap-2 mt-1">
          {trip.country?.flag && (
            <img
              src={trip.country.flag}
              alt={trip.country.name}
              className="w-5 h-5 rounded object-cover"
            />
          )}

          <span className="text-sm text-gray-500 dark:text-gray-300">
            {trip.country?.name || "Unknown Country"}
          </span>
        </div>

        {/* Date Range */}
        {(start || end) && (
          <p className="text-xs text-gray-400 mt-2">
            📅{" "}
            {start && end
              ? `${start} → ${end}`
              : start
              ? start
              : end}
          </p>
        )}
      </div>
    );
  })}
</div>
    </div>
  );
}