// Display navigation bar with hamburger menu, search bar, and user login
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import LogoutButton from "./LogoutButton.jsx";

export default function Navbar() {
  //const [isMenuOpen, setIsMenuOpen] = useState(false); // never used
  // menu closed
  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  function handleClickLogin() {
    navigate("/login"); // this changes to the login page
  }

  function handleClickSignUp() {
    navigate("/signup"); // this changes to the login page
  }

  function handleClickHome() {
    navigate("/"); // this changes to the login page
  }

  function handleClickHelp() {
    navigate("/help"); // this changes to the login page
  }

  /*function handleClickShowCar() {
    navigate("/showcar"); // this changes to the login page
  } */ // not used

  function handleClickAllVehicles() {
    navigate("/allvehicles"); // this changes to the login page
  }

  // to toggle menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      {/* Hamburger Menu */}
      <div className="navbar-hamburger">
        {/* hamburger icon */}
        <button className="menu-button" onClick={toggleMenu}>
          <span className="menu-line" />
          <span className="menu-line" />
          <span className="menu-line" />
        </button>

        {/* menu items */}
        {menuOpen && (
          <div className="menu-dropdown">
            {/* temporary menu items */}
            {/*<a href="#">Home</a>*/}
            <button onClick={handleClickHome}>Home</button>
            <button onClick={handleClickAllVehicles}>All Vehicles</button>
            <button onClick={handleClickHelp}>Help</button>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        {/* search input */}
        <input type="text" className="search-input" placeholder="Search..." />
        <button className="search-button">Search</button>
      </div>

      {/* User Login */}
      <div className="navbar-login">
        {!session && (
          <button className="login-button" onClick={handleClickLogin}>
            Log In
          </button>
        )}
        {!session && (
          <button className="signup-button" onClick={handleClickSignUp}>
            Sign Up
          </button>
        )}
        {session && (
          <button className="logout-button">
            <LogoutButton />
          </button>
        )}
      </div>
    </nav>
  );
} /*}

/*
{/* User Login }
<div className="navbar-login">
<button className="login-button">Login</button>
<button className="signup-button">Sign Up</button>
</div>
*/
