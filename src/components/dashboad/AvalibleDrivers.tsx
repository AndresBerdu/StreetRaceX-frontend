import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";
import { useDrivers } from "../../hooks/useDrivers";
import { useActiveVehicle } from "../../hooks/useActiveVehicle";
import { useAuthStore } from "../../stores/useAuthStore";
import { useState } from "react";
import defaultImage from "../../assets/perfils/defaultImage.jpg";
import type { ChallengeForm } from "../../types/challengeForm.type";
import { ChallengeModal } from "../modals/ChallengeModal";

type Driver = {
  id: string;
  slug: string;
  username: string;
  rank: string;
  victories: number;
  defeats: number;
  profile_photo?: string;
};

const INITIAL_FORM: ChallengeForm = {
  type_race: "quarter_mile",
  locality_rece: "",
  date_race: "",
  time_race: "00:00",
  notes: "",
};

export const AvailableDrivers = () => {
  const user = useAuthStore((state) => state.user);
  const { activeVehicle, loading: vehicleLoading } = useActiveVehicle();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const { drivers, meta, loading } = useDrivers(page, size, {
    rank: user?.rank ?? "",
    vehicle_type: activeVehicle?.vehicle_type ?? "",
    excludeSlug: user?.slug ?? "",
  });

  const {
    execute: sendChallenge,
    isLoading: sending,
  } = useFetch<{ ok: boolean }>({
    url: "http://localhost:8000/api/challenges",
    method: "POST",
    onSuccess: () => {
      setShowModal(false);
      setFormData(INITIAL_FORM);
    },
  });

  const { formData, setFormData,  } = useForm<ChallengeForm>(
    INITIAL_FORM,
    async () => {},
  );

  const handleChallenge = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.locality_rece || !formData.date_race) return;
    const [year, month, day] = formData.date_race.split("-");
    const formattedDate = `${day}/${month}/${year} ${formData.time_race}`;

    sendChallenge({
      challenger_slug: user?.slug,
      challenged_slug: selectedDriver?.slug,
      type_race: formData.type_race,
      locality_rece: formData.locality_rece,
      date_race: formattedDate,
      notes: formData.notes,
    });
  };

  const isLoading = vehicleLoading || loading;

  return (
    <div className="dashboard-section">
      <div className="section-header drivers-section-header">
        <div>
          <h2>Available Drivers</h2>
          {activeVehicle && (
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.82rem",
                margin: "4px 0 0",
              }}
            >
              Rank {user?.rank} · {activeVehicle.vehicle_type} vehicles
            </p>
          )}
        </div>
        <div className="drivers-controls">
          <label>Per page</label>
          <select
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {!vehicleLoading && !activeVehicle && (
        <div className="drivers-empty">
          You need an active vehicle to see available drivers.
        </div>
      )}

      {isLoading && <div className="drivers-loading">Loading drivers...</div>}

      {!isLoading && activeVehicle && (
        <>
          <div className="drivers-list">
            {drivers.length === 0 ? (
              <div className="auth-result-error">
                No drivers found with rank {user?.rank} and{" "}
                {activeVehicle.vehicle_type} vehicle.
              </div>
            ) : (
              drivers.map((driver) => (
                <div key={driver.slug} className="driver-list-item">
                  <img
                    src={driver.profile_photo || defaultImage}
                    alt={driver.username}
                  />
                  <div className="driver-list-info">
                    <h4>{driver.username}</h4>
                    <p>
                      Rank <strong>{driver.rank}</strong>
                    </p>
                  </div>
                  <div className="driver-list-stats">
                    <span className="driver-stat">
                      <span className="stat-label">W</span>
                      <span className="stat-value win">{driver.victories}</span>
                    </span>
                    <span className="driver-stat">
                      <span className="stat-label">L</span>
                      <span className="stat-value loss">{driver.defeats}</span>
                    </span>
                  </div>
                  <button
                    className="driver-challenge-btn"
                    onClick={() => handleChallenge(driver)}
                  >
                    Challenge
                  </button>
                </div>
              ))
            )}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="drivers-pagination">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Prev
              </button>
              <span className="pagination-info">
                Page {meta.page} of {meta.totalPages}
                <small>({meta.totalItems} drivers)</small>
              </span>
              <button
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {showModal && selectedDriver && (
        <ChallengeModal
          driver={selectedDriver}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          sending={sending}
        />
      )}
    </div>
  );
};
