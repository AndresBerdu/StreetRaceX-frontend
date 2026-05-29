type Achievement = {
  icon: string;
  title: string;
  description: string;
};

// Más adelante podrías recibirlos como prop desde el user
const ACHIEVEMENTS: Achievement[] = [
  { icon: "🏆", title: "Street King", description: "Win 100 races" },
  { icon: "🔥", title: "Win Streak", description: "10 consecutive victories" },
];

export const AchievementsCard = () => {
  return (
    <div className="profile-card">
      <h2>Achievements</h2>
      {ACHIEVEMENTS.map((a) => (
        <div key={a.title} className="achievement-item">
          <span>{a.icon}</span>
          <div>
            <h4>{a.title}</h4>
            <p>{a.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};