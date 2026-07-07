import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import DashboardContent from "../pages/DashboardContent"; 
import BusesContent from "../pages/Buses"; 
import DriverContent from "../pages/Driver"; 
import TicketsContent from "../pages/Tickets"; 
import UsersContent from "../pages/User"; 
import TrackingContent from "../pages/Tracking"; 
import api from "../hooks/api";

export default function HomeContent({ user }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");


  const handleLogout = () => {
    api
      .post("/auth/logout")
      .then(() => {
        console.log("Déconnexion réussie");
        // onLogout(); // Appel de la fonction onLogout passée en prop
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  return (
    <div className="min-h-screen bg-[#D9D9D9] font-sans antialiased text-gray-800">
      <Topbar
        user={user}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        // handleLogout={handleLogout}
      />

      <Navbar
        currentMenu={activeMenu}
        onMenuChange={(menuId) => setActiveMenu(menuId)}
      />

      <main className="max-w-9xl mx-auto px-6 py-8">
        {activeMenu === "dashboard" && (
          <DashboardContent search={searchQuery} />
        )}
        {activeMenu === "buses" && <BusesContent search={searchQuery} />}
        {activeMenu === "driver" && (
          <div className="p-6 bg-white rounded-xl">
            <DriverContent />
          </div>
        )}
        {activeMenu === "tickets" && (
          <div className="p-6 bg-white rounded-xl">
            <TicketsContent />
          </div>
        )}
        {activeMenu === "users" && (
          <div className="p-6 bg-white rounded-xl">
            <UsersContent />
          </div>
        )}
        {activeMenu === "tracking" && (
          <div className="p-6 bg-white rounded-xl">
            <TrackingContent />
          </div>
        )}
      </main>
    </div>
  );
}
