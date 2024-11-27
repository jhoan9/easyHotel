import React from 'react'
import { Floor } from '../../types/types'

interface FloorFilterProps {
  floors: Floor[]
  selectedFloor: number | null
  onFloorSelect: (floor: number | null) => void
}

export const FloorFilter: React.FC<FloorFilterProps> = ({ floors, selectedFloor, onFloorSelect }) => {
  return (
    <div className="filter-section">
      <label htmlFor="floor-select" className="filter-label">
        Piso
      </label>
      <select
        id="floor-select"
        value={selectedFloor || ''}
        onChange={(e) => onFloorSelect(e.target.value ? Number(e.target.value) : null)}
        className="filter-select"
      >
        <option value="">Todos los pisos</option>
        {floors.map((floor) => (
          <option key={floor.id} value={floor.number}>
            {floor.label}
          </option>
        ))}
      </select>
    </div>
  )
}