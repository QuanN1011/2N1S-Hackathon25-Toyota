//import { useNavigate } from "react-router-dom";

function VehicleCard({ vehicle }) {
  //const navigate = useNavigate();

  // When clicked, go to the car's detail page
  //const handleClick = () => {
  //  navigate(/showcar?id=${vehicle.id});
  //};

  return (
    <div className="vehicle-card">
      <img
        src={vehicle.imageUrl || "/toyotaLogo.png"}
        alt={vehicle.model}
        className="vehicle-image"
      />
      <div className="vehicle-info">
        <h3>
          {vehicle.year} {vehicle.model}
        </h3>
        <p>
          <strong>MSRP:</strong> ${vehicle.msrp.toLocaleString()}
        </p>
        <p>
          <strong>MPG:</strong> {vehicle.mpgCombined}
        </p>
        <p>
          <strong>Style:</strong> {vehicle.style}
        </p>
        <button className="cta-button small">View Details</button>
      </div>
    </div>
  );
}

export default VehicleCard;
