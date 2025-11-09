import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { fetchCars } from "../api/cars";

function AllVehicles() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const filters = {
          search,
          style: type === "All" ? undefined : type,
          max_msrp: maxPrice ? Number(maxPrice) : undefined,
        };

        const data = await fetchCars(filters);
        setCars(data);

        if (!data.some((c) => c.id === selectedVehicleId)) {
          setSelectedVehicleId(null);
        }
      } catch (err) {
        console.error("Failed to load cars", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, type, maxPrice, selectedVehicleId]);

  const handleSelectVehicle = (id) => {
    setSelectedVehicleId((prev) => (prev === id ? null : id));
  };

  const selectedVehicle = cars.find((v) => v.id === selectedVehicleId) || null;

  const handleCompareClick = () => {
    if (!selectedVehicle) return;
    navigate("/comparecar", { state: { baseCarId: selectedVehicle.id } });
  };

  return (
    <div className="app-container">
      <Navbar />

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
                <label className="field-label">Search by model</label>
                <input
                  type="text"
                  className="input-pill"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Camry, RAV4"
                />
              </div>

              <div>
                <label className="field-label">Vehicle style</label>
                <select
                  className="select-pill"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
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
            </div>
          </section>

          <section>
            {loading && <p className="page-text">Loading vehicles...</p>}

            {!loading && (
              <div className="vehicles-grid">
                {cars.map((c) => {
                  const isSelected = c.id === selectedVehicleId;

                  return (
                    <article
                      key={c.id}
                      className={`vehicle-card vehicle-card-clickable ${
                        isSelected ? "vehicle-card-selected" : ""
                      }`}
                      onClick={() => handleSelectVehicle(c.id)}
                    >
                      {c.image && (
                        <img
                          src={c.image}
                          alt={`${c.year} ${c.model}`}
                          className="vehicle-image"
                        />
                      )}

                      <h2 className="vehicle-name">
                        {c.year} {c.model}
                      </h2>
                      <p className="vehicle-meta">{c.style}</p>
                      <p className="vehicle-text">
                        <strong>{c.msrp}</strong> (MSRP)
                      </p>
                      <p className="vehicle-text">MPG: {c.mpg}</p>

                      {/* View details button – note the c.id is in scope here */}
                      <button
                        type="button"
                        className="page-button"
                        style={{ marginTop: "0.75rem" }}
                        onClick={(e) => {
                          e.stopPropagation(); // don’t toggle selection
                          navigate(`/showcar/${c.id}`);
                        }}
                      >
                        View details
                      </button>
                    </article>
                  );
                })}

                {!cars.length && (
                  <p className="page-text">
                    No vehicles match those filters yet. Try widening your price
                    or type options.
                  </p>
                )}
              </div>
            )}
          </section>

          {selectedVehicle && (
            <section className="page-card" style={{ marginTop: "20px" }}>
              <p className="page-text">
                Do you want to compare{" "}
                <strong>
                  {selectedVehicle.year} {selectedVehicle.model}
                </strong>
                ?
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
