import { Route, Routes } from "react-router-dom";
import { AuthLayout, MainLayout } from "../layouts";
import { LoginPage, ProfilePage, RegisterPage } from "../pages";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/perfil" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};
