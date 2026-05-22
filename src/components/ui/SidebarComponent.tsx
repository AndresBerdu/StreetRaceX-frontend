import {
  FaCarSide,
  FaFlagCheckered,
  FaHome,
  FaTrophy,
  FaUser,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

export const SidebarComponent = () => {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <h1>
          StreetRace<span>X</span>
        </h1>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >
          <FaHome />

          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/profile"
          className="sidebar-link"
        >
          <FaUser />

          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/vehicles"
          className="sidebar-link"
        >
          <FaCarSide />

          <span>Vehicles</span>
        </NavLink>

        <NavLink
          to="/challenges"
          className="sidebar-link"
        >
          <FaFlagCheckered />

          <span>Challenges</span>
        </NavLink>

        <NavLink
          to="/ranking"
          className="sidebar-link"
        >
          <FaTrophy />

          <span>Ranking</span>
        </NavLink>
      </nav>
    </aside>
  );
};