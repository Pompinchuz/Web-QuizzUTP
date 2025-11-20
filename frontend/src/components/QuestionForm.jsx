// src/components/QuestionForm.jsx
import { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import './QuestionForm.css';

export default function QuestionForm({ question, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: 1,
    difficulty: 'medio',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (question) {
      setFormData(question);
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'correctAnswer' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (question) {
        await adminService.updateQuestion(question.id, formData);
      } else {
        await adminService.createQuestion(formData);
      }
      onSubmit();
    } catch (err) {
      console.error('Error al guardar la pregunta:', err);
      setError('Error al guardar la pregunta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">
          {question ? '✏️ Editar Pregunta' : '➕ Nueva Pregunta'}
        </h2>

        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label>Pregunta *</label>
            <textarea
              name="questionText"
              value={formData.questionText}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Escribe la pregunta aquí..."
            />
          </div>

          <div className="options-grid">
            <div className="form-group">
              <label>Opción 1 *</label>
              <input
                type="text"
                name="option1"
                value={formData.option1}
                onChange={handleChange}
                required
                placeholder="Primera opción"
              />
            </div>

            <div className="form-group">
              <label>Opción 2 *</label>
              <input
                type="text"
                name="option2"
                value={formData.option2}
                onChange={handleChange}
                required
                placeholder="Segunda opción"
              />
            </div>

            <div className="form-group">
              <label>Opción 3 *</label>
              <input
                type="text"
                name="option3"
                value={formData.option3}
                onChange={handleChange}
                required
                placeholder="Tercera opción"
              />
            </div>

            <div className="form-group">
              <label>Opción 4 *</label>
              <input
                type="text"
                name="option4"
                value={formData.option4}
                onChange={handleChange}
                required
                placeholder="Cuarta opción"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Respuesta Correcta *</label>
              <select
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                required
              >
                <option value={1}>Opción 1</option>
                <option value={2}>Opción 2</option>
                <option value={3}>Opción 3</option>
                <option value={4}>Opción 4</option>
              </select>
            </div>

            <div className="form-group">
              <label>Dificultad *</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
              >
                <option value="facil">Fácil</option>
                <option value="medio">Medio</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? 'Guardando...' : question ? 'Actualizar' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-cancel-form"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}