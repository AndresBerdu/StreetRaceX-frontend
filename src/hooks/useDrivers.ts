// hooks/useDrivers.ts
import { useState, useEffect } from "react";

type Driver = {
  id: string;
  slug: string;
  username: string;
  rank: string;
  victories: number;
  defeats: number;
  profile_photo?: string;
};

type Meta = {
  page: number;
  totalPages: number;
  totalItems: number;
};

type DriversFilters = {
  rank: string;
  vehicle_type: string;
  excludeSlug: string;
};

export const useDrivers = (page: number, size: number, filters: DriversFilters) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!filters.rank || !filters.vehicle_type || !filters.excludeSlug) return;

    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          size: String(size),
          rank: filters.rank,
          vehicle_type: filters.vehicle_type,
          excludeSlug: filters.excludeSlug,
        });

        const res = await fetch(
          `http://localhost:8000/api/users?${params}`,
          { credentials: "include" }
        );

        if (!res.ok) return;

        const json = await res.json();
        setDrivers(json.data ?? []);
        setMeta(json.meta ?? null);
      } catch (err) {
        console.error("useDrivers error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [page, size, filters.rank, filters.vehicle_type]);

  return { drivers, meta, loading };
};