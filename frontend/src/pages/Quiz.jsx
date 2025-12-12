// src/pages/Quiz.jsx
import { useState, useEffect } from 'react';
import { questionService, authService, reportService } from '../services/api';
import './Quiz.css';

export default function Quiz({ user, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    console.log("Cargando preguntas...");
    try {
      const data = await questionService.getRandomQuestions(10);
      console.log("Respuesta del servidor:", data);
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar preguntas:', error);
      alert('Error al cargar las preguntas');
    }
  };

  const handleAnswerClick = (answerIndex) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        finishQuiz(isCorrect ? score + 10 : score);
      }
    }, 1500);
  };

  const finishQuiz = async (finalScore) => {
    setShowResult(true);

    const correctAnswers = Math.floor(finalScore / 10);
    const incorrectAnswers = questions.length - correctAnswers;

    try {
      await reportService.saveResult({
        score: finalScore,
        totalQuestions: questions.length,
        correctAnswers: correctAnswers,
        incorrectAnswers: incorrectAnswers,
      });

      await authService.updateScore(user.id, finalScore);
    } catch (error) {
      console.error('Error al guardar resultado:', error);
    }
  };

  const getOptionClass = (index) => {
    if (!answered) return 'option-button';

    const isCorrect = index === questions[currentQuestion].correctAnswer;
    const isSelected = index === selectedAnswer;

    if (isCorrect) return 'option-button correct';
    if (isSelected && !isCorrect) return 'option-button incorrect';
    return 'option-button';
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="quiz-loading">Cargando preguntas...</div>
      </div>
    );
  }

  if (showResult) {
    const correctAnswers = Math.floor(score / 10);
    const incorrectAnswers = questions.length - correctAnswers;
    const percentage = (score / (questions.length * 10)) * 100;

    return (
      <div className="quiz-container">
        <div className="quiz-body">
          <div className="results-card">
            <div className="results-icon">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : percentage >= 40 ? '💪' : '📚'}
            </div>
            <h1 className="results-title">¡Quiz Completado!</h1>
            <div className="results-score">{score} pts</div>
            
            <div className="results-stats">
              <div className="stat-item">
                <div className="stat-label">Correctas</div>
                <div className="stat-value correct">{correctAnswers}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Incorrectas</div>
                <div className="stat-value incorrect">{incorrectAnswers}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Porcentaje</div>
                <div className="stat-value">{percentage.toFixed(0)}%</div>
              </div>
            </div>

            <p style={{ color: '#666', fontSize: '1.2rem', margin: '20px 0' }}>
              {percentage >= 80 ? '¡Excelente trabajo!' :
                percentage >= 60 ? '¡Buen trabajo!' :
                  percentage >= 40 ? 'Sigue practicando' :
                    'Necesitas estudiar más'}
            </p>

            <div className="results-actions">
              <button onClick={onFinish} className="results-button primary">
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="quiz-container">
      {/* Header */}
      <div className="quiz-header">
        <div className="quiz-header-content">
          <div className="quiz-logo">
            <span className="quiz-logo-icon">🎓</span>
            <span className="quiz-logo-text">Quiz UTP</span>
          </div>
          <div className="quiz-header-info">
            <span className="quiz-progress">
              Pregunta {currentQuestion + 1}/{questions.length}
            </span>
            <span className="quiz-timer">
              Puntuación: {score}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="quiz-body">
        <div className="quiz-content">
          <div className="question-card">
            <div className="question-header">
              <span className="question-number">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className={`question-difficulty difficulty-${question.difficulty.toLowerCase()}`}>
                {question.difficulty}
              </span>
            </div>

            <p className="question-text">{question.questionText}</p>

            <div className="options-container">
              {[1, 2, 3, 4].map((num, index) => (
                <button
                  key={num}
                  onClick={() => handleAnswerClick(num)}
                  className={getOptionClass(num)}
                  disabled={answered}
                >
                  <span className="option-letter">{letters[index]}</span>
                  <span className="option-text">{question[`option${num}`]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}