import { Bus, MapPin, Plus, Route } from "lucide-react";

export default function SubTab({ subTab, setSubTab, setIsModalOpen }) {
  const tabs = [
    {
      key: "buses",
      label: "Bus",
      icon: Bus,
    },
    {
      key: "lines",
      label: "Lignes",
      icon: Route,
    },
    {
      key: "stops",
      label: "Arrêts",
      icon: MapPin,
    },
  ];
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
      <div className="flex space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${tab.key === subTab ? "bg-[#9A3F3F] text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
              key={tab.key}
              onClick={() => setSubTab(tab.key)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="flex items-center space-x-2 bg-[#9A3F3F] hover:bg-[#19193E] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors"
      >
        <Plus size={16} />
        <span>
          Ajouter{" "}
          {subTab === "buses"
            ? "un bus"
            : subTab === "lines"
              ? "une ligne"
              : "un arrêt"}
        </span>
      </button>
    </div>
  );
}
