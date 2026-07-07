import { useEffect, useState } from "react";
import { Edit2, ImageIcon, Trash2 } from "lucide-react";
import Table from "../../components/common/table";
import SubTab from "../../components/common/subTab";
import Pagination from "../../components/common/pagination";
import axios from "axios";
import StopForm from "./stopForm";
import api from "../../hooks/api";
import Swal from "sweetalert2";

export default function StopList({ isModalOpen, setIsModalOpen }) {
  const [subTab, setSubTab] = useState("stops");
  const [isEdit, setIsEdit] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   fetchStops(currentPage);
  // }, [currentPage]);

  const [stops, setStops] = useState([]);

  const [stopForm, setStopForm] = useState({
    code_stop: "Axe 1",
    name_stop: "",
    latitude: "",
    longitude: "",
  });
  const [id, setId] = useState(null);

  const fetchStops = async (page = 1) => {
    const response = await axios.get(`/api/stops?page=${page}&limit=10`);

    setStops(response.data.data);
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
  };

  const getStops = async () => {
    try {
      const response = await api.get("/stops");
      console.log("Réponse de l'API :", response.data.data);
      setStops(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des arrêts :", error);
    }
  };

  useEffect(() => {
    getStops();
  }, []);

  const handleUpdateStop = async (id_stop, updatedData) => {
    try {
      const response = await api.put(`/stops/${id_stop}`, updatedData);
      console.log("Réponse de l'API :", response.data);
      getStops();
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "L'arrêt a été mis à jour avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'arrêt :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de la mise à jour de l'arrêt.",
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEdit && id) {
      handleUpdateStop(id, stopForm);
    } else {
      api
        .post("/stops", stopForm)
        .then((response) => {
          getStops();
          setId(null);
          Swal.fire({
            icon: "success",
            title: "Succès",
            text: "L'arrêt a été ajouté avec succès.",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Une erreur est survenue lors de l'ajout de l'arrêt.",
          });
        });
      console.log("Soumission du formulaire :", stopForm);
    }

    setIsModalOpen(false);
    setIsEdit(false);
    setStopForm({ code_stop: "", name_stop: "", latitude: "", longitude: "" });
  };

  const handleDeleteStop = async (id_stop) => {
    try {
      Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Cette action est irréversible !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimer !",
      }).then((result) => {
        if (result.isConfirmed && id_stop) {
          api
            .delete(`/stops/${id_stop}`)
            .then(() => {
              getStops();
              Swal.fire("Supprimé !", "L'arrêt a été supprimé.", "success");
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la suppression de l'arrêt :",
                error,
              );
              Swal.fire(
                "Erreur !",
                "Une erreur est survenue lors de la suppression de l'arrêt.",
                "error",
              );
            });
        }
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'arrêt :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de la suppression de l'arrêt.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Table
        title="Réseau des lignes actives"
        headers={["ID", "Nom de l'Arrêt", "Coordonnées (Lat, Long)", "Action"]}
      >
        {stops.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500">
              Aucun arrêt disponible.
            </td>
          </tr>
        ) : (
          stops.map((stop) => (
            <tr key={stop.id_stop} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-mono font-bold text-xs text-[#3B3B98]">
                #{stop.id_stop}
              </td>
              <td className="px-6 py-4 font-bold">{stop.name_stop}</td>
              <td className="px-6 py-4 font-mono text-xs text-gray-400">
                {stop.latitude}, {stop.longitude}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setStopForm(stop);
                    setId(stop.id_stop);
                  }}
                  className="text-gray-500 p-2 mr-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    handleDeleteStop(stop.id_stop);
                  }}
                  className="text-red-500 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))
        )}
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <StopForm
          stopForm={stopForm}
          setStopForm={setStopForm}
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
        <StopForm
          stopForm={stopForm}
          setStopForm={setStopForm}
          handleFormSubmit={handleFormSubmit}
          isDriverModalOpen={isDriverModalOpen}
          setIsDriverModalOpen={setIsDriverModalOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
