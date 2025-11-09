// Display navigation bar with hamburger menu, search bar, and user login
import React, { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // menu closed
  const [menuOpen, setMenuOpen] = useState(false);

  // to toggle menu
  const toggleMenuu = () => {
    setMenuOpen((prev) => !prev);
  };

    return (
        <nav className = "navbar">
            {/* Hamburger Menu */}
            <div className = "navbar-hamburger">
                {/* hamburger icon */}
                <button className = "menu-button" onClick={toggleMenu}>
                    <span className = "menu-line" />
                    <span className = "menu-line" />
                    <span className = "menu-line" />
                </button>

                {/* menu items */}
                {menuOpen && (
                    <div className = "menu-dropdown">
                        {/* temporary menu items */}
                        <a href = "#">Home</a>
                        <a href = "#">All Vehicles</a>
                        <a href = "#">Help</a>
                    </div>
                )}   
            </div>

            {/* Search Bar */}
            <div className = "navbar-search">
                {/* search input */}
                <input
                    type="text"
                    className = "search-input"
                    placeholder="Search..."
                />
                <button className = "search-button">Search</button>
            </div>

            {/* User Login */}
            <div className = "navbar-login">
                <button className = "login-button">Login</button>
                <button className = "signup-button">Sign Up</button>
            </div>
        </nav>
    );
}