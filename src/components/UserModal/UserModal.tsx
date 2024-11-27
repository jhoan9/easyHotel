import React, { useState, useEffect } from 'react';
import './UserModal.css';

export const UserModal: React.FC<any> = ({ onClose, onSubmit, user }) => {
    const [formData, setFormData] = useState({
        id_usuario: '',
        nombre_usuario: '',
        correo_usuario: '',
        telefono_usuario: '',
        ciudad_usuario: '',
        pais_usuario: '',
        clave_usuario: ''
    });

    const [errors, setErrors] = useState<any>({}); // Estado para almacenar errores

    // Si estamos editando un usuario, actualizamos el estado con los valores del usuario.
    useEffect(() => {
        if (user) {
            setFormData({
                id_usuario: user.id_usuario || '',
                nombre_usuario: user.nombre_usuario || '',
                correo_usuario: user.correo_usuario || '',
                telefono_usuario: user.telefono_usuario || '',
                ciudad_usuario: user.ciudad_usuario || '',
                pais_usuario: user.pais_usuario || '',
                clave_usuario: user.clave_usuario || ''
            });
        }
    }, [user]);  // Solo actualizamos cuando `user` cambia

    const validateForm = () => {
        const newErrors: any = {};
        // Validación de correo
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.correo_usuario)) {
            newErrors.correo_usuario = "Por favor ingrese un correo válido";
        }

        // Validación de teléfono (números solo, longitud mínima de 10 dígitos)
        if (!/^\d{10,15}$/.test(formData.telefono_usuario)) {
            newErrors.telefono_usuario = "Por favor ingrese un número de teléfono válido (10 a 15 dígitos)";
        }

        // Validación de contraseña (mínimo 6 caracteres)
        if (formData.clave_usuario.length < 6) {
            newErrors.clave_usuario = "La contraseña debe tener al menos 6 caracteres";
        }

        // Validación de Documento (asegurarse de que tenga al menos 6 caracteres numéricos)
        if (!/^\d{5,}$/.test(formData.id_usuario)) {
            newErrors.id_usuario = "Por favor ingrese un documento válido";
        }

        setErrors(newErrors); // Actualizamos los errores
        return Object.keys(newErrors).length === 0; // Si no hay errores, retornamos true
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{user ? 'Editar Usuario' : 'Registrar Usuario'}</h3>
                <form onSubmit={handleSubmit}>
                    <label>Documento:</label>
                    <input
                        name="id_usuario"
                        value={formData.id_usuario}
                        onChange={handleChange}
                        required
                        disabled={user}
                    />
                    {errors.id_usuario && <span className="error">{errors.id_usuario}</span>}

                    <label>Nombre:</label>
                    <input
                        name="nombre_usuario"
                        value={formData.nombre_usuario}
                        onChange={handleChange}
                        required
                    />

                    <label>Correo:</label>
                    <input
                        name="correo_usuario"
                        value={formData.correo_usuario}
                        onChange={handleChange}
                        required
                    />
                    {errors.correo_usuario && <span className="error">{errors.correo_usuario}</span>}

                    <label>Teléfono:</label>
                    <input
                        name="telefono_usuario"
                        value={formData.telefono_usuario}
                        onChange={handleChange}
                        required
                    />
                    {errors.telefono_usuario && <span className="error">{errors.telefono_usuario}</span>}

                    <label>Ciudad:</label>
                    <input
                        name="ciudad_usuario"
                        value={formData.ciudad_usuario}
                        onChange={handleChange}
                        required
                    />

                    <label>País:</label>
                    <input
                        name="pais_usuario"
                        value={formData.pais_usuario}
                        onChange={handleChange}
                        required
                    />

                    <label>Contraseña:</label>
                    <input
                        name="clave_usuario"
                        value={formData.clave_usuario}
                        onChange={handleChange}
                        required
                    />
                    {errors.clave_usuario && <span className="error">{errors.clave_usuario}</span>}

                    <div className="modal-actions">
                        <button type="submit" className="save-button">
                            Guardar
                        </button>
                        <button type="button" onClick={onClose} className="cancel-button">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
