import { useState } from "react";

import carroCarrera from '../assets/vehicles/carrocarrera.jpg';

import "../styles/vehicle.css";

type Vehicle = {
  id?: string;

  slug: string;

  vehicle_type: string;

  brand: string;

  model: string;

  year: number;

  color: string;

  plate: string | null;

  photo: string | null;

  modifications?: string | null;

  active?: boolean;
};

export const VehiclesPage = () => {

  const [vehicles] = useState<Vehicle[]>([
    {
      id: "1",
      slug: "skyline-r34",
      vehicle_type: "car",
      brand: "Nissan",
      model: "Skyline GT-R R34",
      year: 2002,
      color: "#2563eb",
      plate: "ABC-123",
      photo: carroCarrera,
      modifications: "Twin Turbo • NOS",
      active: true,
    },

    {
      id: "2",
      slug: "mazda-rx7",
      vehicle_type: "car",
      brand: "Mazda",
      model: "RX-7",
      year: 1999,
      color: "#dc2626",
      plate: "RX7-777",
      photo: carroCarrera,
      modifications: "Wide Body Kit",
      active: true,
    },

    {
      id: "3",
      slug: "supra-mk4",
      vehicle_type: "car",
      brand: "Toyota",
      model: "Supra MK4",
      year: 1998,
      color: "#eab308",
      plate: "SUP-444",
      photo: carroCarrera,
      modifications: "2JZ Swap • Drag Setup",
      active: true,
    },
  ]);

  return (
    <div className="vehicles-page">

      {/* HEADER */}

      <div className="vehicles-header">

        <div>

          <h1>
            My Garage
          </h1>

          <p>
            Manage your street racing vehicles.
          </p>

        </div>

        <button className="vehicle-add-button">
          Add Vehicle
        </button>

      </div>

      {/* VEHICLES GRID */}

      <section className="vehicles-grid">

        {vehicles.map((vehicle) => (

          <div
            key={vehicle.slug}
            className="vehicle-card"
          >

            <img
              src={vehicle.photo ?? ""}
              alt={vehicle.model}
              className="vehicle-card-image"
            />

            <div className="vehicle-card-content">

              <span className="vehicle-type">
                {vehicle.vehicle_type}
              </span>

              <h2>
                {vehicle.brand} {vehicle.model}
              </h2>

              <div className="vehicle-card-info">

                <div>

                  <strong>
                    Year
                  </strong>

                  <span>
                    {vehicle.year}
                  </span>

                </div>

                <div>

                  <strong>
                    Plate
                  </strong>

                  <span>
                    {vehicle.plate}
                  </span>

                </div>

              </div>

              <div className="vehicle-color-wrapper">

                <span>
                  Color
                </span>

                <div
                  className="vehicle-color"
                  style={{
                    backgroundColor: vehicle.color,
                  }}
                />

              </div>

              <p className="vehicle-mods">
                {vehicle.modifications}
              </p>

              <button className="vehicle-card-button">
                View Details
              </button>

            </div>

          </div>

        ))}

      </section>

    </div>
  );
};