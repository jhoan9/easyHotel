import React, { useEffect, useState } from 'react';
import './MyReservationsModal.css';
import { hotelService } from '../../services/hotelService';
import { Reservation, Usuario } from '../../types/types';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({ isOpen, onClose }) => {
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si inició sesión correctamente

  
  useEffect(() => {

    const fetchData = async () => {
      const response: Reservation[] = await hotelService.getReservationById(documento);
      if (response.length > 0) {
        setReservas(response);
      } else {
        setErrorMessage('No tienes reservas pendientes.');
      }
    }

    fetchData();
  }, [isOpen])

  const handleSearch = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      // Verificar usuario
      const user: Usuario = await hotelService.getUserById(documento );
      
      if (user) {
        setIsLoggedIn(true); // Indicar que el usuario ha iniciado sesión correctamente

        // Consumir servicio de reservas
        const response: Reservation[] = await hotelService.getReservationById(documento);
        if (response.length > 0) {
          setReservas(response);
        } else {
          setErrorMessage('No tienes reservas pendientes.');
        }
      } else {
        setErrorMessage('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error al buscar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  const getReservationStatus = (reserva: Reservation): string => {
    const today = new Date().toLocaleDateString("es-ES");
    const endDate = reserva.fecha_fin_reserva;
    const startDate = reserva.fecha_inicio_reserva;

    console.log("Today " ,today, " Start date ", startDate, "End date ", endDate);
  
    if (endDate < today) {
      return 'Finalizada';
    } else if (startDate == today && today <= endDate) {
      return 'En curso';
    } else {
      return 'Pendiente';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="my-reservations-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Mis Reservas</h2>

        {/* Mostrar formulario de inicio de sesión si no está logueado */}
        {!isLoggedIn ? (
          <>
            <div className="form-group">
              <label htmlFor="documento">Número de Documento</label>
              <input
                type="text"
                id="documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="search-button" onClick={handleSearch} disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar Reservas'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        ) : (
          // Mostrar reservas si el usuario ha iniciado sesión correctamente
          <div className="reservations-list">
            {reservas.length > 0 ? (
              reservas.map((reserva, index) => (
                <div key={index} className="reservation-item">
                  <p>
                    <strong>Habitación:</strong> {reserva.numero_habitacion}
                  </p>
                  <p>
                    <strong>Fechas:</strong> {reserva.fecha_inicio_reserva} - {reserva.fecha_fin_reserva}
                  </p>
                  <p>
                    <strong>Descripcion:</strong> {reserva.descripcion_habitacion}
                  </p>
                  <p>
                    <strong>Estado:</strong> {getReservationStatus(reserva)}
                  </p>
                </div>
              ))
            ) : (
              <p>No tienes reservas pendientes.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
