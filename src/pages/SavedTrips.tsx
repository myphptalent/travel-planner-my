import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteTrip, toggleFavorite } from "../redux/slices/tripsSlice";
import ConfirmModal from "../components/common/ConfirmModal";
import { showToast } from "../redux/slices/uiSlice";

export default function SavedTrips() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const trips = useAppSelector((state) => state.trips.savedTrips);
  const [sortBy, setSortBy] = useState("latest");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const handleDelete = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      dispatch(deleteTrip(selectedId));
    }
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const handleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
    dispatch(
          showToast({
            message: "Trip favorite status updated ❤️",
            type: "success",
          })
        );
  };

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const filteredTrips = useMemo(() => {
      let result = [...trips];

      if (showFavoritesOnly) {
        result = result.filter((trip) => trip.isFavorite);
      }

      // Existing sorting logic
      if (sortBy === "latest") {
        result.sort(
          (a, b) =>
            new Date(b.savedAt).getTime() -
            new Date(a.savedAt).getTime()
        );
      }
      if (sortBy === "oldest") {
        result.sort(
          (a, b) =>
            new Date(a.savedAt).getTime() -
            new Date(b.savedAt).getTime()
        );
      }

      if (sortBy === "city") {
        result.sort((a, b) =>
          (a.city || "").localeCompare(b.city || "")
        );
      }

      return result;
    }, [trips, sortBy, showFavoritesOnly]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Saved Trips
          </h1>
          <p className="text-sm text-gray-500">
            Manage your saved travel plans
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

          {/* Favorites Toggle */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
              ${
                showFavoritesOnly
                  ? "text-white bg-blue-600 border-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:border-blue-700 dark:hover:bg-blue-800"
                  : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              }`}
          >
            ❤️ Favorites
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border bg-gray-100 dark:bg-gray-800 
                      border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="city">City</option>
          </select>

        </div>
      </div>

      {/* Empty */}
      {trips.length === 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center text-gray-500">
          <p className="text-gray-500 text-sm dark:text-gray-400">No saved trips yet 🌍</p>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.map((trip, index) => {
          // ✅ SAFE COUNTRY NAME (handles object/string)
          const countryName =
            typeof trip.country?.name === "object"
              ? trip.country?.name?.common
              : trip.country?.name || "N/A";

          return (
            <div
              key={trip.id || index}
              className="bg-white dark:bg-gray-800 
border border-gray-100 dark:border-gray-700 
shadow-md dark:shadow-lg 
hover:shadow-xl dark:hover:shadow-2xl 
rounded-2xl p-5 transition hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  📍 {trip.city || "Unknown"}
                </h2>
              <div className="flex items-center gap-2">
                {/* Favorite Button */}
                <button
                  onClick={() => handleFavorite(trip.id)}
                  className="text-xl transition transform hover:scale-110"
                >
                  {trip.isFavorite ? "❤️" : "🤍"}
                </button>

                <button
                  onClick={() => handleDelete(trip.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  ❌
                </button>
              </div>
              </div>

              {/* Country */}
              <div className="flex items-center gap-2 mt-2">
                {trip.country?.flag && (
                  <img
                    src={trip.country.flag}
                    className="w-6 h-4 rounded"
                    alt={countryName}
                  />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {countryName}
                </span>
              </div>

              {/* Weather */}
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                🌦 {trip.weather?.temp ?? "N/A"}°C
                {trip.weather?.condition
                  ? `, ${trip.weather.condition}`
                  : ""}
              </div>

              {/* Date Range */}
              {(trip.startDate || trip.endDate) && (
                <p className="text-xs text-gray-500 mt-1 space-y-1 dark:text-gray-400">
                  📅{" "}
                  {trip.startDate && trip.endDate
                    ? `${new Date(trip.startDate).toLocaleDateString()} → ${new Date(trip.endDate).toLocaleDateString()}`
                    : trip.startDate
                    ? new Date(trip.startDate).toLocaleDateString()
                    : trip.endDate
                    ? new Date(trip.endDate).toLocaleDateString()
                    : "N/A"}
                </p>
              )}
              
              {/* Trip Type */}
              {trip.onewayTrip && (
                <p className="text-xs text-gray-500 mt-1 space-y-1 dark:text-gray-400">
                  🚶‍♂️ One-way trip
                </p>
              ) || (
                <p className="text-xs text-gray-500 mt-1 space-y-1 dark:text-gray-400">
                  🔄 Round-trip
                </p>
              )}

            {/* Attractions */}
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Top Attractions:
                </p>
                <ul className="text-xs text-gray-500 mt-1 space-y-1 dark:text-gray-400">
                  {trip.attractions?.slice(0, 3).map((a: any, i: number) => (
                    <li key={a?.fsq_id || i}>
                      • {a?.name || "Unknown"}
                    </li>
                  ))}
                </ul>
              </div>

              {/* View Details */}
              <button
                onClick={() => navigate(`/trip/${trip.id}`)}
                className="mt-4 text-blue-600 text-sm hover:underline"
              >
                View Details →
              </button>
            </div>
          );
        })}
      </div>
      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
          isOpen={isModalOpen}
          title="Delete Trip"
          message="Are you sure to delete this trip?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
    </div>
  );
}