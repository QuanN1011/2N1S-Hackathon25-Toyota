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
  },
];

function findByName(name) {
  if (!name) return null;
  return VEHICLES.find(
    (v) => v.name.toLowerCase() === name.trim().toLowerCase()
  );
}

function CompareCar() {
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");
  const [leftCar, setLeftCar] = useState(null);
  const [rightCar, setRightCar] = useState(null);

  const handleLoadLeft = () => {
    setLeftCar(findByName(leftInput));
  };

  const handleLoadRight = () => {
    setRightCar(findByName(rightInput));
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="home-main">
        <div className="page-main">
          <h1 className="page-heading">Compare Two Toyota Vehicles</h1>
          <p className="page-subtitle">
            Search for two models and see them side-by-side on price, size, fuel
            economy, and key specs.
          </p>

          <section className="page-card">
            <h2 className="page-section-title">Choose vehicles to compare</h2>
            <div className="split-grid">
              <div>
                <label className="field-label">Left car (Car A)</label>
                <input
                  list="vehicleNamesCompare"
                  className="input-pill"
                  value={leftInput}
                  onChange={(e) => setLeftInput(e.target.value)}
                  placeholder="e.g. Camry SE"
                />
                <button className="page-button" onClick={handleLoadLeft}>
                  Load left car
                </button>
              </div>

              <div>
                <label className="field-label">Right car (Car B)</label>
                <input
                  list="vehicleNamesCompare"
                  className="input-pill"
                  value={rightInput}
                  onChange={(e) => setRightInput(e.target.value)}
                  placeholder="e.g. RAV4 XLE"
                />
                <button className="page-button" onClick={handleLoadRight}>
                  Load right car
                </button>
              </div>
            </div>

            <datalist id="vehicleNamesCompare">
              {VEHICLES.map((v) => (
                <option key={v.id} value={v.name} />
              ))}
            </datalist>
          </section>

          <section className="split-grid">
            <CompareCard title="Car A" car={leftCar} />
            <CompareCard title="Car B" car={rightCar} />
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}

function CompareCard({ title, car }) {
  return (
    <article className="split-card">
      <h2 className="page-section-title">{title}</h2>

      {!car && (
        <p className="page-text">
          Search for a vehicle name above, then click &quot;Load&quot; to see it
          here.
        </p>
      )}

      {car && (
        <>
          <h3 className="vehicle-name">{car.name}</h3>
          <p className="vehicle-meta">
            {car.type} • {car.seats} seats • {car.drivetrain}
          </p>
          <p className="vehicle-text">
            <strong>${car.price.toLocaleString()}</strong> (MSRP estimate)
          </p>
          <p className="vehicle-text">
            {car.mpgCity} / {car.mpgHwy} mpg (city / highway)
          </p>
        </>
      )}
    </article>
  );
}

export default CompareCar;
