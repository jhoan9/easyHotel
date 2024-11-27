import React from 'react'
import { Habitacion, Room } from '../../types/types'

interface ReservationFormProps {
  selectedRoom: Habitacion
  selectedStarDate: Date | undefined
  selectedEndDate: Date | undefined
  onConfirm: () => void
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  selectedRoom,
  selectedStarDate,
  selectedEndDate,
  onConfirm,
}) => {
  return (
    <div className="reservation-form">
      <h2>Realizar Reserva</h2>
      <p>
        Estás a punto de reservar la habitación {selectedRoom.habitacion} para la fecha{' '}
        {selectedStarDate?.toLocaleDateString()}{ ' hasta ' + selectedEndDate?.toLocaleDateString()}
      </p>
      <button className="confirm-button" onClick={onConfirm}>
        Confirmar Reserva
      </button>
    </div>
  )
}