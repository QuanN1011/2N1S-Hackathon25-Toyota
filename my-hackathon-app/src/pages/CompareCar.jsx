import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { fetchCars } from "../api/cars";

function CompareCar() {
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");
  const [leftCar, setLeftCar] = useState(null);
  const [rightCar, setRightCar] = useState(null);
  const [allCars, setAllCars] = useState([]);

  const location = useLocation();

  useEffect(() => {
    async function loadAll() {
      try {
        const data = await fetchCars({});
        setAllCars(data);

        // if we came from AllVehicles with a baseCarId, preselect that car on the left
        if (location.state?.baseCarId) {
          const base = data.find((c) => c.id === location.state.baseCarId);
          if (base) {
            setLeftCar(base);
            setLeftInput(`${base.year} ${base.model}`);
          }
        }
      } catch (err) {
        console.error("Failed to load cars for compare", err);
      }
    }
    loadAll();
  }, [location.state]);

  function findByNameLike(input) {
    if (!input) return null;
    const q = input.trim().toLowerCase();
    return (
      allCars.find(
        (c) =>
          `${c.year} ${c.model}`.toLowerCase() === q ||
          (c.model || "").toLowerCase() === q
      ) || null
    );
  }

  const handleLoadLeft = () => {
    setLeftCar(findByNameLike(leftInput));
  };

  const handleLoadRight = () => {
    setRightCar(findByNameLike(rightInput));
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="home-main">
        <div className="page-main">
          <h1 className="page-heading">Compare Two Toyota Vehicles</h1>
          <p className="page-subtitle">
            Search for two models and see them side-by-side on price, fuel
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
                  placeholder="e.g. 2024 Camry"
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
                  placeholder="e.g. 2024 RAV4"
                />
                <button className="page-button" onClick={handleLoadRight}>
                  Load right car
                </button>
              </div>
            </div>

            <datalist id="vehicleNamesCompare">
              {allCars.map((c) => (
                <option
                  key={c.id}
                  value={`${c.year} ${c.model}`}
                />
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
          <h3 className="vehicle-name">
            {car.year} {car.model}
          </h3>
          <p className="vehicle-meta">{car.style}</p>
          <p className="vehicle-text">
            <strong>{car.msrp}</strong> (MSRP)
          </p>
          <p className="vehicle-text">MPG: {car.mpg}</p>
        </>
      )}
    </article>
  );
}

export default CompareCar;
