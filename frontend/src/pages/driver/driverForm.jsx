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
} from "lucide-react";

const allowedPrefixes = ["33", "34", "32", "38"];

const validatePhone = (value) => {
  const prefixValid = allowedPrefixes.some((p) => value.startsWith(p));
  const lengthValid = value.length <= 9;

  return prefixValid && lengthValid;
};

export default function DriverForm({
  driverForm,
  setDriverForm,
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDriverForm({
        ...driverForm,
        photo: URL.createObjectURL(file),
        photoFile: file, 
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          <div className="bg-[#19193E] text-white px-6 py-4 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-sm uppercase tracking-wide">
              Nouveau Chauffeur
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="p-6 space-y-4 overflow-y-auto flex-1"
          >
        
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl border border-gray-150">
              <div className="relative mb-3">
                {driverForm.photo ? (
                  <img
                    src={driverForm.photo}
                    alt="Prévisualisation"
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#3B3B98] shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border border-gray-300">
                    <User size={40} />
                  </div>
                )}
                {driverForm.photo && (
                  <button
                    type="button"
                    onClick={() =>
                      setDriverForm({ ...driverForm, photo: null })
                    }
                    className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    title="Supprimer la photo"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <label className="cursor-pointer bg-white border border-gray-300 hover:border-[#3B3B98] text-gray-700 hover:text-[#3B3B98] px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5">
                <Upload size={14} />
                <span>
                  {driverForm.photo ? "Changer de photo" : "Importer une photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              <p className="text-[10px] text-gray-400 mt-1">
                Format JPG, PNG (Max 2Mo)
              </p>
            </div>

        
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  value={driverForm.f_name}
                  onChange={(e) =>
                    setDriverForm({
                      ...driverForm,
                      f_name: e.target.value.toLowerCase(),
                    })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="Jean"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={driverForm.l_name.toUpperCase()}
                  onChange={(e) =>
                    setDriverForm({
                      ...driverForm,
                      l_name: e.target.value.toLowerCase(),
                    })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="Rakoto"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Téléphone
                </label>

                <div className="flex items-center bg-[#EAEAEA] rounded-lg p-2.5">
                  <span className="text-sm text-gray-600 mr-2">+261</span>

                  <input
                    type="text"
                    required
                    value={driverForm.phone_number}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");

                      if (value.length > 9) return;

                      if (value.length >= 2) {
                        const prefix = value.substring(0, 2);
                        if (!["33", "34", "32", "38"].includes(prefix)) {
                          return;
                        }
                      }

                      setDriverForm({
                        ...driverForm,
                        phone_number: value,
                      });
                    }}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="34 11 222 33"
                  />
                </div>

                {driverForm.phone_number &&
                  driverForm.phone_number.length >= 2 &&
                  !["33", "34", "32", "38"].includes(
                    driverForm.phone_number.substring(0, 2),
                  ) && (
                    <p className="text-red-500 text-xs mt-1">
                      Préfixe invalide (33, 34, 32 ou 38 uniquement)
                    </p>
                  )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={driverForm.email}
                  onChange={(e) =>
                    setDriverForm({ ...driverForm, email: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="jean@gmail.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Permis
                </label>
                <select
                  value={driverForm.permit}
                  onChange={(e) =>
                    setDriverForm({ ...driverForm, permit: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                >
                  <option value="" disabled>
                    -- Sélectionner --
                  </option>
                  <option value="B">Permis B</option>
                  <option value="C">Permis C</option>
                  <option value="D">Permis D</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Âge
                </label>
                <input
                  type="number"
                  required
                  value={driverForm.age}
                  onChange={(e) =>
                    setDriverForm({ ...driverForm, age: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="38"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Expérience
                </label>
                <input
                  type="text"
                  required
                  value={driverForm.experience}
                  onChange={(e) =>
                    setDriverForm({
                      ...driverForm,
                      experience: e.target.value,
                    })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="5 ans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">
                Statut Initial
              </label>
              <select
                value={driverForm.status_driver}
                onChange={(e) =>
                  setDriverForm({
                    ...driverForm,
                    status_driver: e.target.value,
                  })
                }
                className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
              >
                <option value="" disabled>
                  -- Sélectionner --
                </option>
                <option value="Libre">Libre / Disponible</option>
                <option value="En Course">En Course</option>
              </select>
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
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
