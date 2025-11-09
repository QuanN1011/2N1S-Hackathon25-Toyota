function CompareTable({ vehicles }) {
  // If nothing selected yet, show a helper message
  if (!vehicles || vehicles.length === 0) {
    return <p>Select vehicles to compare.</p>;
  }

  return (
    <div className="compare-table-wrapper">
      <table className="compare-table">
        <thead>
          <tr>
            {/* First column is the spec name */}
            <th>Spec</th>
            {/* One column per vehicle */}
            {vehicles.map((v) => (
              <th key={v.id}>
                {/* Show year + model in header for clarity */}
                {v.year} {v.model}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Year */}
          <tr>
            <td>Year</td>
            {vehicles.map((v) => (
              <td key={v.id}>{v.year}</td>
            ))}
          </tr>

          {/* Model */}
          <tr>
            <td>Model</td>
            {vehicles.map((v) => (
              <td key={v.id}>{v.model}</td>
            ))}
          </tr>

          {/* MSRP */}
          <tr>
            <td>MSRP</td>
            {vehicles.map((v) => (
              <td key={v.id}>
                {v.msrp ? `$${v.msrp.toLocaleString()}` : v.msrpText || "—"}
              </td>
            ))}
          </tr>

          {/* MPG */}
          <tr>
            <td>MPG</td>
            {vehicles.map((v) => (
              <td key={v.id}>
                {v.mpgCombined
                  ? `${v.mpgCombined} combined`
                  : v.mpgCity && v.mpgHighway
                  ? `${v.mpgCity} / ${v.mpgHighway} (city/hwy)`
                  : "—"}
              </td>
            ))}
          </tr>

          {/* Style */}
          <tr>
            <td>Style</td>
            {vehicles.map((v) => (
              <td key={v.id}>{v.style || v.bodyStyle || "—"}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CompareTable;
