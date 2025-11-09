import React from "react";
import { supabase } from "../supabaseClient"; // adjust path if needed
//import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      alert("Logged out successfully!");
      window.location.href = "/";
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
