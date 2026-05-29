import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout, MainLayout } from "../layouts";
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  ProfilePage,
  VehiclesPage,
  ChallengesPage,
} from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";
import { RankingPage } from "../pages/RankingPages";
import { AdminChallengesPage } from "../pages/AdminChallengePage";
import { NotificationsPage } from "../pages/NotificationPage";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          {/* admin */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin/disputes" element={<AdminChallengesPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
