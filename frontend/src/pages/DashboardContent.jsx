import React, { useEffect, useState } from "react";
import { Bus, DollarSign, Calendar, TrendingUp, Award } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { AreaChart } from "recharts";
import api from "../hooks/api";

export default function DashboardContent({ search = "" }) {
  const [timeFilter, setTimeFilter] = useState("month");
  const [selectedBusFilter, setSelectedBusFilter] = useState("all");
  const [amountTotal, setAmountTotal] = useState(null);
  const [amountTotalBus, setAmountTotalBus] = useState(null);

  const [workingbus, setWorkingBus] = useState([]);

  const topDrivers = [
    {
      id: 1,
      name: "Jean-Noël",
      trips: 142,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
  ];

  const chartData = [
    { name: "Jan", revenue: 4500000 },
    { name: "Fév", revenue: 5200000 },
    { name: "Mar", revenue: 4900000 },
    { name: "Avr", revenue: 6300000 },
    { name: "Mai", revenue: 5800000 },
    { name: "Juin", revenue: 7100000 },
  ];

  const getActiveBuses = async () => {
    try {
      const response = await api.get("/buses");
      console.log("Buses: ", response.data.data);
      setWorkingBus(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des arrêts :", error);
    }
  };

  const getAmountTotal = async () => {
    try {
      const response = await api.get("/income");
      const sum = response.data.data._sum;
      setAmountTotal(sum.amount);
    } catch (error) {
      console.error("Erreur lors de la récupération des arrêts :", error);
    }
  };

  const filterAmountByBus = async () => {
    console.log(selectedBusFilter);
    try {
      const response = await api.get("/income/", selectedBusFilter);
      const sum = response.data.data._sum;
      setAmountTotalBus(sum.amount);
    } catch (error) {
      console.error("Erreur lors de la récupération des arrêts :", error);
    }
  };

  const filteredAciveBuses = workingbus.filter(
    (item) => item.status_bus === "Active",
  );

  useEffect(() => {
    getActiveBuses();
    getAmountTotal();
  }, []);

  useEffect(() => {
    filterAmountByBus();
  }, [selectedBusFilter]);

  const totalRevenueCompany = "33,800,000 Ar";

  const getDynamicRevenue = () => {
    if (selectedBusFilter !== "all") {
      return timeFilter === "day" ? "85,000 Ar" : "1,950,000 Ar";
    }
    return timeFilter === "day" ? "320,000 Ar" : "7,100,000 Ar";
  };

  const filteredBuses = workingbus.filter((bus) =>
    bus.registration.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4 border border-gray-100">
        <div className="flex items-center space-x-2 text-gray-500 text-sm font-semibold">
          <Calendar size={18} className="text-[#5E0006]" />
          <span>Filtres de recettes :</span>
        </div>

        <div className="flex items-center space-x-4 flex-wrap gap-2">
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
            {workingbus.map((bus) => (
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
            <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center relative overflow-hidden h-32 border-l-4 border-b-orange-900">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                  Recette Totale
                </p>
                <p className="text-2xl font-black text-gray-800 mt-2">
                  {amountTotal || "0,00"} Ar
                </p>
              </div>
              <div className="text-[#5E0006] bg-indigo-50 p-3 rounded-full">
                <DollarSign size={28} />
              </div>
            </div>

            <div className="bg-[#043915] text-white p-6 rounded-xl shadow-sm flex justify-between items-center relative overflow-hidden h-32">
              <div>
                <p className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                  Recette Filtrée ({timeFilter === "day" ? "Jour" : "Mois"})
                </p>
                <p className="text-2xl font-black text-[#FFC107] mt-2">
                  {amountTotalBus || "0,00"} Ar
                </p>
              </div>
              <div className="text-white bg-white/10 p-3 rounded-full">
                <TrendingUp size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
              Évolution des Revenus
            </h3>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#4F46E5"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="#4F46E5"
                        stopOpacity={0.03}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" />

                  <XAxis
                    dataKey="name"
                    stroke="#9CA3AF"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    stroke="#9CA3AF"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${value.toLocaleString()} Ar`,
                      "Revenu",
                    ]}
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      background: "#111827",
                      color: "#fff",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    dot={{
                      r: 4,
                      fill: "#4F46E5",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#4F46E5",
                      stroke: "#fff",
                      strokeWidth: 3,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#EAEAEA] rounded-xl shadow-sm overflow-hidden border border-gray-300">
            <div className="bg-[#4d7c65] text-white px-6 py-4 font-bold text-sm tracking-wide flex justify-between items-center">
              <span>Liste des bus en activité</span>
              <span className="text-xs bg-[#19193E] px-2 py-1 rounded-md">
                {filteredAciveBuses.length} En Ligne
              </span>
            </div>

            <div className="p-4 space-y-3">
              {filteredAciveBuses.map((bus) => (
                <div
                  key={bus.id_bus}
                  className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-14 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={`http://localhost:5000/uploads/${bus.image}`}
                        alt={bus.registration}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-gray-800 text-sm">
                        {bus.registration}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        Capacité : {bus.capacity} places
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

        <div className="space-y-6">
          <div className="bg-[#EAEAEA] rounded-xl shadow-sm overflow-hidden border border-gray-300">
            <div className="bg-[#4d7c65] text-white px-6 py-4 font-bold text-sm tracking-wide flex items-center space-x-2">
              <Award size={18} className="text-[#FFC107]" />
              <span>Top Chauffeurs Plus Actifs</span>
            </div>

            <div className="p-4 space-y-3">
              {topDrivers.map((driver, index) => (
                <div
                  key={driver.id}
                  className="bg-white p-3 rounded-xl flex items-center justify-between shadow-sm hover:translate-x-1 transition-transform"
                >
                  <div className="flex items-center space-x-4">
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
                  <div className="text-right">
                    <span className="text-xs font-black text-[#FFC107] block">
                      {driver.trips}
                    </span>
                    <span className="text-[10px] text-gray-400">tickets</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
