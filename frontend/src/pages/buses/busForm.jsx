import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import SubmitButton from "../../components/common/submitButton";

export default function BusForm({
  busForm,
  setBusForm,
  handleFormSubmit,
  isDriverModalOpen,
  setIsDriverModalOpen,
  isEdit,
  setIsEdit,
  setIsModalOpen,
}) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusForm({
        ...busForm,
        image: URL.createObjectURL(file),
        photo: file,
      });
    }
  };

  // useEffect(() => {
  //   console.log(isEdit ? " Modification " : "Enregsitrement");
  // }, [isEdit]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          <div className="bg-[#19193E] text-white px-6 py-4 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-sm uppercase tracking-wide">
              {!isEdit ? "Nouveau : Bus" : "Modification : Bus"}
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Immatriculation
                </label>
                <input
                  type="text"
                  required
                  value={busForm.registration}
                  onChange={(e) =>
                    setBusForm({ ...busForm, registration: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="Ex: Scania V8"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Modele
                </label>
                <input
                  type="text"
                  required
                  value={busForm.modele}
                  onChange={(e) =>
                    setBusForm({ ...busForm, modele: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="Ex: Scania V8"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Nombre de places
                </label>
                <input
                  type="number"
                  required
                  value={busForm.capacity}
                  onChange={(e) =>
                    setBusForm({ ...busForm, capacity: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                  placeholder="Places"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Statut
                </label>
                <select
                  value={busForm.status_bus}
                  onChange={(e) =>
                    setBusForm({ ...busForm, status_bus: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none"
                >
                  <option value="" disabled>
                    -- Sélectionner --
                  </option>
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">
                Chauffeur assigné
              </label>
              <div
                onClick={() => setIsDriverModalOpen(true)}
                className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {busForm.driver ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={`http://localhost:5000/uploads/${busForm.driver.photo}`}
                      alt={busForm.driver.l_name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {busForm.driver.l_name} {busForm.driver.f_name}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400">
                    Aucun chauffeur assigné (Cliquer pour choisir)
                  </span>
                )}
                <span className="text-xs text-[#3B3B98] font-bold">
                  {busForm.driver ? "Changer" : "Assigner"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">
                Photo du Bus
              </label>
              <div className="relative mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors">
                {busForm.image ? (
                  <div className="text-center z-10">
                    <img
                      src={
                        isEdit
                          ? `http://localhost:5000/uploads/${busForm.image}`
                          : busForm.image
                      }
                      alt={`http://localhost:5000/uploads/${busForm.image}`}
                      className="max-h-24 mx-auto rounded-lg mb-2 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setBusForm({ ...busForm, image: null })}
                      className="text-xs text-red-500 font-bold relative z-20"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 text-center cursor-pointer">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="text-xs font-semibold text-[#3B3B98]">
                      Importer un fichier
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="bus-upload"
                    />
                    <label
                      htmlFor="bus-upload"
                      className="absolute inset-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

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
