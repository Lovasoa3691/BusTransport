import { useEffect, useState } from "react";
import { Edit2, ImageIcon, Trash2 } from "lucide-react";
import Table from "../../components/common/table";
import lineForm from "./lineForm";
import SubTab from "../../components/common/subTab";
import Pagination from "../../components/common/pagination";
import axios from "axios";
import LineForm from "./lineForm";
import api from "../../hooks/api";
import Swal from "sweetalert2";

export default function LineList({ isModalOpen, setIsModalOpen }) {
  const [subTab, setSubTab] = useState("lines");
  const [isEdit, setIsEdit] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [stops, setStops] = useState([]);
  const [buses, setBuses] = useState([]);

  const fetchLines = async (page = 1) => {
    const response = await axios.get(`/api/lines?page=${page}&limit=10`);

    setLines(response.data.data);
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
  };

  const getStops = async () => {
    try {
      const response = await api.get("/stops");
      if (response.data && response.data.data) {
        setStops(response.data.data);
      } else {
        console.error("Données inattendues de l'API :", response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des arrêts :", error);
    }
  };

  const getBuses = async () => {
    try {
      const response = await api.get("/buses");
      setBuses(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des bus :", error);
    }
  };

  const getAllLines = async () => {
    try {
      const response = await api.get("/lines");
      if (response.data.success) {
        setLines(response.data.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: response.data.error,
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des lignes du bus :",
        error,
      );
    }
  };

  useEffect(() => {
    getStops();
    getBuses();
    getAllLines();
  }, []);

  // useEffect(() => {
  //   fetchLines(currentPage);
  // }, [currentPage]);

  const [lines, setLines] = useState([
    // {
    //   id_line: 1,
    //   line_name: "Ligne 1",
    //   description: "Trajet direct Université",
    //   price: 600,
    //   bus_id: 1,
    //   route_path: [
    //     [-21.443, 47.113],
    //     [-21.451, 47.101],
    //     [-21.459, 47.089],
    //   ],
    //   lineStops: [
    //     {
    //       order: 1,
    //       stop: {
    //         id_stop: 1,
    //         name_stop: "Terminus Andrainjato",
    //         latitude: "-21.4430",
    //         longitude: "47.1130",
    //       },
    //     },
    //     {
    //       order: 2,
    //       stop: {
    //         id_stop: 2,
    //         name_stop: "Arrêt Mahazengy",
    //         latitude: "-21.4510",
    //         longitude: "47.1010",
    //       },
    //     },
    //     {
    //       order: 3,
    //       stop: {
    //         id_stop: 3,
    //         name_stop: "Terminus Anjoma",
    //         latitude: "-21.4590",
    //         longitude: "47.0890",
    //       },
    //     },
    //   ],
    // },
  ]);

  const [lineForm, setLineForm] = useState({
    line_name: "",
    description: "",
    price: "",
    bus_id: "",
    lineStops: [],
    viaPoints: [],
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Data Retrieve: ", lineForm);

    api
      .post("/lines", lineForm)
      .then((response) => {
        if (response.data.success) {
          console.log("Reponse: ", response.data);
          Swal.fire({
            icon: "success",
            title: "Succès",
            text: response.data.message || "Lignes enregistrés avec succès.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: response.data.error,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text:
            error.message ||
            "Une erreur est survenue lors de la génération des tickets.",
        });
      });

    setLineForm({
      line_name: "",
      description: "",
      price: "",
      bus_id: "",
      lineStops: [],
      viaPoints: [],
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Table
        title="Réseau des lignes actives"
        headers={[
          "ID",
          "Ligne",
          "Description",
          "Nombre d'arrêts",
          "Tarif",
          "Action",
        ]}
      >
        {lines.map((line) => (
          <tr key={line.id_line} className="hover:bg-gray-50">
            <td className="px-6 py-4 font-mono font-bold text-xs text-[#3B3B98]">
              #{line.id_line}
            </td>
            <td className="px-6 py-4 font-bold">{line.line_name}</td>
            <td className="px-6 py-4 text-gray-500 text-xs">
              {line.description}
            </td>
            <td className="px-6 py-4 font-medium text-gray-700">
              {line.lineStops?.length || 0} arrêts
            </td>
            <td className="px-6 py-4 font-bold text-gray-800">
              {line.price.toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              Ar
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => {
                  setIsEdit(true);
                  setLineForm(line);
                }}
                className="text-gray-500 p-2 mr-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                // onClick={() =>
                //   setLines(lines.filter((l) => l.id_line !== line.id_line))
                // }
                className="text-red-500 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <LineForm
          stops={stops}
          buses={buses}
          lineForm={lineForm}
          setLineForm={setLineForm}
          handleFormSubmit={handleFormSubmit}
          isDriverModalOpen={isDriverModalOpen}
          setIsDriverModalOpen={setIsDriverModalOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isEdit && (
        <LineForm
          stops={stops.filter((stop) =>
            lineForm.lineStops.some((ls) => ls.stop.id_stop === stop.id_stop),
          )}
          buses={buses}
          lineForm={lineForm}
          setLineForm={setLineForm}
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
