import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  initializing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  initializing: true,
  error: null,
};

// Load user from localStorage on app initialization
export const loadUserFromStorage = (): User | null => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Save user to localStorage
export const saveUserToStorage = (user: User | null) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Initialize auth state from storage
    initializeAuth: (state) => {
      const user = loadUserFromStorage();
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      }
      state.initializing = false;
    },

    // Login user
    loginUser: (state, _action: PayloadAction<Omit<User, "avatar">>) => {
      state.loading = true;
      state.error = null;
    },

    // Login success
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      saveUserToStorage(action.payload);
    },

    // Login failure
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },

    // Logout user
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      saveUserToStorage(null);
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  initializeAuth,
  loginUser,
  loginSuccess,
  loginFailure,
  logoutUser,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
