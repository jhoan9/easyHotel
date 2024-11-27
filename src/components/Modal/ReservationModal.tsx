import React, { useState } from 'react';
import { hotelService } from '../../services/hotelService'
import { CreateReservation, Habitacion, messageResonse, Usuario } from '../../types/types';
import './ReservationModal.css';

interface ReservationModalProps {
    selectedRoom: Habitacion | null;
    selectedStarDate: Date | undefined;
    selectedEndDate: Date | undefined;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (dataReserva: CreateReservation, dataUsuario: Usuario) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
    selectedRoom,
    selectedStarDate,
    selectedEndDate,
    isOpen,
    onClose,
    onConfirm
}) => {
    const [nombre, setNombre] = useState('');
    const [documento, setDocumento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [password, setPassword] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetFields = () => {
        setNombre('');
        setDocumento('');
        setTelefono('');
        setCorreo('');
        setCiudad('');
        setPais('');
        setPassword('');
        setMetodoPago('');
        setError(null);
        setPaymentSuccess(false);
        setIsPaying(false);
    };
    

    const handleClose = () => {
        resetFields();
        onClose();
    };
    

    const consumeServiceago = async () => {
        const response = await hotelService.createPago({
            fecha_pago: new Date().toLocaleDateString(),
            id_estado_pago: 1,
            id_metodo_pago: parseInt(metodoPago),
        });
        const resIdPago = response.data.id_pago;
        return  resIdPago;
    };

    const validateFields = () => {
        let isValid = true;
        const errors = [];
    
        // Validar nombre
        if (!nombre || nombre.trim().length < 3) {
            errors.push("El nombre debe tener al menos 3 caracteres.");
            isValid = false;
        }
    
        // Validar documento
        if (!documento || documento.trim().length < 5) {
            errors.push("El documento debe tener al menos 5 caracteres.");
            isValid = false;
        }
    
        // Validar teléfono
        const telefonoRegex = /^[0-9]{10}$/;
        if (!telefonoRegex.test(telefono)) {
            errors.push("El teléfono debe contener exactamente 10 dígitos.");
            isValid = false;
        }
    
        // Validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            errors.push("Por favor, ingresa un correo electrónico válido.");
            isValid = false;
        }
    
        // Validar ciudad
        if (!ciudad || ciudad.trim().length < 2) {
            errors.push("La ciudad debe tener al menos 2 caracteres.");
            isValid = false;
        }
    
        // Validar país
        if (!pais || pais.trim().length < 2) {
            errors.push("El país debe tener al menos 2 caracteres.");
            isValid = false;
        }
    
        // Validar contraseña
        if (!password || password.trim().length < 6) {
            errors.push("La contraseña debe tener al menos 6 caracteres.");
            isValid = false;
        }
    
        // Validar método de pago
        if (!metodoPago) {
            errors.push("Por favor, selecciona un método de pago.");
            isValid = false;
        }
    
        // Mostrar errores si existen
        if (!isValid) {
            setError(errors.join(" "));
        } else {
            setError(null);
        }
    
        return isValid;
    };

    const handlePayment = async () => {
        if (!validateFields()) return;
    
        setIsPaying(true);
        try {
            const createdIdPago = await consumeServiceago();
            console.log('Pago creado con ID:', createdIdPago);
            onConfirm(
                {
                    id_reserva: 0,
                    fecha_inicio_reserva: selectedStarDate?.toLocaleDateString() || '',
                    fecha_fin_reserva: selectedEndDate?.toLocaleDateString() || '',
                    id_habitacion: selectedRoom?.id_habitacion || 0,
                    id_pago: createdIdPago,
                    id_usuario: parseInt(documento),
                },
                {
                    id_usuario: parseInt(documento),
                    nombre_usuario: nombre,
                    correo_usuario: correo,
                    telefono_usuario: telefono,
                    ciudad_usuario: ciudad,
                    pais_usuario: pais,
                    clave_usuario: password,
                }
            );
    
            setTimeout(() => {
                setPaymentSuccess(true);
                resetFields(); // Restablecer campos después del pago exitoso
            }, 2000);
        } catch (error) {
            console.error('Error al realizar el pago:', error);
            setError('Ocurrió un error al procesar el pago.');
        } finally {
            setIsPaying(false);
        }
    };
    

    if (!isOpen) return null;

    return (
        <div className="reservation-modal">
            <div className="modal-content">
                <h2>Confirmar Reserva</h2>
                <form className="reservation-form">
                    <label>Nombre Completo:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <label>Documento de Identidad:</label>
                    <input
                        type="number"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        minLength={5}
                        required
                    />
                    <label>Método de pago:</label>
                    <select
                        value={metodoPago}
                        onChange={(e) => setMetodoPago(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un método</option>
                        <option value="1">Tarjeta de Crédito</option>
                        <option value="2">Tarjeta de Débito</option>
                        <option value="3">Transferencia Bancaria</option>
                    </select>
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        minLength={10}
                        required
                    />
                    <label>Correo:</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                    <label>Ciudad:</label>
                    <input
                        type="text"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        required
                    />
                    <label>País:</label>
                    <input
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                        required
                    />
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="modal-actions">
                    <button onClick={handleClose} className="cancel-button">
                        Cancelar
                    </button>
                    <button
                        onClick={handlePayment}
                        className="pay-button"
                        disabled={isPaying || paymentSuccess}
                    >
                        {isPaying ? 'Procesando...' : 'Pagar'}
                    </button>
                    <span className="payment-cost">Total: ${selectedRoom?.precio}</span>
                </div>
                {paymentSuccess && (
                    <div className="payment-success">
                        <p>¡Pago Exitoso!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
