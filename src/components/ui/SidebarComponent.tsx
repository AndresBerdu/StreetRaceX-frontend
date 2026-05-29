import {
  FaBell,
  FaCarSide,
  FaFlagCheckered,
  FaGavel,
  FaHome,
  FaTrophy,
  FaUser,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

export const SidebarComponent = () => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>
          StreetRace<span>X</span>
        </h1>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/profile" className="sidebar-link">
          <FaUser />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/vehicles" className="sidebar-link">
          <FaCarSide />
          <span>Vehicles</span>
        </NavLink>
        <NavLink to="/challenges" className="sidebar-link">
          <FaFlagCheckered />
          <span>Challenges</span>
        </NavLink>
        <NavLink to="/ranking" className="sidebar-link">
          <FaTrophy />
          <span>Ranking</span>
        </NavLink>
        <NavLink to="/notifications" className="sidebar-link">
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        {isAdmin && (
          <NavLink to="/admin/disputes" className="sidebar-link">
            <FaGavel />
            <span>Disputes</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
};
