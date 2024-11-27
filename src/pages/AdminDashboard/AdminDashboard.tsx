import React, { useState } from 'react';
import './AdminDashboard.css';
import { LoginModal } from '../../components/LoginModal/LoginModal'; // Importar el componente del modal
import { UsersManager } from '../../components/UsersManager/UsersManager';
import { ReservationsManager } from '../../components/ReservationsManager/ReservationsManager';
import { RoomAvailability } from '../../components/RoomAvailability/RoomAvailability';

export const AdminDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(true);  // Controla si el modal está visible
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Mensaje de error
  const [activeTab, setActiveTab] = useState('usuarios');

  // Función para validar el login (para ejemplo, solo validamos valores estáticos)
  const handleLogin = (documento: string, password: string) => {
    // En un caso real, deberías validar estos datos contra tu backend.

    const validDocumento = '999999';
    const validPassword = '1234';

    if (documento === validDocumento && password === validPassword) {
      setIsLoggedIn(true);
      setShowModal(false);
    } else {
      setErrorMessage('Inicio de sesión incorrecto. Los datos no corresponden.');
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'usuarios':
        return <UsersManager />;
      case 'reservas':
        return <ReservationsManager />;
      case 'habitaciones':
        return <RoomAvailability />;
      default:
        return <p>Seleccione una sección</p>;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage('No Data Available');
  };

  return (
    <div className="admin-dashboard">
      {showModal && (
        <LoginModal
          onLogin={handleLogin}
          onClose={handleCloseModal}
          errorMessage={errorMessage}
        />
      )}

      {isLoggedIn ? (
        <div className='admin-container'>
          <nav className="admin-nav">
            <button onClick={() => setActiveTab('usuarios')}>Usuarios</button>
            <button onClick={() => setActiveTab('reservas')}>Reservas</button>
            <button onClick={() => setActiveTab('habitaciones')}>Habitaciones</button>
          </nav>
          <div className="admin-content">
            {renderActiveTab()}
          </div>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};
