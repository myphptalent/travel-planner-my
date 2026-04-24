export default function WeatherCard({ weather }: any) {
  if (!weather) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <p className="text-gray-400">Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">🌦 Weather</h2>

      <p className="text-4xl font-bold text-blue-600">
        {weather.main.temp}°C
      </p>

      <p className="text-gray-500">
        {weather.weather[0].main}
      </p>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300 mt-3">
        <p>💨 Wind: {weather.wind.speed} m/s</p>
        <p>💧 Humidity: {weather.main.humidity}%</p>
        <p>🌡 Feels: {weather.main.feels_like}°C</p>
        <p>☁ Clouds: {weather.clouds?.all || 0}%</p>
      </div>
    </div>
  );
}