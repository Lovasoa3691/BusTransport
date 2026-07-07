import { Outlet } from "react-router-dom";

import Topbar from "../Topbar";
import Navbar from "../Navbar";

export default function DashboardLayout({ user }) {
  return (
    <div className="min-h-screen bg-[#D9D9D9]">
      <Topbar user={user} />

      <Navbar />

      <main className="max-w-9xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
