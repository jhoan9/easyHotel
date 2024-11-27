import React, { useEffect, useState } from 'react';
import { hotelService } from '../../services/hotelService';
import { ReservationFilter } from '../../types/types';

export const ReservationsManager: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationFilter[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      const data = await hotelService.getReservasFiltered();
      setReservations(data);
    }
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    //setReservations(reservations.filter((reservation) => reservation. !== id));
  };

  return (
    <div>
      <h2>Gestión de Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Habitación</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id_reserva}>
              <td>{reservation.nombre_usuario}</td>
              <td>{reservation.numero_habitacion}</td>
              <td>{reservation.fecha_fin_reserva}</td>
              <td>
                <button onClick={() => handleDelete(reservation.id_reserva)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
