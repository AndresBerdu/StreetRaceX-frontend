// hooks/useActiveVehicle.ts
import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

type Vehicle = {
  slug: string;
  vehicle_type: string;
  active: boolean;
};

export const useActiveVehicle = () => {
  const user = useAuthStore((state) => state.user);
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.slug) return;

    const fetch_ = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/users/${user.slug}/vehicles`,
          { credentials: "include" }
        );
        const json = await res.json();
        const vehicles: Vehicle[] = json.data ?? [];
        setActiveVehicle(vehicles.find((v) => v.active) ?? null);
      } catch (err) {
        console.error("useActiveVehicle error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, [user?.slug]);

  return { activeVehicle, loading };
};