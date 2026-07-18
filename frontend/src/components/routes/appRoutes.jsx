import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPages from "../../pages/Auth";

import ProtectedRoute from "./protectedRoutes";
import DashboardLayout from "../layouts/dashboardLayout";

import Dashboard from "../../pages/DashboardContent";
import Buses from "../../pages/Buses";
import Drivers from "../../pages/Driver";
import Tickets from "../../pages/Tickets";
import Users from "../../pages/User";
import Tracking from "../../pages/Tracking";
import PublicRoute from "./publicRoutes";

export default function AppRoutes({ user, setUser, setAuth, handleLogout }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PublicRoute user={user} />}>
          <Route
            path="/login"
            element={
              <AuthPages
                onAuthSuccess={(data) => {
                  setUser(data);
                  setAuth(true);
                }}
              />
            }
          />
        </Route>

        <Route element={<ProtectedRoute user={user} />}>
          <Route
            element={
              <DashboardLayout user={user} handleLogout={handleLogout} />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/buses" element={<Buses />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tracking" element={<Tracking />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
