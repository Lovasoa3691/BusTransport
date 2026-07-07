import { useEffect, useState } from "react";
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
  UserCheck,
} from "lucide-react";

export default function UserForm({
  userForm,
  setUserForm,
  handleCreateUser,
  isEdit,
  setIsEdit,
  setIsModalOpen,
}) {
  // useEffect(() => {
  //   console.log(isEdit ? " Modification " : "Enregsitrement");
  // }, [isEdit]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
          <div className="bg-[#19193E] text-white px-6 py-4 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-sm uppercase tracking-wide flex items-center space-x-2">
              <UserCheck size={18} />
              <span>Créer un nouvel accès</span>
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

        
          <form
            onSubmit={handleCreateUser}
            className="p-6 space-y-4 overflow-y-auto flex-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  value={userForm.f_name}
                  onChange={(e) =>
                    setUserForm({ ...userForm, f_name: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98] transition-all"
                  placeholder="Ex: Rova"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={userForm.l_name}
                  onChange={(e) =>
                    setUserForm({ ...userForm, l_name: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98] transition-all"
                  placeholder="Ex: Ranaivo"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">
                Nom d'utilisateur (Optionnel)
              </label>
              <input
                type="text"
                value={userForm.username}
                onChange={(e) =>
                  setUserForm({ ...userForm, username: e.target.value })
                }
                className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm font-mono outline-none focus:bg-white border border-transparent focus:border-[#3B3B98] transition-all"
                placeholder="Ex: rova_ctrl (Sera auto-généré si vide)"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Téléphone
                </label>
                <input
                  type="text"
                  required
                  value={userForm.phone_number}
                  onChange={(e) =>
                    setUserForm({ ...userForm, phone_number: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98] transition-all"
                  placeholder="034 00 000 00"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98] transition-all"
                  placeholder="exemple@transport.mg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Rôle Système
                </label>
                <select
                  value={userForm.role}
                  onChange={(e) =>
                    setUserForm({ ...userForm, role: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm font-medium outline-none"
                >
                  <option value="Controller">
                    Controller (Application Scanner)
                  </option>
                  <option value="Admin">Admin (Dashboard Web)</option>
                  <option value="Customer">
                    Customer (Application Mobile Client)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Mot de passe initial
                </label>
                <input
                  type="password"
                  required
                  value={userForm.password}
                  onChange={(e) =>
                    setUserForm({ ...userForm, password: e.target.value })
                  }
                  className="w-full bg-[#EAEAEA] p-2.5 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

           
            <div className="flex space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-1/2 bg-gray-100 text-gray-600 text-sm font-bold py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="w-1/2 bg-[#3B3B98] text-white text-sm font-bold py-2.5 rounded-lg shadow-sm hover:bg-[#19193E] transition-colors"
              >
                Créer le compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
