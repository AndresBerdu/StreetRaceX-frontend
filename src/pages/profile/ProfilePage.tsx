import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import defaultImage from "../../assets/perfils/defaultImage.jpg";
import "../../styles/profile.css";
import { EditProfileModal } from "../../components/modals/EditProfileModal";
import { AchievementsCard } from "../../components/profile/AchievementsCard";
import { ProfileInfoCard } from "../../components/profile/ProfileInfoCard";
import { ActiveVehicleCard } from "../../components/profile/ActiveVehicleCard";

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="profile-page">
      {showEditModal && (
        <EditProfileModal onClose={() => setShowEditModal(false)} />
      )}

      {/* HEADER */}
      <section className="profile-header">
        <div className="profile-user">
          <div className="profile-avatar-wrapper">
            <img
              src={user?.profile_photo ?? defaultImage}
              alt="Driver Avatar"
              className="profile-avatar"
            />
          </div>
          <div>
            <span className="profile-rank">
              Rank <span>{user?.rank || "D"}</span> Driver
            </span>
            <h1 className="profile-name">{user?.username || "Anonymous"}</h1>
            <p className="profile-description">
              📍 {user?.locality?.zone_city}, {user?.locality?.zone_state},{" "}
              {user?.locality?.zone_country}
            </p>
          </div>
        </div>
        <button className="profile-button" onClick={() => setShowEditModal(true)}>
          Edit Profile
        </button>
      </section>

      {/* STATS */}
      <section className="profile-stats">
        <div className="profile-stat-card">
          <h3>Wins</h3>
          <h2>{user?.victories ?? 0}</h2>
        </div>
        <div className="profile-stat-card">
          <h3>Losses</h3>
          <h2>{user?.defeats ?? 0}</h2>
        </div>
        <div className="profile-stat-card">
          <h3>Rank</h3>
          <h2>{user?.rank ?? "D"}</h2>
        </div>
        <div className="profile-stat-card">
          <h3>Consecutive Victories</h3>
          <h2>{user?.consecutive_victories ?? 0}</h2>
        </div>
      </section>

      {/* GRID */}
      <section className="profile-grid">
        <div className="profile-left">
          <ActiveVehicleCard />
        </div>
        <div className="profile-right">
          <AchievementsCard />
          <ProfileInfoCard />
        </div>
      </section>
    </div>
  );
};