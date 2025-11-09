import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function AllVehicles() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSeats, setMinSeats] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const navigate = useNavigate();

  const filtered = VEHICLES.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "All" || v.type === type;
    const matchesPrice = maxPrice === "" || v.price <= Number(maxPrice || 0);
    const matchesSeats = minSeats === "" || v.seats >= Number(minSeats || 0);
    return matchesSearch && matchesType && matchesPrice && matchesSeats;
  });

  const handleSelectVehicle = (id) => {
    // click again to unselect
    setSelectedVehicleId((prev) => (prev === id ? null : id));
  };

  const selectedVehicle =
    filtered.find((v) => v.id === selectedVehicleId) ||
    VEHICLES.find((v) => v.id === selectedVehicleId) ||
    null;

  const handleCompareClick = () => {
    if (!selectedVehicle) return;
    // You can pass state to CompareCar if you want to use it there
    navigate("/comparecar", { state: { vehicleId: selectedVehicle.id } });
  };

  return (
    <div className="app-container">
      <Navbar />

      {/* main content area, styled like inner pages */}
      <main className="home-main">
        <div className="page-main">
          <h1 className="page-heading">Browse All Toyota Vehicles</h1>
          <p className="page-subtitle">
            Use the filters below to quickly find Toyotas that fit your
            lifestyle, space needs, and budget.
          </p>

          <section className="page-card">
            <h2 className="page-section-title">Filters</h2>
            <div className="filters-grid">
              <div>
                <label className="field-label">Search by name</label>
                <input
                  type="text"
                  className="input-pill"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Camry, RAV4"
                />
              </div>

              <div>
                <label className="field-label">Vehicle type</label>
                <select
                  className="select-pill"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="field-label">Max price ($)</label>
                <input
                  type="number"
                  className="input-pill"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g. 35000"
                />
              </div>

              <div>
                <label className="field-label">Minimum seats</label>
                <input
                  type="number"
                  className="input-pill"
                  value={minSeats}
                  onChange={(e) => setMinSeats(e.target.value)}
                  placeholder="e.g. 5"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="vehicles-grid">
              {filtered.map((v) => {
                const isSelected = v.id === selectedVehicleId;
                return (
                  <article
                    key={v.id}
                    className={`vehicle-card vehicle-card-clickable ${
                      isSelected ? "vehicle-card-selected" : ""
                    }`}
                    onClick={() => handleSelectVehicle(v.id)}
                  >
                    <h2 className="vehicle-name">{v.name}</h2>
                    <p className="vehicle-meta">
                      {v.type} • {v.seats} seats • {v.drivetrain}
                    </p>
                    <p className="vehicle-text">
                      <strong>${v.price.toLocaleString()}</strong> (MSRP
                      estimate)
                    </p>
                    <p className="vehicle-text">
                      {v.mpgCity} / {v.mpgHwy} mpg (city / highway)
                    </p>
                  </article>
                );
              })}

              {filtered.length === 0 && (
                <p className="page-text">
                  No vehicles match those filters yet. Try widening your price
                  or type options.
                </p>
              )}
            </div>
          </section>

          {/* Compare prompt when a car is selected */}
          {selectedVehicle && (
            <section className="page-card" style={{ marginTop: "20px" }}>
              <p className="page-text">
                Do you want to compare <strong>{selectedVehicle.name}</strong>?
              </p>
              <button className="page-button" onClick={handleCompareClick}>
                Compare this car
              </button>
            </section>
          )}

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default AllVehicles;
