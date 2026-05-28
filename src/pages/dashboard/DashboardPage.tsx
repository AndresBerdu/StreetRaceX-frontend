// DashboardPage.tsx
import { DashboardHeader } from "./DashboardHeader";
import { StatsCard } from "./StatsCard";
import { ActiveVehicleCard } from "./ActiveVehicleCard";
import "../../styles/dashboard.css";
import { useAuthStore } from "../../stores/useAuthStore";
import { AvailableDrivers } from "../../components/dashboad/AvalibleDrivers";

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="dashboard-page">
      <DashboardHeader />

      <section className="dashboard-stats">
        <StatsCard title="Wins" value={`${user?.victories || 0}`} />
        <StatsCard title="Losses" value={`${user?.defeats || 0}`} />
        <StatsCard title="Rank" value={`${user?.rank || "D"}`} />
        <StatsCard
          title="Consecutive Wins"
          value={`${user?.consecutive_victories || 0}`}
        />
      </section>

      <section className="dashboard-grid dashboard-grid--single">
        <ActiveVehicleCard />
        <AvailableDrivers />
      </section>
    </div>
  );
};
