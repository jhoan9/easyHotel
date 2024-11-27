import React, { useState } from 'react';
import './LoginModal.css';

interface LoginModalProps {
  onLogin: (documento: string, password: string) => void;
  onClose: () => void;
  errorMessage: string | null;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, errorMessage }) => {
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(documento, password);
  };

  return (
    <div className="login-modal">
      <div className="modal-content">
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>Documento:</label>
          <input
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="modal-actions">
            <button type="submit">Iniciar sesión</button>
            <button type="button" onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
