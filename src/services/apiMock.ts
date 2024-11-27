import { Room, Floor, Reservation } from '../types/types'

export const mockRooms: Room[] = [
  { id: 1, number: '101', type: 'Single', price: 100, floor: 1, available: true },
  { id: 2, number: '102', type: 'Double', price: 150, floor: 1, available: true },
  { id: 3, number: '201', type: 'Single', price: 100, floor: 2, available: true },
  { id: 4, number: '202', type: 'Double', price: 150, floor: 2, available: false },
]

export const mockFloors: Floor[] = [
  { id: 1, number: 1, label: 'Piso 1' },
  { id: 2, number: 2, label: 'Piso 2' },
]

export const mockReservations: Reservation[] = [
  {
    id_reserva: 1,
    fecha_inicio_reserva: '2021-10-01',
    fecha_fin_reserva: '2021-10-05',
    numero_habitacion: 1,
    piso_habitacion: 1,
    descripcion_habitacion: "Hola mundo",
  },
]