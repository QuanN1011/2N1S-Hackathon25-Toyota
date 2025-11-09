// import { useState } from 'react' // not in use
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";

import { useNavigate } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0) // not in use
  const navigate = useNavigate();

  function handleClickShowCar() {
    navigate("/showcar"); // this changes to the login page
  }

  return (
    <div className="app-container">
      <Navbar />
      {/* Main content area*/}
      <main className="home-main">
        <section className="content-section">
          {/* overlay on top of image */}
          <div className="content-overlay">
            <h1> Find Your Perfect Toyota</h1>
            <p>Discover and compare Toyota vehicles that fits your lifestyle</p>
            {/* CTA Button, let users explore */}
            {/*<button className="cta-button">Explore Vehicles</button>*/}
            <button className="cta-button" onClick={handleClickShowCar}>
              Explore Vehicles
            </button>
          </div>
        </section>

        {/* Info Section */}
        <section className="info-section">
          <h2>How It Works</h2>
          <ol>
            <li>
              {" "}
              Use search bar and filters choices to narrow down your preferred
              vehicle
            </li>
            <li>View detailed information for each Toyota model</li>
            <li>Select cars to compare side by side</li>
          </ol>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default App;
