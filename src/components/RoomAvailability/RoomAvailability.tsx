import React, { useEffect, useState } from 'react';
import { hotelService } from '../../services/hotelService';
import { HabitacionDetalle } from '../../types/types';
import './RoomAvailability.css'; // Importar archivo CSS

export const RoomAvailability: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availableRooms, setAvailableRooms] = useState<HabitacionDetalle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await hotelService.getHabitacionesDetalle();
      setAvailableRooms(data);
    };

    fetchData();
  }, []);

  const handleCheckAvailability = () => {
    // Aquí puedes filtrar las habitaciones según la lógica real.
    console.log('Checando disponibilidad para:', startDate, endDate);
  };

  return (
    <div className="room-availability-container">
      <h2>Disponibilidad de Habitaciones</h2>
      <div className="date-picker-container">
        <label>Fecha Inicio:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>Fecha Fin:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleCheckAvailability}>Consultar</button>
      </div>
      
      <table className="room-table">
        <thead>
          <tr>
            <th>Habitación</th>
            <th>Número</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Piso</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {availableRooms.map((room) => (
            <tr key={room.id_habitacion}>
              <td>{room.habitacion}</td>
              <td>{room.numero_habitacion}</td>
              <td>{room.precio}</td>
              <td>{room.descripcion}</td>
              <td>{room.piso_habitacion}</td>
              <td>{room.nombre_estado_habitacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
