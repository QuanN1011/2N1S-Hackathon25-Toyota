// src/components/VehicleFilters.jsx
function VehicleFilters({ filters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="filters">
      <h2>Filter Vehicles</h2>

      <label>
        Style:
        <select name="style" value={filters.style} onChange={handleChange}>
          <option value="">All</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </label>

      <label>
        Max MSRP:
        <select
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
        >
          <option value="">No limit</option>
          <option value="30000">$30,000</option>
          <option value="40000">$40,000</option>
          <option value="50000">$50,000</option>
          <option value="60000">$60,000+</option>
        </select>
      </label>

      <label>
        Min MPG:
        <select name="minMpg" value={filters.minMpg} onChange={handleChange}>
          <option value="">Any</option>
          <option value="20">20 MPG+</option>
          <option value="30">30 MPG+</option>
          <option value="40">40 MPG+</option>
        </select>
      </label>
    </div>
  );
}

export default VehicleFilters;
