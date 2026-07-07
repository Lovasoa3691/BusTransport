import { useEffect, useState } from "react";
import SubmitButton from "../../components/common/submitButton";
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
import "leaflet/dist/leaflet.css";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import RoutePolyline from "../../components/map/routePolyline";
import RouteEditor from "../../components/map/routeEditor";
import StopMarkers from "../../components/map/stopMarkers";
import ViaMarkers from "../../components/map/viaMarkers";

let DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const DEFAULT_CENTER = [-21.4536, 47.0857];

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

export default function LineForm({
  stops,
  buses,
  lineForm,
  setLineForm,
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

  const routePoints = [
    ...lineForm.lineStops.map((ls) => ({
      latitude: parseFloat(ls.stop.latitude),
      longitude: parseFloat(ls.stop.longitude),
    })),
    ...(lineForm.viaPoints || []),
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#19193E] text-white px-6 py-4 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-sm uppercase tracking-wide">
              {!isEdit ? "Nouvelle : Ligne" : "Modification : Ligne"}
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
            className="flex flex-1 overflow-hidden"
          >
            <div className="w-[500px] overflow-y-auto p-6 space-y-4 border-r">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Nom de la Ligne
                </label>
                <input
                  type="text"
                  required
                  value={lineForm.line_name}
                  onChange={(e) =>
                    setLineForm({ ...lineForm, line_name: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="Ex: Ligne 4"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  required
                  value={lineForm.description}
                  onChange={(e) =>
                    setLineForm({
                      ...lineForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="Ex: Andrainjato - Mahazengy - Anjoma"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">
                    Bus assigné
                  </label>
                  <select
                    required
                    value={lineForm.bus_id}
                    onChange={(e) =>
                      setLineForm({ ...lineForm, bus_id: e.target.value })
                    }
                    className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  >
                    <option value="">Choisir un bus...</option>
                    {buses.map((b) => (
                      <option key={b.id_bus} value={b.id_bus}>
                        {b.registration}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">
                    Tarif unique (Ar)
                  </label>
                  <input
                    type="number"
                    required
                    value={lineForm.price}
                    onChange={(e) =>
                      setLineForm({ ...lineForm, price: e.target.value })
                    }
                    className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                    placeholder="600"
                  />
                </div>
              </div>

            
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                <label className="block text-xs font-bold text-[#3B3B98] uppercase">
                  Itinéraire ordonné
                </label>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {lineForm.lineStops.map((ls, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border text-xs"
                    >
                      <span className="font-medium text-gray-700">
                        📌{" "}
                        <span className="font-bold text-gray-400">
                          #{idx + 1}
                        </span>{" "}
                        {ls.stop.name_stop}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setLineForm({
                            ...lineForm,
                            lineStops: lineForm.lineStops.filter(
                              (_, i) => i !== idx,
                            ),
                          })
                        }
                        className="text-red-500 font-bold"
                      >
                        Retirer
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <select
                    id="addStopSelect"
                    defaultValue=""
                    className="flex-1 bg-white p-2 rounded-lg text-xs border outline-none"
                  >
                    <option value="" disabled>
                      Sélectionner un arrêt à insérer...
                    </option>
                    {stops.map((s) => (
                      <option key={s.id_stop} value={s.id_stop}>
                        {s.name_stop}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      console.log(
                        "Selected Stop ID:",
                        document.getElementById("addStopSelect").value,
                      );
                      const sel = document.getElementById("addStopSelect");
                      const selectedStop = stops.find(
                        (s) => s.id_stop === parseInt(sel.value),
                      );
                      if (selectedStop) {
                        setLineForm({
                          ...lineForm,
                          lineStops: [
                            ...lineForm.lineStops,
                            {
                              order: lineForm.lineStops.length + 1,
                              stop: selectedStop,
                              id_stop: selectedStop.id_stop,
                            },
                          ],
                        });
                        sel.value = "";
                      }
                    }}
                    className="bg-[#3B3B98] text-white px-3 py-1 rounded-lg text-xs font-bold"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              <SubmitButton
                label={
                  !isEdit
                    ? "Enregistrer les informations"
                    : "Valider la modification"
                }
              />
            </div>

            
            <div className="flex-1 p-4">
              {lineForm.lineStops.length > 1 && (
                <div className="w-full h-full rounded-xl overflow-hidden border border-gray-200">
                  <MapContainer
                    center={[
                      parseFloat(lineForm.lineStops[0].stop.latitude),
                      parseFloat(lineForm.lineStops[0].stop.longitude),
                    ]}
                    zoom={12}
                    className="h-full w-full"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <RoutePolyline viaPoints={lineForm.viaPoints || []} />

                    <RouteEditor
                      onAddPoint={(point) =>
                        setLineForm((prev) => ({
                          ...prev,
                          viaPoints: [...prev.viaPoints, point],
                        }))
                      }
                    />

                    <StopMarkers lineStops={lineForm.lineStops} />

                    <ViaMarkers
                      viaPoints={lineForm.viaPoints}
                      setLineForm={setLineForm}
                    />
                  </MapContainer>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
