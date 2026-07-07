import { useEffect, useState } from "react";
import { Bus, Edit2, ImageIcon, ImagesIcon, User } from "lucide-react";
import Table from "../../components/common/table";
import BusForm from "./busForm";
import SubTab from "../../components/common/subTab";
import DriverModal from "./driverModal";
import Pagination from "../../components/common/pagination";
import axios from "axios";
import api from "../../hooks/api";
import Swal from "sweetalert2";

export default function BusList({ isModalOpen, setIsModalOpen }) {
  const [subTab, setSubTab] = useState("buses");
  const [isEdit, setIsEdit] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBuses = async (page = 1) => {
    const response = await axios.get(`/api/buses?page=${page}&limit=10`);

    setBuses(response.data.data);
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
  };

  //   useEffect(() => {
  //     fetchBuses(currentPage);
  //   }, [currentPage]);

  const [buses, setBuses] = useState([]);
  const [busForm, setBusForm] = useState({
    driver: null,
    registration: "",
    modele: "",
    capacity: 0,
    status_bus: "",
    image: null,
    photo: null,
  });

  const getAllBuses = async () => {
    try {
      const response = await api.get("/buses");
      const res = response.data.data;
      setBuses(res);
      console.log("Réponse de l'API :", res);
      setBuses(res);
    } catch (error) {
      console.error("Erreur lors de la récupération des arrêts :", error);
    }
  };

  useEffect(() => {
    getAllBuses();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("driver_id", busForm.driver?.id_user || "");
    formData.append("registration", busForm.registration);
    formData.append("capacity", busForm.capacity);
    formData.append("status_bus", busForm.status_bus);
    formData.append("modele", busForm.modele);

    formData.append("photo", busForm.photo);

    api
      .post("/bus/create", formData)
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Succès",
            text: "Bus enregistré avec succès.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: response.data.error,
          });
        }
        getAllBuses();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: error.response?.data?.error || "Erreur enregistrement du bus",
        });
      });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Table
        title="Flotte des Bus enregistrés"
        headers={["#", "Bus", "Chauffeur", "Capacité", "Statut", "Action"]}
      >
        {buses.length > 0 ? (
          buses.map((bus, index) => (
            <tr
              key={bus.id_bus}
              className="hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <td className="px-6 py-5 text-gray-700 font-medium">
                {index + 1}
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  {bus.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${bus.image}`}
                      alt={bus.modele}
                      className="w-24 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-16 rounded-lg border border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                      <ImagesIcon size={24} className="text-gray-400" />
                    </div>
                  )}

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Bus size={18} className="text-indigo-600" />
                      <span className="font-semibold text-gray-800">
                        {bus.modele}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500 mt-1">
                      Immatriculation
                    </span>

                    <span className="inline-flex w-fit mt-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-md font-semibold">
                      {bus.registration}
                    </span>
                  </div>
                </div>
              </td>

              {bus.driver ? (
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    {bus.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${bus.driver.photo}`}
                        alt={bus.driver.l_name}
                        className="w-24 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-24 h-16 rounded-lg border border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                        <ImagesIcon size={24} className="text-gray-400" />
                      </div>
                    )}

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {bus.driver.l_name.toUpperCase()}
                        </span>
                      </div>

                      <span className="text-xs text-gray-500 mt-1">
                        {bus.driver.f_name[0].toUpperCase() +
                          bus.driver.f_name.slice(1)}
                      </span>
                    </div>
                  </div>
                </td>
              ) : (
                <td className="px-6 py-5">-- Non assigné --</td>
              )}

              <td className="px-6 py-5">
                <span className="font-medium text-gray-700">
                  {bus.capacity} places
                </span>
              </td>

              <td className="px-6 py-5">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    bus.status_bus === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {bus.status_bus}
                </span>
              </td>

              <td className="px-6 py-5">
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setBusForm(bus);
                  }}
                  className="w-10 h-10 rounded-full border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 transition flex items-center justify-center cursor-pointer"
                >
                  <Edit2 size={18} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center py-10 text-gray-400 italic">
              Aucun bus enregistré.
            </td>
          </tr>
        )}
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <BusForm
          busForm={busForm}
          setBusForm={setBusForm}
          handleFormSubmit={handleFormSubmit}
          isDriverModalOpen={isDriverModalOpen}
          setIsDriverModalOpen={setIsDriverModalOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isEdit && (
        <BusForm
          busForm={busForm}
          setBusForm={setBusForm}
          handleFormSubmit={handleFormSubmit}
          isDriverModalOpen={isDriverModalOpen}
          setIsDriverModalOpen={setIsDriverModalOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isDriverModalOpen && (
        <DriverModal
          busForm={busForm}
          setBusForm={setBusForm}
          isDriverModalOpen={isDriverModalOpen}
          setIsDriverModalOpen={setIsDriverModalOpen}
        />
      )}
    </div>
  );
}
