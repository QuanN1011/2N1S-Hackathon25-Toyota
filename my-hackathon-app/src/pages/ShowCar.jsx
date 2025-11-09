import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const VEHICLES = [
  {
    id: 1,
    name: "Camry SE",
    type: "Sedan",
    price: 29000,
    seats: 5,
    drivetrain: "FWD",
    mpgCity: 28,
    mpgHwy: 39,
    description:
      "A comfortable midsize sedan with strong fuel economy and advanced safety tech.",
    cargo: "15.1 cu ft trunk",
  },
  {
    id: 2,
    name: "RAV4 XLE",
    type: "SUV",
    price: 33000,
    seats: 5,
    drivetrain: "AWD",
    mpgCity: 27,
    mpgHwy: 35,
    description:
      "Versatile compact SUV for commuting, weekend trips, and light off-road use.",
    cargo: "37.6–69.8 cu ft cargo space",
  },
  {
    id: 3,
    name: "Highlander XLE",
    type: "SUV",
    price: 41000,
    seats: 7,
    drivetrain: "AWD",
    mpgCity: 22,
    mpgHwy: 29,
    description:
      "Three-row SUV balancing family comfort, tech features, and generous cargo space.",
    cargo: "16.0–84.3 cu ft cargo space",
  },
  {
    id: 4,
    name: "Corolla LE Hybrid",
    type: "Hybrid",
    price: 27000,
    seats: 5,
    drivetrain: "FWD",
    mpgCity: 50,
    mpgHwy: 43,
    description:
      "Highly efficient hybrid sedan ideal for keeping daily fuel costs low.",
    cargo: "13.1 cu ft trunk",
  },
  {
    id: 5,
    name: "Tacoma TRD Off-Road",
    type: "Truck",
    price: 42000,
    seats: 5,
    drivetrain: "4x4",
    mpgCity: 18,
    mpgHwy: 23,
    description:
      "Off-road focused mid-size pickup with strong capability and rugged styling.",
    cargo: "5–6 ft bed options",
  },
];

function ShowCar() {
  const [query, setQuery] = useState("");
  const [car, setCar] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const match = VEHICLES.find(
      (v) => v.name.toLowerCase() === query.trim().toLowerCase()
    );
    if (match) {
      setCar(match);
      setNotFound(false);
    } else {
      setCar(null);
      setNotFound(true);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="home-main">
        <div className="page-main">
          <h1 className="page-heading">Look Up a Toyota Vehicle</h1>
          <p className="page-subtitle">
            Search for a specific model by name to see a quick overview of its
            specs, fuel economy, space, and typical pricing.
          </p>

          {/* Search card */}
          <section className="page-card">
            <h2 className="page-section-title">Search by name</h2>
            <label className="field-label">Vehicle name</label>
            <input
              list="vehicleNamesShow"
              className="input-pill"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Corolla LE Hybrid"
            />
            <button className="page-button" onClick={handleSearch}>
              Show vehicle
            </button>

            <datalist id="vehicleNamesShow">
              {VEHICLES.map((v) => (
                <option key={v.id} value={v.name} />
              ))}
            </datalist>

            {notFound && (
              <p
                className="page-text"
                style={{ color: "#b91c1c", marginTop: "8px" }}
              >
                We couldn&apos;t find a vehicle with that exact name. Try
                selecting one of the suggestions.
              </p>
            )}
          </section>

          {/* Details card */}
          {car && (
            <article className="page-card">
              <h2 className="page-section-title">{car.name}</h2>
              <p className="vehicle-meta">
                {car.type} • {car.seats} seats • {car.drivetrain}
              </p>
              <p className="vehicle-text">
                <strong>${car.price.toLocaleString()}</strong> (approximate
                starting MSRP)
              </p>
              <p className="vehicle-text">
                Fuel economy: <strong>{car.mpgCity}</strong> mpg city /{" "}
                <strong>{car.mpgHwy}</strong> mpg highway
              </p>
              <p className="vehicle-text">Cargo / bed space: {car.cargo}</p>
              <p className="page-text">{car.description}</p>
              <p
                className="page-text"
                style={{ fontSize: "0.9rem", color: "#6b7280" }}
              >
                Specs and pricing are estimates for demo purposes. For exact
                availability and offers, please refer to an official Toyota
                dealer.
              </p>
            </article>
          )}

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default ShowCar;
