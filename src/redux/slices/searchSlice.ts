import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  city: string | null;
  lat: number | null;
  lon: number | null;
  countryCode: string | null;
  weather: any | null;
  country: any | null;
  attractions: any[];
  loadingWeather: boolean;
  loadingCountry: boolean;
  loadingAttractions: boolean;
  error: string | null;
}

const initialState: SearchState = {
  city: null,
  lat: null,
  lon: null,
  countryCode: null,
  weather: null,
  country: null,
  attractions: [],
  loadingWeather: false,
  loadingCountry: false,
  loadingAttractions: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Set search parameters
    setSearchParams: (
      state,
      action: PayloadAction<{
        city: string;
        lat: number;
        lon: number;
        countryCode: string;
      }>
    ) => {
      state.city = action.payload.city;
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
      state.countryCode = action.payload.countryCode;
    },

    // Reset search
    resetSearch: (state) => {
      state.city = null;
      state.lat = null;
      state.lon = null;
      state.countryCode = null;
      state.weather = null;
      state.country = null;
      state.attractions = [];
      state.error = null;
    },

    // Set weather loading
    setWeatherLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingWeather = action.payload;
    },

    // Set weather data
    setWeather: (state, action: PayloadAction<any>) => {
      state.weather = action.payload;
      state.loadingWeather = false;
      state.error = null;
    },

    // Set weather error
    setWeatherError: (state, action: PayloadAction<string>) => {
      state.loadingWeather = false;
      state.error = action.payload;
    },

    // Set country loading
    setCountryLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingCountry = action.payload;
    },

    // Set country data
    setCountry: (state, action: PayloadAction<any>) => {
      state.country = action.payload;
      state.loadingCountry = false;
      state.error = null;
    },

    // Set country error
    setCountryError: (state, action: PayloadAction<string>) => {
      state.loadingCountry = false;
      state.error = action.payload;
    },

    // Set attractions loading
    setAttractionsLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingAttractions = action.payload;
    },

    // Set attractions data
    setAttractions: (state, action: PayloadAction<any[]>) => {
      state.attractions = action.payload;
      state.loadingAttractions = false;
      state.error = null;
    },

    // Set attractions error
    setAttractionsError: (state, action: PayloadAction<string>) => {
      state.loadingAttractions = false;
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setSearchParams,
  resetSearch,
  setWeatherLoading,
  setWeather,
  setWeatherError,
  setCountryLoading,
  setCountry,
  setCountryError,
  setAttractionsLoading,
  setAttractions,
  setAttractionsError,
  clearError,
} = searchSlice.actions;

export default searchSlice.reducer;
