import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAppSelector } from "../redux/hooks";
import WeatherCard from "../components/common/WeatherCard";
import CountryCard from "../components/common/CountryCard";
import AttractionsList from "../components/common/AttractionsList";

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const savedTrips = useAppSelector((state) => state.trips.savedTrips);

  // Find the trip from Redux state
  const trip = useMemo(() => {
    return savedTrips.find((t: any) => t.id === id);
  }, [savedTrips, id]);

  if (!trip) {
    return (
      <div className="text-center text-gray-500">
        Trip not found ❌
      </div>
    );
  }

  // ✅ Adapt stored data → component format
  const adaptedWeather = trip.weather
    ? {
        main: {
          temp: trip.weather.temp,
          humidity: trip.weather.humidity || 0,
          feels_like: trip.weather.temp,
        },
        weather: [{ main: trip.weather.condition }],
        wind: { speed: trip.weather.wind || 0 },
        clouds: { all: trip.weather.clouds || 0 },
      }
    : null;

  const adaptedCountry = trip.country
    ? {
        name: { common: trip.country.name },
        flags: { png: trip.country.flag },
        region: trip.country.region || "",
        capital: trip.country.capital
          ? [trip.country.capital]
          : [],
        population: trip.country.population || 0,
        currencies: trip.country.currency
          ? {
              CUR: {
                name: trip.country.currency,
                symbol: "",
              },
            }
          : {},
        languages: trip.country.languages
          ? { lang: trip.country.languages }
          : {},
      }
    : null;

  const adaptedAttractions = trip.attractions?.map((a: any) => ({
    fsq_id: a.fsq_id || a.name,
    name: a.name,
    location: {
      address: a.address || a.location?.address,
    },
    categories: [{ name: a.category || "Place" }],
    distance: a.distance || 0,
  }));

  return (
    <div className="space-y-6">
      
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 text-sm hover:underline"
      >
        ← Back
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          {trip.city}
        </h1>
        <p className="text-gray-500 text-sm dark:text-gray-400">
          Trip details overview
        </p>
      </div>

      {/* ✅ Reusable Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherCard weather={adaptedWeather} />
        <CountryCard country={adaptedCountry} />
      </div>

      <AttractionsList attractions={adaptedAttractions} />

      {/* Footer */}
      <p className="text-xs text-gray-400">
        Saved on:{" "}
        {trip.savedAt
          ? new Date(trip.savedAt).toLocaleString()
          : "N/A"}
      </p>
    </div>
  );
}