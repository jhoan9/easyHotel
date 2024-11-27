import React from 'react'
import { Habitacion } from '../../types/types'

interface RoomCardProps {
  room: Habitacion
  isSelected: boolean
  disabled: boolean
  onSelect: (room: Habitacion) => void
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, isSelected, disabled, onSelect }) => {
  return (
    <button
      className={`room-card ${isSelected ? 'selected' : ''}`}
      disabled={disabled}
      onClick={() => onSelect(room)}
    >
      <h3>{room.habitacion + ' ' + room.numero_habitacion}</h3>
      <p>{room.descripcion} - ${room.precio}/noche</p>
    </button>
  )
}