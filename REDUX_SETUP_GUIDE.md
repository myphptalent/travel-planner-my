# Redux State Management Integration - Travel Planner App

## 📊 Overview

This document describes the Redux state management setup for the Travel Planner application. The app uses **Redux Toolkit** for centralized state management with production-ready code.

---

## 🏗️ Project Structure

```
src/
├── redux/
│   ├── store.ts                 # Redux store configuration
│   ├── slices/
│   │   ├── authSlice.ts        # Authentication state (user login/logout)
│   │   ├── tripsSlice.ts       # Trips data state management
│   │   ├── searchSlice.ts      # Search results & API data state
│   │   └── uiSlice.ts          # UI state (modals, toasts, theme)
│   └── hooks/
│       ├── useAppDispatch.ts   # Typed dispatch hook
│       ├── useAppSelector.ts   # Typed selector hook
│       └── index.ts            # Barrel export
├── pages/
│   ├── Login.tsx               # Uses Redux for auth
│   ├── Home.tsx                # Uses Redux for trips & stats
│   ├── SearchResults.tsx       # Uses Redux for search data
│   ├── SavedTrips.tsx          # Uses Redux for trip management
│   └── TripDetails.tsx         # Uses Redux for trip details
├── components/
│   ├── common/
│   │   ├── Header.tsx          # Uses Redux for user & logout
│   │   └── ProtectedRoute.tsx  # Uses Redux for auth check
│   └── ...
└── main.tsx                    # Provider wrapper setup
```

---

## 🔑 Redux Slices & State Structure

### 1. **Auth Slice** (`authSlice.ts`)
Manages user authentication and session state.

**State Structure:**
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

**Key Actions:**
- `initializeAuth()` - Load user from localStorage on app startup
- `loginSuccess(user)` - Save user and set authenticated flag
- `logoutUser()` - Clear user and authentication state
- `clearError()` - Clear error messages

**Persistence:** User is stored in localStorage via `saveUserToStorage()`

---

### 2. **Trips Slice** (`tripsSlice.ts`)
Manages saved trips and trip-related operations.

**State Structure:**
```typescript
interface TripsState {
  savedTrips: Trip[];
  currentTrip: Trip | null;
  loading: boolean;
  error: string | null;
}
```

**Key Actions:**
- `initializeTrips()` - Load trips from localStorage on app startup
- `saveTrip(trip)` - Add or update a trip
- `deleteTrip(tripId)` - Remove a trip
- `setCurrentTrip(trip)` - Set the currently viewed trip

**Persistence:** Trips are stored in localStorage via `saveTripsToStorage()`

---

### 3. **Search Slice** (`searchSlice.ts`)
Manages search parameters and API response data.

**State Structure:**
```typescript
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
```

**Key Actions:**
- `setSearchParams({city, lat, lon, countryCode})` - Set search parameters
- `resetSearch()` - Clear search state
- `setWeather(data)` - Store weather API response
- `setCountry(data)` - Store country API response
- `setAttractions(data)` - Store attractions API response
- Loading indicators for each API call

---

### 4. **UI Slice** (`uiSlice.ts`)
Manages UI-related state.

**State Structure:**
```typescript
interface UIState {
  modal: { isOpen: boolean; type: "schedule" | "view" | null };
  toast: { message: string; type: "success" | "error" | "info"; isVisible: boolean };
  theme: "light" | "dark";
  sidebarOpen: boolean;
}
```

**Key Actions:**
- `openModal(type)` - Open modal
- `closeModal()` - Close modal
- `showToast(message, type)` - Display toast notification
- `hideToast()` - Hide toast
- `setTheme(theme)` - Set theme and save to localStorage
- `toggleSidebar()` / `setSidebarOpen(boolean)` - Sidebar state

**Persistence:** Theme is stored in localStorage

---

## 🎯 Usage Examples

### Using Redux in Components

#### Reading State with `useAppSelector`
```typescript
import { useAppSelector } from '../redux/hooks';

export function MyComponent() {
  // Select specific state slices
  const user = useAppSelector((state) => state.auth.user);
  const trips = useAppSelector((state) => state.trips.savedTrips);
  const weather = useAppSelector((state) => state.search.weather);
  const isModalOpen = useAppSelector((state) => state.ui.modal.isOpen);
  
  return <div>{user?.name}</div>;
}
```

#### Dispatching Actions with `useAppDispatch`
```typescript
import { useAppDispatch } from '../redux/hooks';
import { loginSuccess } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';

export function LoginForm() {
  const dispatch = useAppDispatch();
  
  const handleLogin = (email: string, password: string) => {
    const user = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      avatar: `https://...`,
    };
    
    dispatch(loginSuccess(user));
    dispatch(showToast({ message: 'Welcome!', type: 'success' }));
  };
  
  return <button onClick={handleLogin}>Login</button>;
}
```

---

## 🔄 Data Flow Architecture

### Authentication Flow
```
1. User logs in (Login.tsx)
   ↓
