import carroCarrera from "../../assets/vehicles/carrocarrera.jpg";

export const ActiveVehicleCard = () => {
  return (
    <div className="active-vehicle-card">

      <div className="vehicle-info">

        <span>
          ACTIVE VEHICLE
        </span>

        <h2>
          Nissan Skyline GT-R R34
        </h2>

        <p>
          Tuned for high-speed street domination.
        </p>

        <div className="vehicle-stats">

          <div>
            <strong>Class</strong>
            <span>Sport</span>
          </div>

          <div>
            <strong>Power</strong>
            <span>480 HP</span>
          </div>

          <div>
            <strong>Top Speed</strong>
            <span>320 KM/H</span>
          </div>

        </div>
      </div>

      <img
        src={carroCarrera}
        alt="Vehicle"
      />
    </div>
  );
};