import carroCarrera from "../../assets/vehicles/carrocarrera.jpg";
import { useAuthStore } from "../../stores/useAuthStore";

import "../../styles/profile.css";

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="profile-page">
      {/* HEADER */}

      <section className="profile-header">
        <div className="profile-user">
          <img
            src="https://i.pravatar.cc/200"
            alt="Driver Avatar"
            className="profile-avatar"
          />

          <div>
            <span className="profile-rank">
              Rank <span>{user?.rank || "D"}</span> Driver
            </span>

            <h1 className="profile-name">{user?.username || "Anonymous"}</h1>

            <p className="profile-description">
              Elite street racer dominating the underground scene.
            </p>
          </div>
        </div>

        <button className="profile-button">Edit Profile</button>
      </section>

      {/* STATS */}

      <section className="profile-stats">
        <div className="profile-stat-card">
          <h3>Wins</h3>
          <h2>{user?.victories || 0}</h2>
        </div>

        <div className="profile-stat-card">
          <h3>Losses</h3>
          <h2>{user?.defeats || 0}</h2>
        </div>

        <div className="profile-stat-card">
          <h3>Reputation</h3>
          <h2>{user?.consecutive_victories || 0}</h2>
        </div>

        <div className="profile-stat-card">
          <h3>Challenges</h3>
          <h2>152</h2>
        </div>
      </section>

      {/* GRID */}

      <section className="profile-grid">
        {/* LEFT */}

        <div className="profile-left">
          {/* VEHICLE */}

          <div className="profile-card">
            <span className="vehicle-label">FAVORITE VEHICLE</span>

            <h2>Nissan Skyline GT-R R34</h2>

            <p>Tuned for maximum acceleration and elite street racing.</p>

            <img
              src={carroCarrera}
              alt="Vehicle"
              className="profile-vehicle-image"
            />

            <div className="vehicle-info-grid">
              <div>
                <strong>Power</strong>
                <span>480 HP</span>
              </div>

              <div>
                <strong>Top Speed</strong>
                <span>320 KM/H</span>
              </div>

              <div>
                <strong>Class</strong>
                <span>Sport</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="profile-right">
          {/* ACHIEVEMENTS */}

          <div className="profile-card">
            <h2>Achievements</h2>

            <div className="achievement-item">
              <span>🏆</span>

              <div>
                <h4>Street King</h4>
                <p>Win 100 races</p>
              </div>
            </div>

            <div className="achievement-item">
              <span>🔥</span>

              <div>
                <h4>Win Streak</h4>
                <p>10 consecutive victories</p>
              </div>
            </div>

            <div className="achievement-item">
              <span>⚡</span>

              <div>
                <h4>Top Speed</h4>
                <p>Reach 300 KM/H</p>
              </div>
            </div>
          </div>

          {/* ACTIVITY */}

          <div className="profile-card">
            <h2>Recent Activity</h2>

            <div className="activity-item">
              <div>
                <h4>Victory vs Ryusuke</h4>
                <p>2 hours ago</p>
              </div>

              <span>+120 REP</span>
            </div>

            <div className="activity-item">
              <div>
                <h4>New Vehicle Added</h4>
                <p>Yesterday</p>
              </div>

              <span>Garage Updated</span>
            </div>

            <div className="activity-item">
              <div>
                <h4>Rank Promotion</h4>
                <p>3 days ago</p>
              </div>

              <span>Rank B</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
