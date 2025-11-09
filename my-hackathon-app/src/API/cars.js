// src/api/cars.js

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// GET /api/cars with optional filters
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

// GET /api/cars/:id
export async function fetchCarById(id) {
  const res = await fetch(`${API_URL}/api/cars/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch car details");
  }
  return res.json();
}

// POST /api/compare
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
