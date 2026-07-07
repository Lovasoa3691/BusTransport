import { useEffect, useState } from "react";
import api from "../../hooks/api";

export default function DriverModal({
  busForm,
  setBusForm,
  isDriverModalOpen,
  setIsDriverModalOpen,
}) {
  const [driversList, setDriversList] = useState([]);

  const getAllDrivers = async () => {
    try {
      const response = await api.get("/drivers");
      console.log("Réponse de l'API :", response.data.data);
      setDriversList(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des arrêts :", error);
    }
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        {/* Header du Modal */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Choisir un chauffeur
          </h3>
          <button
            onClick={() => setIsDriverModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Liste des chauffeurs */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {driversList.map((driver) => (
            <div
              key={driver.id_user}
              onClick={() => {
                setBusForm({ ...busForm, driver: driver });
                setIsDriverModalOpen(false); // Ferme le modal après sélection
              }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                busForm.driver?.id === driver.id
                  ? "bg-[#3B3B98]/10 border border-[#3B3B98]"
                  : "bg-gray-50 hover:bg-gray-100 border border-transparent"
              }`}
            >
              {/* <img
                src={driver.photo}
                alt={driver.l_name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              /> */}
              <img
                src={`http://localhost:5000/uploads/${driver.photo}`}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {driver.f_name}
                </p>
                <p className="text-xs text-gray-400">Disponible</p>
              </div>
              {busForm.driver?.id_user === driver.id_user && (
                <span className="text-xs font-bold text-[#3B3B98]">
                  Sélectionné
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bouton pour enlever le chauffeur actuel */}
        {busForm.driver && (
          <button
            type="button"
            onClick={() => {
              setBusForm({ ...busForm, driver: null });
              setIsDriverModalOpen(false);
            }}
            className="w-full mt-4 p-2 text-xs text-red-500 font-bold bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Retirer le chauffeur actuel
          </button>
        )}
      </div>
    </div>
  );
}
