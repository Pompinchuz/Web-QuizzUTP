// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import QuestionForm from '../components/QuestionForm';
import './AdminDashboard.css';

export default function AdminDashboard({ onLogout }) {
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState({ totalQuestions: 0 });
  const [studentStats, setStudentStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [questionsData, statsData, studentStatsData] = await Promise.all([
        adminService.getAllQuestions(),
        adminService.getStats(),
        reportService.getGeneralStats(),
      ]);

      setQuestions(questionsData);
      setStats(statsData);
      setStudentStats(studentStatsData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      // Establecer valores por defecto en caso de error
      setStudentStats({
        averageScore: 0,
        totalStudents: 0,
        totalAttempts: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingQuestion(null);
    setShowForm(true);
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await adminService.deleteQuestion(id);
      await loadData();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la pregunta');
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setEditingQuestion(null);
    await loadData();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingQuestion(null);
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <h1 className="admin-nav-title">🎯 Panel de Administración</h1>
        <button onClick={onLogout} className="admin-logout-button">
          Cerrar Sesión
        </button>
      </nav>

      {showForm ? (
        <QuestionForm
          question={editingQuestion}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : (
        <div className="admin-content">
          <div className="admin-header">
            <div className="stats-grid">
              <div className="stats-card">
                <div className="stat-icon">📝</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalQuestions}</div>
                  <div className="stat-label">Total de Preguntas</div>
                </div>
              </div>
              <div className="stats-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <div className="stat-value">{studentStats?.totalStudents || 0}</div>
                  <div className="stat-label">Total Estudiantes</div>
                </div>
              </div>
              <div className="stats-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-value">
                    {studentStats?.averageScore !== undefined
                      ? Number(studentStats.averageScore).toFixed(1)
                      : '0.0'}
                  </div>
                  <div className="stat-label">Promedio General</div>
                </div>
              </div>
              <div className="stats-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <div className="stat-value">{studentStats?.totalAttempts || 0}</div>
                  <div className="stat-label">Total Intentos</div>
                </div>
              </div>
            </div>
            <button onClick={handleCreate} className="btn-create">
              ➕ Nueva Pregunta
            </button>
          </div>

          <div className="questions-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pregunta</th>
                  <th>Dificultad</th>
                  <th>Respuesta Correcta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.id}>
                    <td>{q.id}</td>
                    <td className="question-text">{q.questionText}</td>
                    <td>
                      <span className={`badge badge-${q.difficulty}`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td>Opción {q.correctAnswer}</td>
                    <td className="actions">
                      <button
                        onClick={() => handleEdit(q)}
                        className="btn-edit"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(q.id)}
                        className="btn-delete"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Confirmar eliminación?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="btn-confirm-delete"
              >
                Eliminar
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-cancel"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}