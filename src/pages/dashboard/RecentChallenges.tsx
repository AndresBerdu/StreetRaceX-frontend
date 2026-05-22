export const RecentChallenges = () => {
  return (
    <div className="dashboard-section">

      <div className="section-header">
        <h2>
          Recent Challenges
        </h2>
      </div>

      <div className="challenge-item">

        <div>
          <h4>vs Ryusuke</h4>
          <p>Victory</p>
        </div>

        <span>+120 REP</span>
      </div>

      <div className="challenge-item">

        <div>
          <h4>vs Keisuke</h4>
          <p>Defeat</p>
        </div>

        <span>-40 REP</span>
      </div>
    </div>
  );
};