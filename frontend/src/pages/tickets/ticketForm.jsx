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
  User,
  Ticket,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Polyline,
} from "react-leaflet";

export default function TicketForm({
  stops,
  ticketForm,
  setTicketForm,
  handleGenerateTickets,
  isEdit,
  setIsEdit,
  setIsModalOpen,
}) {
  // useEffect(() => {
  //   console.log(isEdit ? " Modification " : "Enregsitrement");
  // }, [isEdit]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 print:hidden">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
          <div className="bg-[#19193E] text-white px-6 py-4 flex justify-between items-center">
            <h3 className="font-bold text-sm uppercase tracking-wide flex items-center space-x-2">
              <Ticket size={16} />
              <span>Générer des lots de tickets</span>
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleGenerateTickets} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                Arrêt de montée associé
              </label>
              <select
                required
                value={ticketForm.id_stop}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, id_stop: e.target.value })
                }
                className="w-full bg-[#EAEAEA] p-3 rounded-lg text-sm outline-none font-medium focus:border-[#3B3B98]"
              >
                <option value="" disabled>
                  -- Sélectionner l'arrêt --
                </option>
                {stops.map((s) => (
                  <option key={s.id_stop} value={s.id_stop}>
                    {s.name_stop}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                Nombre à générer
              </label>
              <input
                type="number"
                required
                min="1"
                max="2000"
                value={ticketForm.quantity}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, quantity: e.target.value })
                }
                className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none font-mono focus:border-[#3B3B98]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                Prix unitaire (en Ariary)
              </label>
              <input
                type="number"
                required
                min="100"
                max="700"
                value={ticketForm.price}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, price: e.target.value })
                }
                className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none font-mono focus:border-[#3B3B98]"
              />
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-1/2 bg-gray-100 text-gray-600 text-sm font-bold py-2.5 rounded-lg"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="w-1/2 bg-[#3B3B98] text-white text-sm font-bold py-2.5 rounded-lg shadow-sm"
              >
                Générer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
