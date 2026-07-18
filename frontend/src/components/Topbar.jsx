import React from "react";
import { Bell, LogOut } from "lucide-react"; // Ajout de l'icône LogOut
import SearchBar from "./SearchBar";
import UserProfile from "./Userprofile";
import api from "../hooks/api";

export default function Topbar({ onSearchChange, user, handleLogout }) {
  return (
    <header className="bg-[#31694E] text-white px-6 py-3 flex items-center justify-between shadow-md">
      <div className="font-bold text-lg tracking-wider cursor-pointer">
        LOGO
      </div>

      <SearchBar placeholder="Hinted search text" onChange={onSearchChange} />

      <div className="flex items-center space-x-6">
        <button className="relative hover:text-gray-300 transition p-1">
          <Bell size={22} />

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <UserProfile user={user} handleLogout={handleLogout} />
      </div>
    </header>
  );
}
