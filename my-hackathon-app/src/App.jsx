import { useState } from 'react'
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className = "app-container">
        <Navbar />
        {/* Main content area*/}
        <main className = "home-main">
          {/* Placeholder for main content */}
          <section className = "content-section">
            <h1> Find Your Perfect Toyota</h1>
            <p>Discover and compare Toyota vehicles that fits your lifestyle</p>
            {/* CTA Button, let users explore */}
            <button className = "cta-button">Explore Vehicles</button>
          </section>

          {/* Info Section */}
          <section className = "info-section">
            <h2>How It Works</h2>
            <ol>
              <li> Use search bar and filters choices to narrow down your preferred vehicle</li>
              <li>View detailed information for each Toyota model</li>
              <li>Select cars to compare side by side</li>
            </ol>
          </section>
          <Footer />
        </main>
      </div>
  )
}

export default App;
