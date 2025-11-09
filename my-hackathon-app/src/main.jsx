// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AllVehicles from "./pages/AllVehicles.jsx";
import CompareCar from "./pages/CompareCar.jsx";
import Help from "./pages/Help.jsx";
import ShowCar from "./pages/ShowCar.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allvehicles" element={<AllVehicles />} />
        <Route path="/comparecar" element={<CompareCar />} />
        <Route path="/help" element={<Help />} />
        {/* 👇 NO :id here anymore */}
        <Route path="/showcar" element={<ShowCar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
