import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  AuthLayout,
  MainLayout,
} from "../layouts";

import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  ProfilePage,
} from "../pages";

import { ProtectedRoute } from "./ProtectedRoute";

export const MyRoutes = () => {
  return (
    <Routes>

      {/* AUTH ROUTES */}
      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

      </Route>

      {/* PRIVATE ROUTES */}
      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

        </Route>

      </Route>

      {/* DEFAULT */}
      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
};