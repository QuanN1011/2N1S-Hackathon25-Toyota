// src/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";
import { fetchCars } from "./api/cars";

function App() {
  const navigate = useNavigate();

  // 🔹 Search state
  const [query, setQuery] = useState("");
  const [car, setCar] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Optional: keep your button to go to all vehicles
  function handleClickExploreAll() {
    navigate("/allvehicles");
  }

  // 🔹 Live suggestions while typing (same idea as ShowCar)
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const results = await fetchCars({ search: trimmed });
        setSuggestions(results.slice(0, 5)); // top 5
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  async function searchForCar(modelName) {
    const trimmed = modelName.trim();
    if (!trimmed) {
      setError("Please enter a model name to search (e.g. Camry).");
      setCar(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setCar(null);

      const results = await fetchCars({ search: trimmed });
      if (!results || results.length === 0) {
        setError("No cars found matching that model.");
        return;
      }

      setCar(results[0]); // just show the first match
      setShowSuggestions(false);
    } catch (err) {
      console.error(err);
      setError("Failed to search for cars.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    await searchForCar(query);
  }

  return (
    <div className="app-container">
      <Navbar />

      {/* Main content area*/}
      <main className="home-main">
        {/* Hero section */}
        <section className="content-section">
          <div className="content-overlay">
            <h1>Find Your Perfect Toyota</h1>
            <p>Discover and compare Toyota vehicles that fit your lifestyle.</p>

            {/* Explore all vehicles (optional) */}
            <button className="cta-button" onClick={handleClickExploreAll}>
              Explore All Vehicles
            </button>
          </div>
        </section>

        {/* 🔍 Search section with live suggestions */}
        <section
          className="page-card"
          style={{ position: "relative", marginTop: "2rem" }}
        >
          <h2 className="page-heading">Quick Model Search</h2>
          <p className="page-subtitle">
            Start typing a model name (e.g. Camry, RAV4, Corolla) to see details
            here on the home page.
          </p>

          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="input-pill"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="e.g. Camry"
              autoComplete="off"
            />

            {/* Live suggestion dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: "0.5rem",
                  zIndex: 20,
                  listStyle: "none",
                  padding: "0.25rem 0",
                  marginTop: "0.25rem",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    onClick={() => {
                      setQuery(s.model);
                      searchForCar(s.model);
                    }}
                    style={{
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "white")
                    }
                  >
                    {s.year} {s.model}{" "}
                    <span style={{ color: "#666" }}>({s.style})</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              className="page-button"
              style={{ marginTop: "0.75rem" }}
            >
              Search
            </button>
          </form>

          {loading && <p className="page-text">Searching…</p>}
          {error && !loading && (
            <p className="page-text" style={{ color: "#b00020" }}>
              {error}
            </p>
          )}
        </section>

        {/* Show selected car details only after a successful search */}
        {!loading && !error && car && (
          <section className="page-card" style={{ marginTop: "2rem" }}>
            {car.image && (
              <img
                src={car.image}
                alt={`${car.year} ${car.model}`}
                className="vehicle-image"
                style={{
                  maxWidth: "500px",
                  width: "100%",
                  height: "auto",
                  marginBottom: "1.5rem",
                  display: "block",
                  marginInline: "auto",
                }}
              />
            )}
            <h2 className="page-heading">
              {car.year} {car.model}
            </h2>
            <p className="page-text">
              <strong>MSRP:</strong> {car.msrp}
            </p>
            <p className="page-text">
              <strong>MPG:</strong> {car.mpg}
            </p>
            <p className="page-text">
              <strong>Style:</strong> {car.style}
            </p>
          </section>
        )}

        {/* Info Section (unchanged) */}
        <section className="info-section">
          <h2>How It Works</h2>
          <ol>
            <li>
              Use the search and filters to narrow down your preferred vehicle.
            </li>
            <li>View detailed information for each Toyota model.</li>
            <li>Select cars to compare side by side.</li>
          </ol>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default App;
