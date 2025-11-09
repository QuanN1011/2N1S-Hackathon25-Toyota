// src/pages/ShowCar.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { fetchCars } from "../api/cars";

export default function ShowCar() {
  const [query, setQuery] = useState("");
  const [car, setCar] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // live suggestion list
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 🔹 Fetch matching cars dynamically while typing
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const results = await fetchCars({ search: trimmed });
        setSuggestions(results.slice(0, 5)); // show top 5 matches
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    }, 250); // debounce to avoid spam requests

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // 🔹 Handle full search or selection
  async function handleSearch(e) {
    e.preventDefault();
    await searchForCar(query);
  }

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

      setCar(results[0]);
      setShowSuggestions(false);
    } catch (err) {
      console.error(err);
      setError("Failed to search for cars.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <Navbar />

      <main className="home-main">
        <div className="page-main">
          {/* Search section */}
          <section className="page-card" style={{ position: "relative" }}>
            <h1 className="page-heading">Search for a Toyota</h1>
            <p className="page-subtitle">
              Start typing a model name (e.g. Camry, RAV4, Prius)
            </p>

            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="input-pill"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // slight delay so click registers
                placeholder="e.g. Camry"
                autoComplete="off"
              />

              {/* 🔹 Suggestion dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  style={{
                    position: "absolute",
                    top: "110%",
                    left: 0,
                    width: "100%",
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "0.5rem",
                    zIndex: 20,
                    listStyle: "none",
                    padding: "0.25rem 0",
                    margin: 0,
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

          {/* Display result only after a successful search */}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
