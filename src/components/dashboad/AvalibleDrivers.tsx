import { useState } from "react";
import { useDrivers } from "../../hooks/useDrivers";
import { useActiveVehicle } from "../../hooks/useActiveVehicle";
import { useAuthStore } from "../../stores/useAuthStore";
import defaultImage from "../../assets/perfils/defaultImage.jpg";

type Driver = {
  id: string;
  slug: string;
  username: string;
  rank: string;
  victories: number;
  defeats: number;
  profile_photo?: string;
};

export const AvailableDrivers = () => {
  const user = useAuthStore((state) => state.user);
  const { activeVehicle, loading: vehicleLoading } = useActiveVehicle();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  // — Modal state —
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [form, setForm] = useState({
    type_race: "sprint",
    locality_rece: "",
    date_race: "",
    notes: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { drivers, meta, loading } = useDrivers(page, size, {
    rank: user?.rank ?? "",
    vehicle_type: activeVehicle?.vehicle_type ?? "",
    excludeSlug: user?.slug ?? "",
  });

  const isLoading = vehicleLoading || loading;

  const handleChallenge = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowModal(true);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!form.locality_rece || !form.date_race) {
      setError("Locality and date are required");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/challenges", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenger_slug: user?.slug,
          challenged_slug: selectedDriver?.slug,
          type_race: form.type_race,
          locality_rece: form.locality_rece,
          date_race: form.date_race,
          notes: form.notes,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Error sending challenge");
        return;
      }
      setShowModal(false);
      setForm({ type_race: "sprint", locality_rece: "", date_race: "", notes: "" });
    } catch {
      setError("Connection error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="dashboard-section">
      <div className="section-header drivers-section-header">
        <div>
          <h2>Available Drivers</h2>
          {activeVehicle && (
            <p style={{ color: "#9ca3af", fontSize: "0.82rem", margin: "4px 0 0" }}>
              Rank {user?.rank} · {activeVehicle.vehicle_type} vehicles
            </p>
          )}
        </div>
        <div className="drivers-controls">
          <label>Per page</label>
          <select
            value={size}
            onChange={(e) => { setSize(Number(e.target.value)); setPage(1); }}
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
              <div className="drivers-empty">
                No drivers found with rank {user?.rank} and {activeVehicle.vehicle_type} vehicle.
              </div>
            ) : (
              drivers.map((driver) => (
                <div key={driver.slug} className="driver-list-item">
                  <img src={driver.profile_photo || defaultImage} alt={driver.username} />
                  <div className="driver-list-info">
                    <h4>{driver.username}</h4>
                    <p>Rank <strong>{driver.rank}</strong></p>
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
                    onClick={() => handleChallenge(driver)}  // ← conectado
                  >
                    Challenge
                  </button>
                </div>
              ))
            )}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="drivers-pagination">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
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

      {/* MODAL */}
      {showModal && selectedDriver && (
        <div className="av-overlay">
          <div className="av-modal">
            <h3>Challenge <span style={{ color: "#f59e0b" }}>{selectedDriver.username}</span></h3>

            <div className="av-field">
              <label>Race type</label>
              <select
                value={form.type_race}
                onChange={(e) => setForm({ ...form, type_race: e.target.value })}
              >
                <option value="sprint">Sprint</option>
                <option value="drift">Drift</option>
                <option value="circuit">Circuit</option>
              </select>
            </div>

            <div className="av-field">
              <label>Locality</label>
              <input
                placeholder="Ex: Medellín, Laureles"
                value={form.locality_rece}
                onChange={(e) => setForm({ ...form, locality_rece: e.target.value })}
              />
            </div>

            <div className="av-field">
              <label>Date (DD/MM/YYYY)</label>
              <input
                placeholder="27/05/2026"
                value={form.date_race}
                onChange={(e) => setForm({ ...form, date_race: e.target.value })}
              />
            </div>

            <div className="av-field">
              <label>Notes</label>
              <textarea
                placeholder="Any details about the race..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            {error && <p style={{ color: "#ef4444", fontSize: "0.85rem" }}>{error}</p>}

            <div className="av-modal-actions">
              <button
                className="av-btn-cancel"
                onClick={() => setShowModal(false)}
                disabled={sending}
              >
                Cancel
              </button>
              <button
                className="av-btn-confirm"
                onClick={handleSubmit}
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Challenge ⚔️"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};