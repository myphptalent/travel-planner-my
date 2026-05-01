import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setSearchParams,
  resetSearch,
  setWeatherLoading,
  setWeather,
  setCountryLoading,
  setCountry,
  setAttractionsLoading,
  setAttractions,
} from "../redux/slices/searchSlice";
import { saveTrip } from "../redux/slices/tripsSlice";
import { showToast, closeModal, openModal } from "../redux/slices/uiSlice";
import { getWeather } from "../api/weatherApi";
import { getCountry } from "../api/countryApi";
import { getAttractions } from "../api/foursquareApi";
import SearchInput from "../components/search/SearchInput";
import WeatherCard from "../components/common/WeatherCard";
import CountryCard from "../components/common/CountryCard";
import AttractionsList from "../components/common/AttractionsList";
import Modal from "../components/common/Modal";
import { useState } from "react";

export default function SearchResults() {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(search);

  const city = params.get("city");
  const lat = Number(params.get("lat"));
  const lon = Number(params.get("lon"));
  const countryCode = params.get("country");

  // Redux selectors
  const searchState = useAppSelector((state) => state.search);
  const modal = useAppSelector((state) => state.ui.modal);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [oneway, setOneway] = useState(false);
  const endDateRef = useRef<HTMLInputElement>(null);

  // RESET
  useEffect(() => {
    if (!city) {
      dispatch(resetSearch());
    } else {
      dispatch(
        setSearchParams({
          city,
          lat,
          lon,
          countryCode: countryCode || "",
        })
      );
    }
  }, [city, lat, lon, countryCode, dispatch]);

  // WEATHER
  useEffect(() => {
    if (!lat || !lon) return;
    dispatch(setWeatherLoading(true));
    getWeather(lat, lon)
      .then((data) => {
        dispatch(setWeather(data));
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        dispatch(showToast({ message: "Failed to fetch weather", type: "error" }));
      });
  }, [lat, lon, dispatch]);

  // COUNTRY
  useEffect(() => {
    if (!countryCode) return;
    dispatch(setCountryLoading(true));
    getCountry(countryCode)
      .then((data) => {
        dispatch(setCountry(data));
      })
      .catch((error) => {
        console.error("Error fetching country:", error);
        dispatch(showToast({ message: "Failed to fetch country info", type: "error" }));
      });
  }, [countryCode, dispatch]);

  // ATTRACTIONS
  useEffect(() => {
    if (!lat || !lon) return;
    dispatch(setAttractionsLoading(true));
    getAttractions(lat, lon)
      .then((data) => {
        dispatch(setAttractions(data));
      })
      .catch((error) => {
        console.error("Error fetching attractions:", error);
        dispatch(showToast({ message: "Failed to fetch attractions", type: "error" }));
      });
  }, [lat, lon, dispatch]);

  const handleScheduleTrip = () => {
    if (oneway) {
      if (!startDate || !city) {
        dispatch(showToast({ message: "Please select a start date and city", type: "error" }));
        return;
      }
    } else {
      if (!startDate || !endDate || !city) {
        dispatch(showToast({ message: "Please select dates and city", type: "error" }));
        return;
      }
    }

    const trip = {
      id: Date.now().toString(),
      city,
      lat,
      lon,
      weather: {
        temp: searchState.weather?.main?.temp,
        condition: searchState.weather?.weather?.[0]?.main,
        description: searchState.weather?.weather?.[0]?.description,
        feels_like: searchState.weather?.main?.feels_like,
        humidity: searchState.weather?.main?.humidity,
        wind: searchState.weather?.wind?.speed,
        clouds: searchState.weather?.clouds?.all,
      },
      country: {
        name: searchState.country?.name?.common,
        flag: searchState.country?.flags?.png,
        capital: searchState.country?.capital?.[0],
        region: searchState.country?.region,
        population: searchState.country?.population,
        currency: (
          Object.values(searchState.country?.currencies || {})?.[0] as any
        )?.name,
        languages: Object.values(searchState.country?.languages || {})?.join(
          ", "
        ),
      },
      attractions: searchState.attractions.slice(0, 8),
      startDate,
      endDate,
      savedAt: new Date().toISOString(),
      onewayTrip: oneway,
      isFavorite: false,
    };

    // Dispatch save trip action
    dispatch(saveTrip(trip));
    dispatch(
      showToast({
        message: "Trip scheduled 🎉",
        type: "success",
      })
    );
    dispatch(closeModal());
    setStartDate("");
    setEndDate("");
  };
  const handleOnewayTrip = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOneway(e.target.checked);
    if(e.target.checked) {
      setEndDate("");
      endDateRef.current?.setAttribute("disabled", "true");
    } else {
      endDateRef.current?.removeAttribute("disabled");
    }
  };

  return (
    <div className="space-y-8 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Search Trips
          </h1>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Search and explore travel destinations
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 
dark:bg-none dark:bg-gray-800 
p-4 rounded-2xl">
        <SearchInput />
      </div>

      {/* ✅ FIXED CONDITION */}
      {city ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {city}
              </h1>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                Explore weather & attractions
              </p>
            </div>

            {searchState.weather &&
              searchState.country &&
              searchState.attractions.length > 0 && (
                <button
                  onClick={() => dispatch(openModal("schedule"))}
                  className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition"
                >
                  📅 Schedule Trip
                </button>
              )}
          </div>

          {/* Weather and Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherCard weather={searchState.weather} />
            <CountryCard country={searchState.country} />
          </div>

          {/* Attractions */}
          <AttractionsList attractions={searchState.attractions} />
        </>
      ) : (
        <div className="text-center text-gray-400">
          Search for a destination
        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={modal.isOpen && modal.type === "schedule"}
        onClose={() => dispatch(closeModal())}
        title="Schedule Trip"
      >
        <div>
          <p className="text-gray-500 text-sm mb-4 dark:text-gray-400">
            {city}
          </p>
          <span><input type="checkbox" id="oneway" className="mb-4" checked={oneway} onChange={handleOnewayTrip} /> One-way trip </span>
          <input
            type="date"
            className="w-full border p-2 mb-3 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            ref={endDateRef}
            className="w-full border p-2 mb-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => dispatch(closeModal())}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Maybe Later
            </button>

            <button
              onClick={handleScheduleTrip}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Confirm Trip
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}