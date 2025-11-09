import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) setError(error.message);
    else navigate("/");
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
              Welcome Back
            </h1>
            <p className="page-subtitle" style={{ textAlign: "center" }}>
              Sign in to your FindYoToyota account
            </p>

            <form onSubmit={handleLogin}>
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p
              className="page-text"
              style={{ textAlign: "center", marginTop: "16px" }}
            >
              Don&apos;t have an account?{" "}
              <Link to="/signup" style={{ color: "#3b0764", fontWeight: 600 }}>
                Sign Up
              </Link>
            </p>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Login;
