import { DashboardHeader } from "./DashboardHeader";

import { StatsCard } from "./StatsCard";

import { ActiveVehicleCard } from "./ActiveVehicleCard";

import { DriverCard } from "./DriverCard";

import { RecentChallenges } from "./RecentChallenges";

import { RankingPreview } from "./RankingPreview";

import "../../styles/dashboard.css";

export const DashboardPage = () => {
  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <DashboardHeader />

      {/* STATS */}
      <section className="dashboard-stats">

        <StatsCard
          title="Wins"
          value="28"
        />

        <StatsCard
          title="Losses"
          value="6"
        />

        <StatsCard
          title="Rank"
          value="C"
        />

        <StatsCard
          title="Reputation"
          value="1,280"
        />
      </section>

      {/* MAIN GRID */}
      <section className="dashboard-grid">

        {/* LEFT */}
        <div className="dashboard-left">

          <ActiveVehicleCard />

          {/* DRIVERS */}
          <div className="dashboard-section">

            <div className="section-header">
              <h2>Available Drivers</h2>
            </div>

            <div className="drivers-grid">

              <DriverCard
                username="Takumi"
                rank="C"
                reputation={1200}
              />

              <DriverCard
                username="Ryusuke"
                rank="B"
                reputation={1800}
              />

              <DriverCard
                username="Keisuke"
                rank="B"
                reputation={1650}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="dashboard-right">

          <RecentChallenges />

          <RankingPreview />
        </div>
      </section>
    </div>
  );
};