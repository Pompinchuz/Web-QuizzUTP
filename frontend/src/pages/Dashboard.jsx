// src/pages/Dashboard.jsx
import './Dashboard.css';

export default function Dashboard({ user, onStartQuiz, onViewReports, onLogout }) {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1 className="nav-title">Quiz UTP</h1>
        <div className="nav-actions">
          <button onClick={onViewReports} className="reports-button">
            📊 Mis Resultados
          </button>
          <button onClick={onLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </nav>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <div className="welcome-header">
            <h2 className="welcome-title">¡Hola, {user.username}!</h2>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-label">Mejor Puntuación</span>
                <span className="stat-value">{user.bestScore || 0}</span>
              </div>
            </div>
          </div>
          
          <div className="quiz-info">
            <h3 className="quiz-info-title">Quiz de Programación</h3>
            <p className="quiz-info-text">
              Pon a prueba tus conocimientos con 10 preguntas sobre programación.
              ¡Cada respuesta correcta suma 10 puntos!
            </p>
            
            <ul className="quiz-features">
              <li>✓ 10 preguntas aleatorias</li>
              <li>✓ Temas variados de programación</li>
              <li>✓ Resultados instantáneos</li>
            </ul>
            
            <button onClick={onStartQuiz} className="start-quiz-button">
              <span className="button-icon">🚀</span>
              Comenzar Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}