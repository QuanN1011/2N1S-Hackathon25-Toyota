
export default function VehicleCard({ car, selected, onToggleSelect }) {
  return (
    <div
      style={{border: selected ? "2px solid #2563eb" : "1px solid #ddd",
        borderRadius: "8px", padding: "0.75rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>
          {car.year} {car.model}
        </h3>
        <input
        type="checkbox"
        checked={selected}
        onChange={onToggleSelect}
        title="Select for comparison"
        />
      </div>
      <p>MSRP: {car.msrp}</p>
      <p>MPG: {car.mpg}</p>
      <p>Style: {car.style}</p>
    </div>
  );
}
