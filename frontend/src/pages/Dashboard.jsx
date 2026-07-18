import React, { useState } from "react";
import { Bus, DollarSign, Calendar, TrendingUp, Award } from "lucide-react";
// Importation des composants nécessaires pour le graphique
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardContent({ search = "" }) {
  const [timeFilter, setTimeFilter] = useState("month"); // 'day' ou 'month'
  const [selectedBusFilter, setSelectedBusFilter] = useState("all");

  const workingBuses = [
    {
      id_bus: 1,
      registration: "Scania V8 - 1234-AA",
      capacity: 55,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300",
      status_bus: "Active",
      driver_id: 5,
    },
    {
      id_bus: 2,
      registration: "Mercedes Benz - 5678-TB",
      capacity: 45,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300",
      status_bus: "Active",
      driver_id: 8,
    },
    {
      id_bus: 3,
      registration: "Tata Marcopolo - 9012-AR",
      capacity: 60,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300",
      status_bus: "Active",
      driver_id: 2,
    },
  ];

  // Top chauffeurs les plus actifs
  const topDrivers = [
    {
      id: 1,
      name: "Jean-Noël",
      trips: 142,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
    {
      id: 2,
      name: "Andry M.",
      trips: 128,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      id: 3,
      name: "Rakoto F.",
      trips: 115,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    {
      id: 4,
      name: "Sitraka",
      trips: 98,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
  ];

  // Données du graphique (Revenus mensuels de la société)
  const chartData = [
    { name: "Jan", revenue: 4500000 },
    { name: "Fév", revenue: 5200000 },
    { name: "Mar", revenue: 4900000 },
    { name: "Avr", revenue: 6300000 },
    { name: "Mai", revenue: 5800000 },
    { name: "Juin", revenue: 7100000 },
  ];

  // ================= 3. LOGIQUE DES REVENUS (STATIQUES ET DYNAMIQUES) =================
  const totalRevenueCompany = "33,800,000 Ar"; // Revenu global historique de la société

  const getActiveBuses = () => {
    
  }

  const getDynamicRevenue = () => {
    if (selectedBusFilter !== "all") {
      return timeFilter === "day" ? "85,000 Ar" : "1,950,000 Ar";
    }
    return timeFilter === "day" ? "320,000 Ar" : "7,100,000 Ar";
  };

  // Filtrage de la liste des bus selon la Topbar
  const filteredBuses = workingBuses.filter((bus) =>
    bus.registration.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* ================= BARRE DE FILTRES FINANCIERS ================= */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4 border border-gray-100">
        <div className="flex items-center space-x-2 text-gray-500 text-sm font-semibold">
          <Calendar size={18} className="text-[#3B3B98]" />
          <span>Filtres de recettes :</span>
        </div>

        <div className="flex items-center space-x-4 flex-wrap gap-2">
          {/* Filtre Temporel */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-[#EAEAEA] text-sm text-gray-700 font-medium px-4 py-2 rounded-lg outline-none cursor-pointer border border-transparent focus:border-[#3B3B98]"
          >
            <option value="day">Aujourd'hui (Jour)</option>
            <option value="month">Ce Mois-ci</option>
          </select>

          
          <select
            value={selectedBusFilter}
            onChange={(e) => setSelectedBusFilter(e.target.value)}
            className="bg-[#EAEAEA] text-sm text-gray-700 font-medium px-4 py-2 rounded-lg outline-none cursor-pointer border border-transparent focus:border-[#3B3B98]"
          >
            <option value="all">Tous les Bus</option>
            {workingBuses.map((bus) => (
              <option key={bus.id_bus} value={bus.id_bus}>
                {bus.registration}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center relative overflow-hidden h-32 border-l-4 border-indigo-600">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                  Recette Totale Société
                </p>
                <p className="text-2xl font-black text-gray-800 mt-2">
                  {totalRevenueCompany}
                </p>
              </div>
              <div className="text-indigo-600 bg-indigo-50 p-3 rounded-full">
                <DollarSign size={28} />
              </div>
            </div>

            {/* CARD 2 : Revenu Dynamique (Selon Filtres) */}
            <div className="bg-[#19193E] text-white p-6 rounded-xl shadow-sm flex justify-between items-center relative overflow-hidden h-32">
              <div>
                <p className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                  Recette Filtrée ({timeFilter === "day" ? "Jour" : "Mois"})
                </p>
                <p className="text-2xl font-black text-[#FFC107] mt-2">
                  {getDynamicRevenue()}
                </p>
              </div>
              <div className="text-white bg-white/10 p-3 rounded-full">
                <TrendingUp size={28} />
              </div>
            </div>
          </div>

          {/* GRAPHIQUE DES REVENUS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
              Évolution Précise des Revenus
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis
                    dataKey="name"
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
                  <Tooltip
                    formatter={(value) => [
                      `${value.toLocaleString()} Ar`,
                      "Revenu",
                    ]}
                    contentStyle={{
                      backgroundColor: "#19193E",
                      borderRadius: "8px",
                      color: "#FFF",
                    }}
                  />
                  <Bar dataKey="revenue" fill="#3B3B98" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LISTE DES BUS EN ACTIVITÉ */}
          <div className="bg-[#EAEAEA] rounded-xl shadow-sm overflow-hidden border border-gray-300">
            <div className="bg-[#6F6E84] text-white px-6 py-4 font-bold text-sm tracking-wide flex justify-between items-center">
              <span>List of working Buses</span>
              <span className="text-xs bg-[#19193E] px-2 py-1 rounded-md">
                {filteredBuses.length} En Ligne
              </span>
            </div>

            <div className="p-4 space-y-3">
              {filteredBuses.map((bus) => (
                <div
                  key={bus.id_bus}
                  className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-14 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={bus.image}
                        alt={bus.registration}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-gray-800 text-sm">
                        {bus.registration}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        Capacité : {bus.capacity} places | Chauffeur ID : #
                        {bus.driver_id}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs px-3 py-1 rounded-full font-bold bg-green-100 text-green-700 border border-green-300 uppercase">
                      {bus.status_bus}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-1">
                      ID: #{bus.id_bus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLONNE DROITE (Top Chauffeurs Actifs) */}
        <div className="space-y-6">
          <div className="bg-[#EAEAEA] rounded-xl shadow-sm overflow-hidden border border-gray-300">
            {/* En-tête de la liste latérale */}
            <div className="bg-[#19193E] text-white px-6 py-4 font-bold text-sm tracking-wide flex items-center space-x-2">
              <Award size={18} className="text-[#FFC107]" />
              <span>Top Chauffeurs Plus Actifs</span>
            </div>

            {/* Liste des Chauffeurs */}
            <div className="p-4 space-y-3">
              {topDrivers.map((driver, index) => (
                <div
                  key={driver.id}
                  className="bg-white p-3 rounded-xl flex items-center justify-between shadow-sm hover:translate-x-1 transition-transform"
                >
                  <div className="flex items-center space-x-4">
                    {/* Position d'activité (Médaille ou numéro) */}
                    <span
                      className={`text-xs font-black w-5 text-center ${index === 0 ? "text-amber-500 text-base" : "text-gray-400"}`}
                    >
                      {index + 1}
                    </span>
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">
                        {driver.name}
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        Chauffeur agréé
                      </p>
                    </div>
                  </div>
                  {/* Performance */}
                  <div className="text-right">
                    <span className="text-xs font-black text-[#3B3B98] block">
                      {driver.trips}
                    </span>
                    <span className="text-[10px] text-gray-400">trajets</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Une petite boîte d'information ou mémo additionnelle si nécessaire (Reste blanc) */}
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100 hidden lg:block">
            <p className="text-xs font-bold text-gray-400 uppercase">
              Prochaine Maintenance collective
            </p>
            <p className="text-sm font-black text-red-500 mt-2">Dans 4 jours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
