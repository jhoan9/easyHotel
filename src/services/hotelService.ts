import { Room, Reservation, Habitacion, CreateReservation, CreatePagoDTO, messageResonse, Usuario, ReservationFilter, HabitacionDetalle } from '../types/types'
import APIClient from './APIClient'
import { mockRooms } from './apiMock'

const apiClient = new APIClient("http://localhost:8000/api");

export const hotelService = {

  getHabitaciones: async (): Promise<Habitacion[]> => {
    let response: Habitacion[] = [];
    try {
      response = await apiClient.get<Habitacion[]>('/habitaciones');
    } catch (error) {
      throw new Error(`Error en la solicitud GET: ${error}`);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(response), 500)
    })
  },

  getHabitacionesDetalle: async (): Promise<HabitacionDetalle[]> => {
    let response: HabitacionDetalle[] = [];
    try {
      response = await apiClient.get<HabitacionDetalle[]>('/habitacionesDetalle');
    } catch (error) {
      throw new Error(`Error en la solicitud GET: ${error}`);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(response), 500)
    })
  },

  getUsuarios: async (): Promise<Usuario[]> => {
    let response: Usuario[] = [];
    try {
      response = await apiClient.get<Usuario[]>('/usuarios');
    } catch (error) {
      throw new Error(`Error en la solicitud GET: ${error}`);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(response), 500)
    })
  },

  createPago: async (pago: CreatePagoDTO): Promise<messageResonse> => {
    try {
      const response = await apiClient.post<CreatePagoDTO, messageResonse>('/pagos', pago);
      return response;
    } catch (error) {
      throw new Error(`Error en la solicitud POST: ${error}`);
    }
  },

  createUsuario: async (usuario: Usuario): Promise<messageResonse> => {
    try {
      const response = await apiClient.post<Usuario, messageResonse>('/usuarios', usuario);
      return response;
    } catch (error) {
      throw new Error(`Error en la solicitud POST: ${error}`);
    }
  },

  updateUsuario: async (idUser: number, usuario: Usuario): Promise<messageResonse> => {
    try {
      const response = await apiClient.put<Usuario, messageResonse>(`/updateUsuario`, idUser, usuario);
      return response;
    } catch (error) {
      throw new Error(`Error en la solicitud PUT: ${error}`);
    }
  },

  createReservation: async (reservation: Omit<CreateReservation, 'id_reserva'>): Promise<string> => {
    try {
      const response = await apiClient.post<Omit<CreateReservation, 'id_reserva'>, string>('/reservas', reservation);
      return response;
    } catch (error) {
      throw new Error(`Error en la solicitud POST: ${error}`);
    }
  },

  getRooms: async (): Promise<Room[]> => {
    // Simular llamada a API
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRooms), 500)
    })
  },

  getReservations: async (): Promise<Reservation[]> => {
    let reservas: Reservation[] = [];
    try {
      reservas = await apiClient.get<Reservation[]>('/reservas');
    } catch (error) {
      throw new Error(`Error en la solicitud GET: ${error}`);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(reservas), 500)
    })
  },

  getReservasFiltered: async (): Promise<ReservationFilter[]> => {
    let reservas: ReservationFilter[] = [];
    try {
      reservas = await apiClient.get<ReservationFilter[]>(`/reservasfiltered`);
    } catch (error) {
      throw new Error(`Error en la solicitud GET: ${error}`);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(reservas), 500)

    });
  },

  getReservationById: async (id: string): Promise<Reservation[]> => {
    let reserva: Reservation[] = [];
    try {
      reserva = await apiClient.get<Reservation[]>(`/reservas/${id}`);
    } catch (error) {
      throw new Error(`Error en la solicitud GET: ${error}`);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(reserva), 500)
    })
  },

  getUserById: async (id: string): Promise<Usuario> => {

    let usuario: Usuario = {} as Usuario;

    try {
      usuario = await apiClient.get<Usuario>(`/usuarios/${id}`);
    } catch (error) {
      throw new Error(`Error en la solicitud GET: ${error}`);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(usuario), 500)
    })
  },
}