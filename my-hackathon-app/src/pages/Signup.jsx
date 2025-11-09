import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) setError(error.message);
    else navigate("/login");
  }

  return (
    <div className="app-container">
      <Navbar />

      <main className="home-main">
        <div className="page-main">
          <section
            className="page-card"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <h1 className="page-heading" style={{ textAlign: "center" }}>
              Create Account
            </h1>
            <p className="page-subtitle" style={{ textAlign: "center" }}>
              Join FindYoToyota to save your car preferences and comparisons
            </p>

            <form onSubmit={handleSignup}>
              <label className="field-label">Email</label>
              <input
                type="email"
                className="input-pill"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="field-label" style={{ marginTop: "12px" }}>
                Password
              </label>
              <input
                type="password"
                className="input-pill"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label className="field-label" style={{ marginTop: "12px" }}>
                Confirm Password
              </label>
              <input
                type="password"
                className="input-pill"
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />

              {error && (
                <p
                  className="page-text"
                  style={{ color: "#b91c1c", marginTop: "8px" }}
                >
                  {error}
                </p>
              )}

              <button type="submit" className="page-button" disabled={loading}>
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>

            <p
              className="page-text"
              style={{ textAlign: "center", marginTop: "16px" }}
            >
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#3b0764", fontWeight: 600 }}>
                Login
              </Link>
            </p>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Signup;
