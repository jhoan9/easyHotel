import React, { useState, useEffect } from 'react'
import { FloorFilter } from '../../components/FloorFilter/FloorFilters'
import { Calendar } from '../../components/Calendar/Calendar'
import { RoomCard } from '../../components/RoomCard/RoomCard'
import { ReservationModal } from '../../components/Modal/ReservationModal'
import { MyReservationsModal } from '../../components/MyReservationsModal/MyReservationsModal'
import { hotelService } from '../../services/hotelService'
import { Habitacion, Floor, CreateReservation, Usuario } from '../../types/types'
import './Dashboard.css'

// Nuevo componente para "Mis Reservas"

export const Dashboard: React.FC = () => {
  const [rooms, setRooms] = useState<Habitacion[]>([])
  const [reservations, setReservations] = useState<Habitacion[]>([])
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date())
  const [selectedRoom, setSelectedRoom] = useState<Habitacion | null>(null)
  const [floor, setFloor] = useState<Floor[]>([]);
  const [roomDisabled, setRoomDisabled] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMyReservationsModalOpen, setIsMyReservationsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseMyReservationsModal = () => setIsMyReservationsModalOpen(false);

  useEffect(() => {
    setRoomDisabled(!areDatesSelected());
  }, [selectedStartDate, selectedEndDate])

  const areDatesSelected = (): boolean => {
    return selectedStartDate !== null && selectedEndDate !== null && selectedStartDate < selectedEndDate;
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const [roomsData] = await Promise.all([
        hotelService.getHabitaciones(),
        hotelService.getReservations(),
      ])

      const rooms: Habitacion[] = roomsData.filter((room, index, self) =>
        index === self.findIndex((t) => t.id_habitacion === room.id_habitacion)
      );

      const roomsReservations: Habitacion[] = roomsData.filter((room) =>
        room.fecha_inicio_reserva != null
      ).map((room) => ({
        ...room,
        fecha_inicio_reserva: room.fecha_inicio_reserva,
        fecha_fin_reserva: room.fecha_fin_reserva
      }));

      const pisos: Floor[] = rooms.map((room) => room.piso_habitacion)
        .filter((piso, index, self) => self.indexOf(piso) === index)
        .map((piso) => ({
          id: piso,
          number: piso,
          label: `Piso ${piso}`,
        })
        );
      setFloor(pisos);
      setRooms(rooms)
      setReservations(roomsReservations)
    }
    fetchData()
  }, [])

  const handleOpenModal = (room: Habitacion) => {
    setSelectedRoom(room);
    setIsModalOpen(true)
  };

  const filteredRooms: Habitacion[] = rooms.filter((room) => {
    const floorMatch = !selectedFloor || room.piso_habitacion == selectedFloor

    const isAvailable = !reservations.some(
      (res) => {
        const resStartDate = res.fecha_inicio_reserva;
        const resEndDate = res.fecha_fin_reserva;

        const selectedConvStartDate = selectedStartDate.toLocaleDateString("es-ES");
        const selectedConvEndDate = selectedEndDate.toLocaleDateString("es-ES");

        const overlaps = selectedConvStartDate <= resEndDate && selectedConvEndDate >= resStartDate;

        return (
          res.piso_habitacion === room.piso_habitacion &&
          res.numero_habitacion === room.numero_habitacion &&
          overlaps
        )
      }
    )

    return floorMatch && isAvailable
  })

  const handleConfirmModal = async (dataReserva: CreateReservation, dataUsuario: Usuario) => {
    const response = await hotelService.createUsuario(dataUsuario);
    const reservaUsuario = await hotelService.createReservation(dataReserva);

    setReservations((prev) => [
      ...prev,
      {
        ...selectedRoom!,
        fecha_inicio_reserva: dataReserva.fecha_inicio_reserva,
        fecha_fin_reserva: dataReserva.fecha_fin_reserva,
      },
    ]);

    setRooms((prev) => prev.filter((room) => room.id_habitacion !== selectedRoom!.id_habitacion));
    setSelectedRoom(null);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <header className='dashboard-header'>
        <div className='dashboard-title'>
          <h1>EasyHotel Popayán</h1>
        </div>
        <button className="my-reservations-button" onClick={() => setIsMyReservationsModalOpen(true)}>
          Mis Reservas
        </button>
      </header>
      <div className="dashboard-content">
        <div className="filters-section">
          <h2>Filtros</h2>
          <FloorFilter
            floors={floor}
            selectedFloor={selectedFloor}
            onFloorSelect={setSelectedFloor}
          />
          <div className="date-filter">
            <h3>Fecha</h3>
            <Calendar onDateStartSelect={setSelectedStartDate} onDateEndSelect={setSelectedEndDate} />
          </div>
        </div>
        <div className="rooms-section">
          <h2>Habitaciones Disponibles</h2>
          <div className="rooms-grid">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id_habitacion}
                room={room}
                isSelected={selectedRoom?.id_habitacion === room.id_habitacion}
                onSelect={() => handleOpenModal(room)}
                disabled={roomDisabled}
              />
            ))}
          </div>
        </div>
      </div>
      <ReservationModal
        selectedRoom={selectedRoom}
        selectedStarDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
      <MyReservationsModal
        isOpen={isMyReservationsModalOpen}
        onClose={handleCloseMyReservationsModal}
      />
    </div>
  )
}
