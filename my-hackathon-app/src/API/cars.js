/**
 * API layer - connects the React frontend to the Flask backend
 *
 * HOW API CONNECTION WORKS:
 * 1. API_URL: Your backend runs on http://localhost:8000 (or VITE_API_URL from .env)
 * 2. fetch(url): The browser sends an HTTP request to that URL
 * 3. Backend (app.py) receives it, processes, returns JSON
 * 4. res.json() parses the response into a JavaScript object
 *
 * IMPORTANT: Backend must be running (python app.py) and CORS must allow your
 * frontend origin (localhost:5173) - this is configured in app.py
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// GET /api/cars - returns list of cars, optional query params: search, year, style, min_msrp, max_msrp, min_mpg, max_mpg
export async function fetchCars(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const query = params.toString();
  const url = `${API_URL}/api/cars${query ? `?${query}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to get cars");
  }
  return res.json();
}

// GET /api/cars/:id - returns a single car by ID
export async function fetchCarById(id) {
  const res = await fetch(`${API_URL}/api/cars/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch car details");
  }
  return res.json();
}

// POST /api/compare - returns array of cars matching the given IDs
export async function compareCars(ids) {
  const res = await fetch(`${API_URL}/api/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) {
    throw new Error("Failed to compare cars");
  }
  return res.json();
}
