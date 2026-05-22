import { FaBell } from "react-icons/fa";

export const TopbarComponent = () => {
  return (
    <header className="topbar">

      {/* LEFT */}
      <div>
        <h2 className="topbar-title">
          Welcome back, Driver
        </h2>

        <p className="topbar-subtitle">
          Ready for your next challenge?
        </p>
      </div>

      {/* RIGHT */}
      <div className="topbar-actions">

        {/* RANK */}
        <div className="rank-badge">
          Rank C
        </div>

        {/* NOTIFICATIONS */}
        <button className="notification-button">
          <FaBell />

          <span className="notification-dot"></span>
        </button>

        {/* USER */}
        <div className="topbar-user">
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
          />

          <div>
            <h4>Takumi</h4>
            <p>Street Racer</p>
          </div>
        </div>
      </div>
    </header>
  );
};