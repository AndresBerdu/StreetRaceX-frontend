import { useActiveVehicle } from "../../hooks/useActiveVehicle";

export const ActiveVehicleCard = () => {
  const { activeVehicle } = useActiveVehicle();
  const v = activeVehicle as any;

  return (
    <div className="profile-card">
      <span className="vehicle-label">ACTIVE VEHICLE</span>
      {activeVehicle ? (
        <>
          <h2>{v.brand} {v.model}</h2>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>
            {v.modifications ?? "No modifications"}
          </p>
          {v.photo && (
            <img src={v.photo} alt="Vehicle" className="profile-vehicle-image" />
          )}
          <div className="vehicle-info-grid">
            <div>
              <strong>Plate</strong>
              <span>{v.plate ?? "—"}</span>
            </div>
            <div>
              <strong>Year</strong>
              <span>{v.year}</span>
            </div>
            <div>
              <strong>Color</strong>
              <span>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: v.color,
                    border: "2px solid white",
                    display: "inline-block",
                  }}
                />
              </span>
            </div>
          </div>
        </>
      ) : (
        <p style={{ color: "#94a3b8" }}>
          No active vehicle. Go to garage to set one.
        </p>
      )}
    </div>
  );
};