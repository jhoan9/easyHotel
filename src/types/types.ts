export type Room = {
  id: number
  number: string
  type: 'Single' | 'Double' | 'Suite'
  price: number
  floor: number
  available: boolean
}

export type Habitacion = {
  id_habitacion: number;
  numero_habitacion: string;
  habitacion: string;
  precio: string;
  descripcion: string;
  piso_habitacion: number;
  fecha_inicio_reserva: string;
  fecha_fin_reserva: string;
}

export type CreateReservation = {
  id_reserva: number;
  fecha_inicio_reserva: string;
  fecha_fin_reserva: string;
  id_habitacion: number;
  id_pago: number;
  id_usuario: number;
}

export type Reservation = {
  id_reserva: number;
  fecha_inicio_reserva: string;
  fecha_fin_reserva: string;
  numero_habitacion: number;
  piso_habitacion: number;
  descripcion_habitacion: string;
}

export type ReservationFilter = {
  id_reserva: number,
  id_usuario: number,
  nombre_usuario: string,
	fecha_inicio_reserva: string,
  fecha_fin_reserva: string,
  numero_habitacion: number,
}

export type HabitacionDetalle = {
  id_habitacion: number;
  numero_habitacion: string;
  habitacion: string;
  precio: string;
  descripcion: string;
  piso_habitacion: number;
  nombre_estado_habitacion: string;
}

export type Pago = {
  id_pago: number;
  fecha_pago: string;
  id_estado_pago: number;
  id_metodo_pago: number;
}

export type CreatePagoDTO = Omit<Pago, 'id_pago'>;

export type Usuario = {
  id_usuario: number;
  nombre_usuario: string;
  correo_usuario: string;
  telefono_usuario: string;
  ciudad_usuario: string;
  pais_usuario: string;
  clave_usuario: string;
}


export type Floor = {
  id: number
  number: number
  label: string
}

export type messageResonse = {
  message: string;
  data: any;
  statusCode: number;
}