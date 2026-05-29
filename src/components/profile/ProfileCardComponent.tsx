import { useAuthStore } from "../../stores/useAuthStore";

export const ProfileCardComponent = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="profile-card">
      <h2>Profile Info</h2>
      <div className="activity-item">
        <div>
          <h4>Email</h4>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="activity-item">
        <div>
          <h4>Role</h4>
          <p>{user?.role}</p>
        </div>
      </div>
      <div className="activity-item">
        <div>
          <h4>State</h4>
          <p>{user?.state}</p>
        </div>
      </div>
      <div className="activity-item">
        <div>
          <h4>Member since</h4>
          <p>
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </div>
    </div>
  );
};
