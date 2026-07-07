import { useEffect, useState } from "react";
import { Edit2, ImageIcon, Trash2 } from "lucide-react";
import Table from "../../components/common/table";
import lineForm from "./lineForm";
import SubTab from "../../components/common/subTab";
import Pagination from "../../components/common/pagination";
import axios from "axios";
import LineForm from "./lineForm";
import api from "../../hooks/api";

export default function LineList({ isModalOpen, setIsModalOpen }) {
  const [subTab, setSubTab] = useState("lines");
  const [isEdit, setIsEdit] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [stops, setStops] = useState([]);
  const [buses, setBuses] = useState([
    {
      id_bus: 1,
      bus_name: "Bus 1",
      registration: "1234-AB",
      capacity: 50,
      status_bus: "Active",
      image: null,
    },
    {
      id_bus: 2,
      bus_name: "Bus 2",
      registration: "5678-CD",
      capacity: 40,
      status_bus: "Inactive",
      image: null,
    },
  ]);

  const fetchLines = async (page = 1) => {
    const response = await axios.get(`/api/lines?page=${page}&limit=10`);

    setLines(response.data.data);
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
  };

  const getStops = async () => {
    try {
      const response = await api.get("/stops");
      console.log("Réponse de l'API :", response.data.data);
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
      console.log("Réponse de l'API :", response.data.data);
      setBuses(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des bus :", error);
    }
  };

  useEffect(() => {
    getStops();
    // getBuses();
    console.log("Stops fetched:", stops);
  }, []);

  // useEffect(() => {
  //   fetchLines(currentPage);
  // }, [currentPage]);

  const [lines, setLines] = useState([
    {
      id_line: 1,
      line_name: "Ligne 4",
      description: "Trajet direct Université",
      price: 600,
      bus_id: 1,
      route_path: [
        [-21.443, 47.113],
        [-21.451, 47.101],
        [-21.459, 47.089],
      ],
      lineStops: [
        {
          order: 1,
          stop: {
            id_stop: 1,
            name_stop: "Terminus Andrainjato",
            latitude: "-21.4430",
            longitude: "47.1130",
          },
        },
        {
          order: 2,
          stop: {
            id_stop: 2,
            name_stop: "Arrêt Mahazengy",
            latitude: "-21.4510",
            longitude: "47.1010",
          },
        },
        {
          order: 3,
          stop: {
            id_stop: 3,
            name_stop: "Terminus Anjoma",
            latitude: "-21.4590",
            longitude: "47.0890",
          },
        },
      ],
    },
  ]);

  const [lineForm, setLineForm] = useState({
    line_name: "",
    description: "",
    price: "",
    bus_id: "",
    lineStops: [],
    viaPoints: [],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire soumis :", lineForm);

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
              {line.price} Ar
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
