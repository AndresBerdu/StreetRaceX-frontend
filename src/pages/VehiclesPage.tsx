import "../styles/vehicle.css";
import { useAuthStore } from "../stores/useAuthStore";
import { useFetch } from "../hooks/useFetch";
import type { Vehicle } from "../types/vehicle.type";
import { useState } from "react";
import { AddVehicleComponent } from "../components/modals/AddVehicleComponent";

export const VehiclesPage = () => {
  const user = useAuthStore((state) => state.user);

  const [showAdd, setShowAdd] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // GET vehicles
  const { data, execute: refetch } = useFetch<{ ok: boolean; data: Vehicle[] }>(
    {
      url: `http://localhost:8000/api/users/${user?.slug}/vehicles`,
      method: "GET",
      onUnauthorized: () => {
        window.location.href = "/login";
      },
    },
  );

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(
        `http://localhost:8000/api/users/${user?.slug}/vehicles/${deleteTarget.slug}`,
        { method: "DELETE", credentials: "include" },
      );

      if (res.ok) {
        setDeleteTarget(null);
        refetch(undefined);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);

  const handleSetActive = async (vehicle: Vehicle) => {
    if (vehicle.active || togglingSlug) return;
    setTogglingSlug(vehicle.slug);
    try {
      const res = await fetch(
        `http://localhost:8000/api/users/${user?.slug}/vehicles/${vehicle.slug}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: true }),
        },
      );
      if (res.ok) refetch(undefined);
    } finally {
      setTogglingSlug(null);
    }
  };
  return (
    <div className="vehicles-page">
      {/* HEADER */}
      <div className="vehicles-header">
        <div>
          <h1>My Garage</h1>
          <p>Manage your street racing vehicles.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="vehicle-add-button">
          Add Vehicle
        </button>
      </div>

      {/* VEHICLES GRID */}
      <section className="vehicles-grid">
        {data?.data.length === 0 ? (
          <h3>No vehicles found.</h3>
        ) : (
          data?.data.map((vehicle) => (
            <div key={vehicle.slug} className="vehicle-card">
              {/* DELETE BUTTON */}
              <button
                className="vehicle-delete-btn"
                onClick={() => setDeleteTarget(vehicle)}
                title="Delete vehicle"
              >
                ✕
              </button>

              <img
                src={vehicle.photo ?? ""}
                alt={vehicle.model}
                className="vehicle-card-image"
              />

              <div className="vehicle-card-content">
                <div className="vehicle-card-badges">
                  <span className="vehicle-type">{vehicle.vehicle_type}</span>
                  <button
                    className={`vehicle-active-badge ${vehicle.active ? "active" : "inactive"}`}
                    onClick={() => handleSetActive(vehicle)}
                    disabled={vehicle.active || togglingSlug === vehicle.slug}
                    title={
                      vehicle.active ? "Currently active" : "Set as active"
                    }
                  >
                    {togglingSlug === vehicle.slug
                      ? "..."
                      : vehicle.active
                        ? "● Active"
                        : "○ Set active"}
                  </button>
                </div>

                <h2>
                  {vehicle.brand} {vehicle.model}
                </h2>

                <div className="vehicle-card-info">
                  <div>
                    <strong>Year</strong>
                    <span>{vehicle.year}</span>
                  </div>
                  <div>
                    <strong>Plate: </strong>
                    <span>{vehicle.plate ?? "—"}</span>
                  </div>
                </div>

                <div className="vehicle-color-wrapper">
                  <span>Color</span>
                  <div
                    className="vehicle-color"
                    style={{ backgroundColor: vehicle.color }}
                  />
                </div>

                <p className="vehicle-mods">{vehicle.modifications}</p>

                <button
                  className="vehicle-card-button"
                  onClick={() => setEditVehicle(vehicle)}
                >
                  Edit Vehicle
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* ADD MODAL */}
      {showAdd && (
        <AddVehicleComponent
          onSuccess={() => {
            setShowAdd(false);
            refetch(undefined);
          }}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {/* EDIT MODAL */}
      {editVehicle && (
        <AddVehicleComponent
          vehicle={editVehicle}
          onSuccess={() => {
            setEditVehicle(null);
            refetch(undefined);
          }}
          onCancel={() => setEditVehicle(null)}
        />
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteTarget && (
        <div className="av-overlay">
          <div className="delete-modal">
            <p className="delete-icon">🗑️</p>
            <h3 className="delete-title">
              Are you sure to delete your vehicle?
            </h3>
            <p className="delete-subtitle">
              {deleteTarget.brand} {deleteTarget.model} ·{" "}
              {deleteTarget.plate ?? "No plate"}
            </p>
            <div className="delete-actions">
              <button
                className="av-btn-cancel"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="delete-confirm-btn"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