2. Form validates credentials
   ↓
3. Dispatch loginSuccess(user) action
   ↓
4. authSlice saves user to localStorage
   ↓
5. App redirects to home
   ↓
6. Protected routes check state.auth.isAuthenticated
```

### Trip Management Flow
```
1. User schedules trip (SearchResults.tsx)
   ↓
2. Create trip object with all data
   ↓
3. Dispatch saveTrip(trip) action
   ↓
4. tripsSlice saves to localStorage
   ↓
5. Home.tsx re-renders with new trip
   ↓
6. SavedTrips.tsx displays all trips
```

### Search Flow
```
1. User searches city (SearchInput.tsx)
   ↓
2. Navigate to /search?city=...&lat=...&lon=...
   ↓
3. SearchResults.tsx detects URL params
   ↓
4. Dispatch setSearchParams() action
   ↓
5. Dispatch setWeatherLoading(true)
   ↓
6. Fetch from API → Dispatch setWeather(data)
   ↓
7. UI renders with data from state
```

---

## 📦 Store Configuration

The store is configured in `src/redux/store.ts`:

```typescript
export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
    search: searchReducer,
    ui: uiReducer,
  },
});
```

**Redux DevTools**: Automatically integrated with Redux Toolkit.

---

## 🎨 Provider Setup

In `src/main.tsx`, the app is wrapped with Redux Provider:

```typescript
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
```

In `src/routes/AppRoutes.tsx`, initial state is loaded on app mount:

```typescript
useEffect(() => {
  dispatch(initializeAuth());
  dispatch(initializeTrips());
}, [dispatch]);
```

---

## 💾 Persistence Strategy

Redux state is persisted via **localStorage** at strategic points:

| Slice | Key | Persistence |
|-------|-----|-------------|
| Auth | `user` | On login/logout |
| Trips | `savedTrips` | On add/update/delete |
| UI | `theme` | On theme change |

**Note:** Search state is NOT persisted (cleared on page reload by design).

---

## 🔒 TypeScript Types

All reducers and hooks are fully typed:

```typescript
// Import types
import type { RootState } from './redux/store';
import type { AppDispatch } from './redux/store';

// Use typed selectors
const state: RootState = store.getState();

// Use typed dispatch
const dispatch: AppDispatch = useAppDispatch();
```

---

## 🚀 Production Best Practices Implemented

✅ **ReduxJS Toolkit** - Latest Redux tooling
✅ **Immer Integration** - Immutable updates handled automatically
✅ **Normalized State** - Flat structure for trips and search
✅ **Typed Hooks** - Full TypeScript support
✅ **Modular Slices** - Each domain in separate file
✅ **Action Creators** - Automatically generated
✅ **Thunk Support** - Ready for async operations
✅ **DevTools Integration** - Time-travel debugging

---

## 🔧 Environment Variables

No environment variables required for Redux. All configuration is in code.

---

## 📝 Migration from Old Code

### Before (Direct localStorage):
```typescript
localStorage.setItem('savedTrips', JSON.stringify(trips));
const user = JSON.parse(localStorage.getItem('user') || '{}');
```

### After (Redux):
```typescript
dispatch(saveTrip(trip));
const user = useAppSelector((state) => state.auth.user);
```

---

## 🐛 Debugging

### Using Redux DevTools Browser Extension

1. Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension)
2. Open DevTools in Chrome/Firefox
3. Go to Redux tab
4. Time-travel through actions
5. Inspect state changes
6. Dispatch actions manually for testing

### Console Logging

Add middleware to log all actions:

```typescript
// In store.ts
import logger from 'redux-logger'; // Optional

const store = configureStore({
  reducer: { /* ... */ },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});
```

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `redux/store.ts` | Store configuration |
| `redux/slices/authSlice.ts` | Authentication logic |
| `redux/slices/tripsSlice.ts` | Trips management |
| `redux/slices/searchSlice.ts` | Search & API data |
| `redux/slices/uiSlice.ts` | UI state management |
| `redux/hooks/index.ts` | Typed hooks export |
| `routes/AppRoutes.tsx` | State initialization |
| `main.tsx` | Provider setup |

---

## 🔄 Future Enhancements

- Add Redux Thunk middleware for async API calls
- Implement Redux Persist for complete state persistence
- Add Redux middleware for analytics tracking
- Create selectors file for complex state computations
- Implement Redux Saga for complex async workflows

---

## ✅ Testing the Redux Setup

### Quick Verification Steps

1. **Login** - Verify user state is saved
2. **Add Trip** - Verify trip appears in SavedTrips
3. **Reload Page** - Verify state is restored from localStorage
4. **Navigation** - Verify ProtectedRoute works
5. **Search** - Verify search state flows correctly
6. **Logout** - Verify all state is cleared

---

## 📞 Support & Documentation

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Redux Docs](https://redux.js.org/)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)

---

**Status**: ✅ Production Ready
**Last Updated**: 2026-04-24
**Version**: 1.0.0
