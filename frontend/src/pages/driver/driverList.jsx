import { useEffect, useState } from "react";
import {
  Edit2,
  Filter,
  ImageIcon,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";
import Table from "../../components/common/table";
import Pagination from "../../components/common/pagination";
import axios from "axios";
import DriverForm from "./driverForm";
import api from "../../hooks/api";
import Swal from "sweetalert2";

export default function DriverList() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [permitFilter, setPermitFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLines = async (page = 1) => {
    const response = await axios.get(`/api/lines?page=${page}&limit=10`);

    setLines(response.data.data);
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
  };

  const getAllDrivers = async () => {
    try {
      const response = await api.get("/drivers");
      console.log("Réponse de l'API :", response.data.data);
      setDrivers(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des arrêts :", error);
    }
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  //   useEffect(() => {
  //     fetchLines(currentPage);
  //   }, [currentPage]);

  const [drivers, setDrivers] = useState([]);

  const [driverForm, setDriverForm] = useState({
    f_name: "",
    l_name: "",
    phone_number: "",
    email: "",
    permit: "",
    age: "",
    experience: "",
    status_driver: "",
    photo: null,
    photoFile: null,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("f_name", driverForm.f_name);
    formData.append("l_name", driverForm.l_name);
    formData.append("phone_number", driverForm.phone_number);
    formData.append("email", driverForm.email);
    formData.append("permit", driverForm.permit);
    formData.append("age", driverForm.age);
    formData.append("experience", driverForm.experience);
    formData.append("status_driver", driverForm.status_driver);

    formData.append("photo", driverForm.photoFile);

    api
      .post("/drivers", formData)
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Succès",
            text: "Chauffeur ajouté avec succès.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: response.data.error || "Erreur ajout chauffeur",
          });
        }
        getAllDrivers();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur ajout chauffeur",
        });
      });

    setIsModalOpen(false);
  };

  const filteredDrivers = drivers.filter((d) => {
    const matchName = `${d.f_name} ${d.l_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchPermit = permitFilter === "" || d.permit === permitFilter;
    return matchName && matchPermit;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un chauffeur par nom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:border-[#3B3B98] focus:bg-white transition-colors"
            />
          </div>
          <div className="w-full sm:w-48 relative">
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <select
              value={permitFilter}
              onChange={(e) => setPermitFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:border-[#3B3B98] focus:bg-white transition-colors appearance-none"
            >
              <option value="">Tous les permis</option>
              <option value="B">Permis B</option>
              <option value="C">Permis C</option>
              <option value="D">Permis D (Bus)</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-[#3B3B98] hover:bg-[#19193E] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors shrink-0"
        >
          <UserPlus size={16} />
          <span>Ajouter un chauffeur</span>
        </button>
      </div>
      <Table
        title="Gestion du personnel de conduite"
        headers={[
          "ID",
          "Conducteur",
          "Contact",
          "Permis / Exp",
          "Statut",
          "Action",
        ]}
      >
        {filteredDrivers.length > 0 ? (
          filteredDrivers.map((driver) => (
            <tr
              key={driver.id_user}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 flex items-center space-x-3">
                {driver.photo ? (
                  <img
                    src={`http://localhost:5000/uploads/${driver.photo}`}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase border text-xs">
                    {driver.f_name[0]}
                    {driver.l_name[0]}
                  </div>
                )}
                <div>
                  <div className="font-bold text-gray-800">
                    {driver.f_name} {driver.l_name}
                  </div>
                  <div className="text-xs text-gray-400">{driver.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 font-mono font-bold text-xs text-[#3B3B98]">
                #{driver.id_user}
              </td>
              <td className="px-6 py-4 text-xs font-medium">
                {driver.phone_number}
              </td>
              <td className="px-6 py-4">
                <div className="text-xs font-bold text-gray-700">
                  Permis {driver.permit}
                </div>
                <div className="text-[11px] text-gray-400">
                  {driver.age} ans • {driver.experience}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                    driver.status_driver === "Libre"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {driver.status_driver}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() =>
                    setDrivers(
                      drivers.filter((d) => d.id_user !== driver.id_user),
                    )
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="6"
              className="text-center py-8 text-gray-400 text-xs italic"
            >
              Aucun chauffeur trouvé.
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
        <DriverForm
          driverForm={driverForm}
          setDriverForm={setDriverForm}
          handleFormSubmit={handleFormSubmit}
          isDriverModalOpen={isDriverModalOpen}
          setIsDriverModalOpen={setIsDriverModalOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isEdit && (
        <DriverForm
          driverForm={driverForm}
          setDriverForm={setDriverForm}
          handleFormSubmit={handleFormSubmit}
          isDriverModalOpen={isDriverModalOpen}
          setIsDriverModalOpen={setIsDriverModalOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
