import { Outlet } from "react-router-dom";

import { SidebarComponent } from "../components/ui/SidebarComponent";
import { TopbarComponent } from "../components/ui/Topbar";

import "../styles/main-layout.css";

export const MainLayout = () => {
  return (
    <div className="main-layout">

      {/* SIDEBAR */}
      <SidebarComponent />

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* TOPBAR */}
        <TopbarComponent />

        {/* PAGE CONTENT */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};