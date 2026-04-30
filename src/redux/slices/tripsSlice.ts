import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Trip {
  id: string;
  city: string;
  lat: number;
  lon: number;
  weather?: {
    temp: number;
    condition: string;
    description: string;
    feels_like: number;
    humidity: number;
    wind: number;
    clouds: number;
  };
  country?: {
    name: string;
    flag: string;
    capital: string;
    region: string;
    population: number;
    currency: string;
    languages: string;
  };
  attractions: any[];
  startDate: string;
  endDate: string;
  savedAt: string;
  onewayTrip: boolean;
}

interface TripsState {
  savedTrips: Trip[];
  currentTrip: Trip | null;
  loading: boolean;
  error: string | null;
}

const initialState: TripsState = {
  savedTrips: [],
  currentTrip: null,
  loading: false,
  error: null,
};

// Load trips from localStorage
export const loadTripsFromStorage = (): Trip[] => {
  try {
    const stored = localStorage.getItem("savedTrips");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save trips to localStorage
export const saveTripsToStorage = (trips: Trip[]) => {
  localStorage.setItem("savedTrips", JSON.stringify(trips));
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    // Initialize trips from storage
    initializeTrips: (state) => {
      state.savedTrips = loadTripsFromStorage();
    },

    // Add or update a trip
    saveTrip: (state, action: PayloadAction<Trip>) => {
      const existingIndex = state.savedTrips.findIndex(
        (t) => t.lat === action.payload.lat && t.lon === action.payload.lon
      );

      if (existingIndex !== -1) {
        // Update existing trip
        state.savedTrips[existingIndex] = {
          ...state.savedTrips[existingIndex],
          ...action.payload,
        };
      } else {
        // Add new trip at the beginning
        state.savedTrips.unshift(action.payload);
      }

      saveTripsToStorage(state.savedTrips);
      state.error = null;
    },

    // Delete a trip
    deleteTrip: (state, action: PayloadAction<string>) => {
      state.savedTrips = state.savedTrips.filter((t) => t.id !== action.payload);
      saveTripsToStorage(state.savedTrips);
      state.error = null;
    },

    // Set current trip
    setCurrentTrip: (state, action: PayloadAction<Trip | null>) => {
      state.currentTrip = action.payload;
    },

    // Set loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  initializeTrips,
  saveTrip,
  deleteTrip,
  setCurrentTrip,
  setLoading,
  setError,
  clearError,
} = tripsSlice.actions;

export default tripsSlice.reducer;
