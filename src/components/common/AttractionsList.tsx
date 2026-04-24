export default function AttractionsList({ attractions }: any) {
  if (!attractions || attractions.length === 0) {
    return <p className="text-gray-400">Loading attractions...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        🗺 Nearby Attractions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {attractions.map((place: any) => (
          <div
            key={place.fsq_id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow hover:shadow-xl transition hover:-translate-y-1"
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {place.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {place.location.address || "No address"}
            </p>

            <p className="text-xs text-blue-500 mt-2">
              {place.categories?.[0]?.name || "General"}
            </p>

            {place.distance && (
              <p className="text-xs text-gray-400 mt-1">
                📍 {(place.distance / 1000).toFixed(1)} km away
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}