import { useEffect, useState } from "react";
import SubmitButton from "../../components/common/submitButton";
import "leaflet/dist/leaflet.css";
import {
  Bus,
  Trash2,
  MapPin,
  Route,
  Plus,
  X,
  Upload,
  ImageIcon,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const DEFAULT_CENTER = [-21.4536, 47.0857];

// ==========================================
// SUB-COMPOSANTS CARTOGRAPHIQUES EXTRAITS
// ==========================================

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat.toFixed(6), e.latlng.lng.toFixed(6));
    },
  });
  return null;
}

function ChangeMapView({ center }) {
  const map = useMap();
  if (
    center &&
    center[0] &&
    center[1] &&
    !isNaN(center[0]) &&
    !isNaN(center[1])
  ) {
    map.setView(center, map.getZoom());
  }
  return null;
}

export default function StopForm({
  stopForm,
  setStopForm,
  handleFormSubmit,
  isDriverModalOpen,
  setIsDriverModalOpen,
  isEdit,
  setIsEdit,
  setIsModalOpen,
}) {
  // useEffect(() => {
  //   console.log(isEdit ? " Modification " : "Enregsitrement");
  // }, [isEdit]);

  const searchCity = (query) => {
    if (!query) return;
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setStopForm((prev) => ({
            ...prev,
            latitude: parseFloat(lat).toFixed(6),
            longitude: parseFloat(lon).toFixed(6),
          }));
        } else {
          alert("Lieu non trouvé !");
        }
      })
      .catch((err) => console.error("Erreur de recherche:", err));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          <div className="bg-[#19193E] text-white px-6 py-4 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-sm uppercase tracking-wide">
              {!isEdit ? "Nouvel arrêt" : "Modification d'un arrêt"}
            </h3>
            <button
              onClick={() =>
                !isEdit ? setIsModalOpen(false) : setIsEdit(false)
              }
              className="hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="p-6 space-y-4 overflow-y-auto flex-1"
          >
            <>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Nom de l'Arrêt
                </label>
                <input
                  type="text"
                  required
                  value={stopForm.name_stop}
                  onChange={(e) =>
                    setStopForm({ ...stopForm, name_stop: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="Ex: Arrêt Pharmacie"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Rechercher une zone
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Mahazengy, Anjoma..."
                    className="flex-1 bg-[#EAEAEA] p-2 rounded-lg text-sm outline-none"
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), searchCity(e.target.value))
                    }
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-500">
                    Position géographique
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      navigator.geolocation.getCurrentPosition((p) =>
                        setStopForm((prev) => ({
                          ...prev,
                          latitude: p.coords.latitude.toFixed(6),
                          longitude: p.coords.longitude.toFixed(6),
                        })),
                      )
                    }
                    className="text-[10px] text-[#3B3B98] font-bold underline"
                  >
                    Ma position
                  </button>
                </div>
                <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 relative z-0">
                  <MapContainer
                    center={
                      stopForm.latitude
                        ? [stopForm.latitude, stopForm.longitude]
                        : DEFAULT_CENTER
                    }
                    zoom={13}
                    className="h-full w-full"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClickHandler
                      onMapClick={(lat, lng) =>
                        setStopForm((prev) => ({
                          ...prev,
                          latitude: lat,
                          longitude: lng,
                        }))
                      }
                    />
                    {stopForm.latitude && (
                      <>
                        <ChangeMapView
                          center={[
                            parseFloat(stopForm.latitude),
                            parseFloat(stopForm.longitude),
                          ]}
                        />
                        <Marker
                          position={[
                            parseFloat(stopForm.latitude),
                            parseFloat(stopForm.longitude),
                          ]}
                        />
                      </>
                    )}
                  </MapContainer>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={stopForm.latitude}
                  placeholder="Latitude"
                  readOnly
                  className="bg-gray-100 p-2 rounded-lg text-sm font-mono outline-none"
                />
                <input
                  type="text"
                  required
                  value={stopForm.longitude}
                  placeholder="Longitude"
                  readOnly
                  className="bg-gray-100 p-2 rounded-lg text-sm font-mono outline-none"
                />
              </div>
            </>

            <SubmitButton
              label={
                !isEdit
                  ? "Enregistrer les informations"
                  : "Valider la modification"
              }
            />
          </form>
        </div>
      </div>
    </>
  );
}
