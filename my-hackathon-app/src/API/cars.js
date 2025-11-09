const API_URL = import.meta.env.VITE_API_URL;

// get /api/cars with filters (search, style, msrp, ...)
export async function fetchCars(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/api/cars?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to get cars");
  }
  return res.json();
}

// get /api/cars/:id
export async function fetchCarById(id) {
  const res = await fetch(`${API_URL}/api/cars/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch car details");
  }
  return res.json();
}

// /api/compare
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
