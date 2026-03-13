import { Outlet } from "react-router-dom";
import { FooterComponent, NavbarComponent } from "../components";

export const MainLayout = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
};
