import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Help() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="home-main">
        <div className="page-main">
          <h1 className="page-heading">Help &amp; How to Use FindYoToyota</h1>
          <p className="page-subtitle">
            This guide walks you through how to use FindYoToyota to discover a
            Toyota that fits your lifestyle, preferences, and budget.
          </p>

          {/* What this site does */}
          <section className="page-card">
            <h2 className="page-section-title">
              What this website helps you do
            </h2>
            <p className="page-text">
              FindYoToyota is designed to make searching for a Toyota feel less
              overwhelming and more focused on what matters to you.
            </p>
            <ul className="page-list">
              <li>Browse a range of Toyota vehicles in one place.</li>
              <li>
                Filter by how you plan to use the car (commuting, family,
                off-road, etc.).
              </li>
              <li>
                Layer on price and budget filters to avoid options that
                don&apos;t fit.
              </li>
              <li>
                Compare multiple vehicles side-by-side before you visit a
                dealership.
              </li>
            </ul>
          </section>

          {/* How to find the right car */}
          <section className="page-card">
            <h2 className="page-section-title">
              How to find the right car for you
            </h2>

            <h3 className="page-section-title" style={{ fontSize: "1.05rem" }}>
              1. Start with how you&apos;ll use the car
            </h3>
            <p className="page-text">
              Before touching any filters, think about your daily routine and
              what you actually need:
            </p>
            <ul className="page-list">
              <li>
                <strong>Mostly commuting &amp; city driving:</strong> compact
                cars or hybrids with strong MPG.
              </li>
              <li>
                <strong>Family, kids, or carpooling:</strong> SUVs and models
                with extra seats and cargo space.
              </li>
              <li>
                <strong>Road trips &amp; weekend travel:</strong> comfort,
                storage, and highway MPG.
              </li>
              <li>
                <strong>Off-road &amp; adventure:</strong> trucks and SUVs with
                AWD/4x4.
              </li>
            </ul>

            <h3
              className="page-section-title"
              style={{ fontSize: "1.05rem", marginTop: "12px" }}
            >
              2. Use the filters on the All Vehicles page
            </h3>
            <p className="page-text">
              On the <strong>All Vehicles</strong> page, you can narrow options
              using:
            </p>
            <ul className="page-list">
              <li>
                <strong>Search by name:</strong> e.g. &quot;Camry&quot; or
                &quot;RAV4&quot;.
              </li>
              <li>
                <strong>Vehicle type:</strong> sedan, SUV, truck, hybrid, etc.
              </li>
              <li>
                <strong>Max price:</strong> set a rough upper limit that feels
                realistic.
              </li>
              <li>
                <strong>Minimum seats:</strong> match the number of people you
                regularly drive with.
              </li>
            </ul>

            <h3
              className="page-section-title"
              style={{ fontSize: "1.05rem", marginTop: "12px" }}
            >
              3. Use Show Car for deeper details
            </h3>
            <p className="page-text">
              If one model catches your eye, go to <strong>Show Car</strong> and
              search it by name to see:
            </p>
            <ul className="page-list">
              <li>Basic specs (body type, seat count, drivetrain).</li>
              <li>Estimated starting price and fuel economy.</li>
              <li>
                Short description of what that vehicle is best suited for.
              </li>
            </ul>

            <h3
              className="page-section-title"
              style={{ fontSize: "1.05rem", marginTop: "12px" }}
            >
              4. Compare your top picks side-by-side
            </h3>
            <p className="page-text">
              On the <strong>Compare Car</strong> page, type two model names and
              load them into a left/right comparison:
            </p>
            <ul className="page-list">
              <li>See price, seats, drivetrain, and fuel economy for each.</li>
              <li>Spot trade-offs like space vs. price or MPG vs. power.</li>
              <li>Use this to narrow down to one or two favorites.</li>
            </ul>
          </section>

          {/* Budget & finances */}
          <section className="page-card">
            <h2 className="page-section-title">
              Understanding budget &amp; financing basics
            </h2>
            <p className="page-text">
              FindYoToyota isn&apos;t a loan calculator, but it can help you
              think about which vehicles are more likely to fit your budget.
            </p>

            <h3 className="page-section-title" style={{ fontSize: "1.05rem" }}>
              Key cost factors
            </h3>
            <ul className="page-list">
              <li>
                <strong>Vehicle price:</strong> higher trim levels cost more.
              </li>
              <li>
                <strong>Down payment:</strong> more upfront usually lowers
                monthly payments.
              </li>
              <li>
                <strong>Loan term:</strong> longer term = lower monthly, more
                interest overall.
              </li>
              <li>
                <strong>Fuel costs:</strong> efficient models and hybrids save
                month-to-month.
              </li>
              <li>
                <strong>Other costs:</strong> insurance, maintenance,
                registration, taxes.
              </li>
            </ul>

            <p
              className="page-text"
              style={{ fontSize: "0.9rem", color: "#6b7280" }}
            >
              Any price or payment information is only a rough guide. For exact
              numbers, talk with a dealer or financial professional.
            </p>
          </section>

          {/* FAQ */}
          <section className="page-card">
            <h2 className="page-section-title">Frequently asked questions</h2>

            <h3 className="page-section-title" style={{ fontSize: "1.05rem" }}>
              Do higher trims always mean a better choice?
            </h3>
            <p className="page-text">
              Higher trims usually add comfort and features, but also increase
              price. Use the comparison tools to decide whether those extras
              matter for your daily use.
            </p>

            <h3
              className="page-section-title"
              style={{ fontSize: "1.05rem", marginTop: "12px" }}
            >
              I&apos;m on a tight budget. Where should I start?
            </h3>
            <p className="page-text">
              Start with the <strong>All Vehicles</strong> page, set a lower max
              price, and look for models with good fuel economy. Compact cars
              and some hybrids are great starting points.
            </p>

            <h3
              className="page-section-title"
              style={{ fontSize: "1.05rem", marginTop: "12px" }}
            >
              What if I&apos;m not sure which model fits me best?
            </h3>
            <p className="page-text">
              Use the filters for seats, body type, and price so you get a small
              list of realistic options, then:
            </p>
            <ul className="page-list">
              <li>
                Open each one in <strong>Show Car</strong> to read the summary.
              </li>
              <li>
                Use <strong>Compare Car</strong> to put your top two
                side-by-side.
              </li>
              <li>
                Think about which one fits your everyday life, not just looks.
              </li>
            </ul>
          </section>

          {/* Closing */}
          <section className="page-card">
            <h2 className="page-section-title">Need more help?</h2>
            <p className="page-text">
              If you&apos;re still unsure, adjust your filters or compare a
              different mix of vehicles. This tool is meant to help you arrive
              at the dealership with a short list of favorites.
            </p>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Help;
