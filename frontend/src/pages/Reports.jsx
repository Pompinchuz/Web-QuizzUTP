// src/pages/Reports.jsx
import { useState, useEffect } from 'react';
import { reportService } from '../services/api';
import './Reports.css';

export default function Reports({ user, onBack }) {
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = user.role === 'ADMINISTRADOR';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        const [allResults, generalStats] = await Promise.all([
          reportService.getAllResults(),
          reportService.getGeneralStats(),
        ]);
        setResults(allResults);
        setStats(generalStats);
      } else {
        const myResults = await reportService.getMyResults();
        setResults(myResults);
        calculatePersonalStats(myResults);
      }
    } catch (error) {
      console.error('Error al cargar reportes:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePersonalStats = (results) => {
    if (results.length === 0) {
      setStats({ averageScore: 0, totalAttempts: 0, bestScore: 0 });
      return;
    }

    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const averageScore = totalScore / results.length;
    const bestScore = Math.max(...results.map(r => r.score));

    setStats({
      averageScore: averageScore.toFixed(1),
      totalAttempts: results.length,
      bestScore: bestScore,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="reports-container">
        <div className="loading">Cargando reportes...</div>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <nav className="reports-nav">
        <h1 className="reports-nav-title">
          📊 {isAdmin ? 'Reportes Generales' : 'Mis Resultados'}
        </h1>
        <button onClick={onBack} className="back-button">
          ← Volver
        </button>
      </nav>

      <div className="reports-content">
        {/* Estadísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <div className="stat-value">
                {isAdmin ? stats?.averageScore?.toFixed(1) || '0' : stats?.averageScore || '0'}
              </div>
              <div className="stat-label">Promedio</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-value">{stats?.totalAttempts || 0}</div>
              <div className="stat-label">
                {isAdmin ? 'Total Intentos' : 'Mis Intentos'}
              </div>
            </div>
          </div>

          {!isAdmin && (
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <div className="stat-value">{stats?.bestScore || 0}</div>
                <div className="stat-label">Mejor Puntuación</div>
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <div className="stat-value">{stats?.totalStudents || 0}</div>
                <div className="stat-label">Estudiantes</div>
              </div>
            </div>
          )}
        </div>

        {/* Tabla de resultados */}
        <div className="results-section">
          <h2 className="section-title">Historial de Resultados</h2>

          {results.length === 0 ? (
            <div className="no-results">
              <p>No hay resultados disponibles</p>
            </div>
          ) : (
            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    {isAdmin && <th>Estudiante</th>}
                    <th>Fecha</th>
                    <th>Puntuación</th>
                    <th>Correctas</th>
                    <th>Incorrectas</th>
                    <th>Porcentaje</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.id}>
                      {isAdmin && (
                        <td className="student-name">
                          {result.usuario?.username || 'Desconocido'}
                        </td>
                      )}
                      <td>{formatDate(result.completedAt)}</td>
                      <td>
                        <span className="score-badge">{result.score}</span>
                      </td>
                      <td className="correct-answers">
                        ✓ {result.correctAnswers}
                      </td>
                      <td className="incorrect-answers">
                        ✗ {result.incorrectAnswers}
                      </td>
                      <td>
                        <div className="percentage-bar">
                          <div
                            className="percentage-fill"
                            style={{
                              width: `${(result.correctAnswers / result.totalQuestions) * 100}%`,
                            }}
                          />
                          <span className="percentage-text">
                            {((result.correctAnswers / result.totalQuestions) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}