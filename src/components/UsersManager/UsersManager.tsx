// UsersManager.tsx
import React, { useState, useEffect } from 'react';
import { UserModal } from '../UserModal/UserModal';
import { SearchBar } from '../SearchBar/SearchBar';
import { hotelService } from '../../services/hotelService'
import './UsersManager.css';
import { Usuario } from '../../types/types';

export const UsersManager: React.FC = () => {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [editingUser, setEditingUser] = useState<Usuario | null>();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [updateIdUser, setUpdateIdUser] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await hotelService.getUsuarios();
      setUsers(data);
    };
    fetchData();
  }, []);

  const handleAddUser = async (newUser: Usuario) => {
    console.log("  ******" , newUser);
    const addedUser = await hotelService.createUsuario(newUser);
    setUsers([...users, newUser]);
    setShowModal(false);
  };

  const handleUpdateUser = async (updatedUser: Usuario) => {    
    const user = await hotelService.updateUsuario(updateIdUser, updatedUser);
    setShowModal(false);
  };

  const handleEdit = (user: Usuario) => {
    setEditingUser(user);
    setUpdateIdUser(user.id_usuario);
    setShowModal(true);
  };

  const handleAddNewUser = () => {
    setEditingUser(null);  // Asegúrate de restablecer el estado a null al registrar un nuevo usuario
    setShowModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nombre_usuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id_usuario?.toString().includes(searchQuery)
  );

  return (
    <div className="users-manager">
      <h2>Gestión de Usuarios</h2>
      <div className="toolbar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <button onClick={() => handleAddNewUser()} className="add-user-button">
          Registrar Usuario
        </button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id_usuario}>
              <td>{user.nombre_usuario}</td>
              <td>{user.correo_usuario}</td>
              <td>{user.telefono_usuario}</td>
              <td>{user.id_usuario}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="edit-button">
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <UserModal
          onClose={() => setShowModal(false)}
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          user={editingUser}
        />
      )}
    </div>
  );
};
