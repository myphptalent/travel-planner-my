import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { initializeAuth } from "../redux/slices/authSlice";
import { initializeTrips } from "../redux/slices/tripsSlice";
import Layout from "../components/common/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Login from "../pages/Login";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import SavedTrips from "../pages/SavedTrips";
import TripDetails from "../pages/TripDetails";

export default function AppRoutes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize Redux state from localStorage
    dispatch(initializeAuth());
    dispatch(initializeTrips());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/saved-trips" element={<SavedTrips />} />
          <Route path="/trip/:id" element={<TripDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}