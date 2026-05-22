interface Props {
  username: string;
  rank: string;
  reputation: number;
}

export const DriverCard = ({
  username,
  rank,
  reputation,
}: Props) => {
  return (
    <div className="driver-card">

      <div className="driver-top">

        <img
          src="https://i.pravatar.cc/100"
          alt={username}
        />

        <div>
          <h3>{username}</h3>

          <p>Street Racer</p>
        </div>
      </div>

      <div className="driver-stats">

        <span>
          Rank {rank}
        </span>

        <span>
          {reputation} REP
        </span>
      </div>

      <button className="driver-button">
        Challenge
      </button>
    </div>
  );
};