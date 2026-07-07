import React, { useState } from "react";
import {
  UserPlus,
  Trash2,
  Shield,
  Search,
  Filter,
  X,
  Mail,
  Phone,
  UserCheck,
} from "lucide-react";
import Table from "../../components/common/table";
import Pagination from "../../components/common/pagination";
import axios from "axios";
import UserForm from "./userForm";

export default function UserList() {
  const [isEdit, setIsEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLines = async (page = 1) => {
    const response = await axios.get(`/api/lines?page=${page}&limit=10`);

    setLines(response.data.data);
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
  };

  //   useEffect(() => {
  //     fetchLines(currentPage);
  //   }, [currentPage]);

  const [users, setUsers] = useState([
    {
      id_user: 1,
      f_name: "Tahina",
      l_name: "Andria",
      username: "tahina_admin",
      email: "tahina@transport.mg",
      phone_number: "034 55 666 77",
      role: "Admin",
      status_user: "Actif",
    },
    {
      id_user: 2,
      f_name: "Rova",
      l_name: "Ranaivo",
      username: "rova_ctrl",
      email: "rova.ctrl@gmail.com",
      phone_number: "033 22 111 00",
      role: "Controller",
      status_user: "Actif",
    },
    {
      id_user: 3,
      f_name: "Guillaume",
      l_name: "Razafy",
      username: "guillaume_client",
      email: "guillaume@gmail.com",
      phone_number: "032 88 999 11",
      role: "Customer",
      status_user: "Bloqué",
    },
  ]);

  const [userForm, setUserForm] = useState({
    f_name: "",
    l_name: "",
    username: "",
    email: "",
    phone_number: "",
    role: "Controller",
    password: "",
    status_user: "Actif",
  });

  const handleCreateUser = (e) => {
    e.preventDefault();

  
    const generatedUsername =
      userForm.username ||
      `${userForm.f_name.toLowerCase()}_${userForm.l_name.toLowerCase()}`;

    setUsers([
      ...users,
      {
        id_user: users.length + 1,
        ...userForm,
        username: generatedUsername,
      },
    ]);

   
    setIsModalOpen(false);
    setUserForm({
      f_name: "",
      l_name: "",
      username: "",
      email: "",
      phone_number: "",
      role: "Controller",
      password: "",
      status_user: "Actif",
    });
  };

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id_user === id
          ? {
              ...u,
              status_user: u.status_user === "Actif" ? "Bloqué" : "Actif",
            }
          : u,
      ),
    );
  };

 
  const filteredUsers = users.filter((u) => {
    const matchesSearch = `${u.f_name} ${u.l_name} ${u.username}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });


  const getRoleBadge = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "Controller":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
         
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Nom, prénom ou nom d'utilisateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:border-[#3B3B98] focus:bg-white transition-colors"
            />
          </div>

        
          <div className="w-full sm:w-48 relative">
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:border-[#3B3B98] focus:bg-white transition-colors appearance-none font-medium"
            >
              <option value="">Tous les rôles</option>
              <option value="Admin">Administrateurs</option>
              <option value="Controller">Contrôleurs (Scanners)</option>
              <option value="Customer">Clients / Passagers</option>
            </select>
          </div>
        </div>

      
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-[#3B3B98] hover:bg-[#19193E] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors shrink-0 w-full md:w-auto justify-center"
        >
          <UserPlus size={16} />
          <span>Créer un utilisateur</span>
        </button>
      </div>
      <Table
        title="Contrôle des accès et comptes utilisateurs"
        headers={[
          "Identité / Utilisateur",
          "Rôle",
          "Contacts",
          "Statut",
          "Actions",
        ]}
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <tr
              key={user.id_user}
              className="hover:bg-gray-50 transition-colors"
            >
             
              <td className="px-6 py-4 flex items-center space-x-3">
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase border text-xs">
                  {user.f_name[0]}
                  {user.l_name[0]}
                </div>
                <div>
                  <div className="font-bold text-gray-800">
                    {user.f_name} {user.l_name}
                  </div>
                  <div className="text-xs text-[#3B3B98] font-mono">
                    @{user.username}
                  </div>
                </div>
              </td>

           
              <td className="px-6 py-4">
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${getRoleBadge(user.role)}`}
                >
                  {user.role}
                </span>
              </td>

             
              <td className="px-6 py-4 space-y-0.5">
                <div className="text-xs font-medium text-gray-700 flex items-center">
                  <Mail size={12} className="mr-1 text-gray-400" /> {user.email}
                </div>
                <div className="text-[11px] text-gray-400 flex items-center">
                  <Phone size={12} className="mr-1 text-gray-400" />{" "}
                  {user.phone_number}
                </div>
              </td>

           
              <td className="px-6 py-4">
                <button
                  onClick={() => toggleUserStatus(user.id_user)}
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold transition-all ${
                    user.status_user === "Actif"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                  title="Cliquez pour changer le statut"
                >
                  ● {user.status_user}
                </button>
              </td>

             
              <td className="px-6 py-4">
                <button
                  onClick={() =>
                    setUsers(users.filter((u) => u.id_user !== user.id_user))
                  }
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  title="Supprimer définitivement"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              className="text-center py-8 text-gray-400 text-xs italic"
            >
              Aucun utilisateur trouvé pour ces critères.
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
        <UserForm
          userForm={userForm}
          setUserForm={setUserForm}
          handleCreateUser={handleCreateUser}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isEdit && (
        <UserForm
          userForm={userForm}
          setUserForm={setUserForm}
          handleCreateUser={handleCreateUser}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
