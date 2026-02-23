// src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import LogoutButton from "./LogoutButton.jsx";
import { fetchCars } from "../api/cars";

export default function Navbar() {
  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Supabase session tracking
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    return () => subscription.unsubscribe();
  }, []);

  // 🔹 Clear suggestions on route change
  useEffect(() => {
    setShowSuggestions(false);
    setSuggestions([]);
  }, [location.pathname]);

  // 🔹 Live search suggestions
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const results = await fetchCars({ search: trimmed });
        setSuggestions(results.slice(0, 5)); // top 5 results
      } catch (err) {
        console.error("Failed to fetch car suggestions", err);
        setSuggestions([]);
      }
    }, 250);

    return () => clearTimeout(delay);
  }, [query]);

  // 🔹 Navigation handlers
  const handleClickLogin = () => navigate("/login");
  const handleClickSignUp = () => navigate("/signup");
  const handleClickHome = () => navigate("/");
  const handleClickHelp = () => navigate("/help");
  const handleClickAllVehicles = () => navigate("/allvehicles");
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // 🔹 Handle search submit or suggestion click
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/showcar?q=${encodeURIComponent(trimmed)}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (modelName) => {
    setQuery(modelName);
    navigate(`/showcar?q=${encodeURIComponent(modelName)}`);
    setShowSuggestions(false);
  };

  return (
    <nav className="navbar">
      {/* Hamburger Menu */}
      <div className="navbar-hamburger">
        <button className="menu-button" onClick={toggleMenu}>
          <span className="menu-line" />
          <span className="menu-line" />
          <span className="menu-line" />
        </button>

        {menuOpen && (
          <div className="menu-dropdown">
            <button onClick={handleClickHome}>Home</button>
            <button onClick={handleClickAllVehicles}>All Vehicles</button>
            <button onClick={handleClickHelp}>Help</button>
          </div>
        )}
      </div>

      {/* 🔍 Search Bar */}
      <div className="navbar-search" style={{ position: "relative" }}>
        <form onSubmit={handleSearchSubmit} className="navbar-search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search models (e.g. Camry)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            autoComplete="off"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {/* Suggestion Dropdown */}
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
                onClick={() => handleSuggestionClick(s.model)}
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
      </div>

      {/* User Login */}
      <div className="navbar-login">
        {!session && (
          <>
            <button className="login-button" onClick={handleClickLogin}>
              Log In
            </button>
            <button className="signup-button" onClick={handleClickSignUp}>
              Sign Up
            </button>
          </>
        )}
        {session && (
          <button className="logout-button">
            <LogoutButton />
          </button>
        )}
      </div>
    </nav>
  );
}
