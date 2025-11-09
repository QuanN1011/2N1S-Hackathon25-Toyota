import React from "react";

function Help() {
  return (
    <main className="page-main">
      <h1 className="page-heading">Help &amp; How to Use FindYoToyota</h1>
      <p className="page-subtitle">
        This guide walks you through how to use FindYoToyota to discover a
        Toyota that fits your lifestyle, preferences, and budget. Use it as a
        starting point before talking to a dealer or financial professional.
      </p>

      {/* What this site does */}
      <section className="page-card">
        <h2 className="page-section-title">What this website helps you do</h2>
        <p className="page-text">
          FindYoToyota is designed to make searching for a Toyota feel less
          overwhelming and more focused on what matters to you.
        </p>
        <ul className="page-list">
          <li>Browse a range of Toyota vehicles in one place.</li>
          <li>
            Filter by how you plan to use the car (commuting, family, off-road,
            etc.).
          </li>
          <li>
            Layer on price and budget filters to avoid options that don&apos;t
            fit.
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
          Before touching any filters, think about your daily routine and what
          you actually need:
        </p>
        <ul className="page-list">
          <li>
            <strong>Mostly commuting &amp; city driving:</strong> look at
            compact cars or hybrids with strong MPG.
          </li>
          <li>
            <strong>Family, kids, or carpooling:</strong> check SUVs and models
            with extra seats and cargo space.
          </li>
          <li>
            <strong>Road trips &amp; weekend travel:</strong> prioritize
            comfort, storage, and highway MPG.
          </li>
          <li>
            <strong>Off-road &amp; adventure:</strong> focus on trucks and SUVs
            with AWD/4x4.
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
            <strong>Search by name:</strong> type in something like
            &quot;Camry&quot; or &quot;RAV4&quot;.
          </li>
          <li>
            <strong>Vehicle type:</strong> sedan, SUV, truck, hybrid, etc.
          </li>
          <li>
            <strong>Max price:</strong> set a rough upper limit that feels
            realistic for you.
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
          <li>Short description of what that vehicle is best suited for.</li>
        </ul>

        <h3
          className="page-section-title"
          style={{ fontSize: "1.05rem", marginTop: "12px" }}
        >
          4. Compare your top picks side-by-side
        </h3>
        <p className="page-text">
          On the <strong>Compare Car</strong> page, you can type two model names
          and load them into a left/right comparison:
        </p>
        <ul className="page-list">
          <li>See price, seats, drivetrain, and fuel economy for each.</li>
          <li>
            Quickly spot trade-offs like more space vs. higher price, or better
            MPG vs. less power.
          </li>
          <li>
            Use this to narrow down to one or two favorites before you visit a
            dealer in person.
          </li>
        </ul>
      </section>

      {/* Budget & finances */}
      <section className="page-card">
        <h2 className="page-section-title">
          Understanding budget &amp; financing basics
        </h2>
        <p className="page-text">
          FindYoToyota isn&apos;t a loan calculator, but it can help you think
          about which vehicles are more likely to fit your budget.
        </p>

        <h3 className="page-section-title" style={{ fontSize: "1.05rem" }}>
          Key cost factors to keep in mind
        </h3>
        <ul className="page-list">
          <li>
            <strong>Vehicle price:</strong> the main starting point; higher trim
            levels cost more.
          </li>
          <li>
            <strong>Down payment:</strong> paying more upfront usually lowers
            your monthly payment.
          </li>
          <li>
            <strong>Loan term:</strong> longer terms lower monthly payments but
            may increase total interest paid.
          </li>
          <li>
            <strong>Fuel costs:</strong> hybrids or efficient models can save
            money month-to-month.
          </li>
          <li>
            <strong>Other costs:</strong> insurance, maintenance, registration,
            and taxes.
          </li>
        </ul>

        <p
          className="page-text"
          style={{ fontSize: "0.9rem", color: "#6b7280" }}
        >
          Any payment estimates or price ranges shown in the app are for general
          guidance only. For exact numbers, you&apos;ll need to speak with
          lenders or a dealership.
        </p>
      </section>

      {/* FAQ */}
      <section className="page-card">
        <h2 className="page-section-title">Frequently asked questions</h2>

        <h3 className="page-section-title" style={{ fontSize: "1.05rem" }}>
          Do higher trims always mean a better choice?
        </h3>
        <p className="page-text">
          Higher trims usually add more comfort and features, but they also
          increase the price. Use the comparison tools to decide whether those
          extra features are worth it for your actual daily use.
        </p>

        <h3
          className="page-section-title"
          style={{ fontSize: "1.05rem", marginTop: "12px" }}
        >
          I&apos;m on a tight budget. Where should I start?
        </h3>
        <p className="page-text">
          Start with the <strong>All Vehicles</strong> page, set a lower max
          price, and look for models with good fuel economy. Compact cars and
          some hybrids are often strong options for saving on both price and
          fuel.
        </p>

        <h3
          className="page-section-title"
          style={{ fontSize: "1.05rem", marginTop: "12px" }}
        >
          What if I&apos;m not sure which model fits me best?
        </h3>
        <p className="page-text">
          Use filters for seats, body type, and price to get a small list of
          realistic options. Then:
        </p>
        <ul className="page-list">
          <li>
            Open each one in <strong>Show Car</strong> to read the summary.
          </li>
          <li>
            Use <strong>Compare Car</strong> to put your top two or three
            side-by-side.
          </li>
          <li>
            Think about which one fits your everyday life, not just how it
            looks.
          </li>
        </ul>
      </section>

      {/* Closing */}
      <section className="page-card">
        <h2 className="page-section-title">Need more help?</h2>
        <p className="page-text">
          If you&apos;re still unsure, try adjusting your filters or comparing a
          different mix of vehicles. This tool is meant to prepare you with a
          short list of favorites so your visit to a Toyota dealer is faster and
          more focused on what you actually want.
        </p>
        <p
          className="page-text"
          style={{ fontSize: "0.9rem", color: "#6b7280" }}
        >
          Nothing here is personal financial advice. Everyone&apos;s situation
          is different, so consider talking with a trusted advisor or dealer for
          the final decision.
        </p>
      </section>
    </main>
  );
}

export default Help;
