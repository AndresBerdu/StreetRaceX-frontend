import { useAuthStore } from "../../stores/useAuthStore";

export const ProfileInfoCard = () => {
  const user = useAuthStore((state) => state.user);

  const fields = [
    { label: "Email", value: user?.email },
    { label: "Role", value: user?.role },
    { label: "State", value: user?.state },
    {
      label: "Member since",
      value: user?.created_at
        ? new Date(user.created_at).toLocaleDateString()
        : "—",
    },
  ];

  return (
    <div className="profile-card">
      <h2>Profile Info</h2>
      {fields.map((f) => (
        <div key={f.label} className="activity-item">
          <div>
            <h4>{f.label}</h4>
            <p>{f.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};