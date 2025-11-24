// src/components/Login.jsx
import { useState } from 'react';
import { authService } from '../services/api';
import './Auth.css';

export default function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.login({ username, password });
      if (result.success) {
        onLogin(result.user);
      } else {
        setError(result.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión. Verifica que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Quiz UTP</h1>
        <h2 className="auth-subtitle">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className="auth-switch">
          ¿No tienes cuenta?
          <button onClick={onSwitchToRegister} className="auth-link">
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}