// src/pages/Home.jsx
import './Home.css';

export default function Home({ onNavigateToLogin, onNavigateToRegister }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">Quiz UTP</h1>
          <p className="home-subtitle">Sistema de Evaluación Interactiva</p>
        </div>

        <div className="home-features">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Evaluaciones Dinámicas</h3>
            <p>Realiza cuestionarios interactivos y evalúa tus conocimientos</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Seguimiento de Progreso</h3>
            <p>Visualiza tus resultados y estadísticas detalladas</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Resultados Instantáneos</h3>
            <p>Obtén retroalimentación inmediata de tu desempeño</p>
          </div>
        </div>

        <div className="home-actions">
          <button
            className="home-button primary"
            onClick={onNavigateToLogin}
          >
            Iniciar Sesión
          </button>
          <button
            className="home-button secondary"
            onClick={onNavigateToRegister}
          >
            Registrarse
          </button>
        </div>

        <div className="home-footer">
          <p>Universidad Tecnológica de Panamá</p>
        </div>
      </div>
    </div>
  );
}
