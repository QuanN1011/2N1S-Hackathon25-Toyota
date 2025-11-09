import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCarById } from "../api/cars";

export default function ShowCar(){
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    async function load() {
      try
      {
        const data = await fetchCarById(id);
        setCar(data);
      }
      catch (err)
      {
        console.error(err);
      }
    }
    load();
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>
        {car.year} {car.model}
      </h1>
      <p>MSRP: {car.msrp}</p>
      <p>MPG: {car.mpg}</p>
      <p>Style: {car.style}</p>
    </div>
  );

}
