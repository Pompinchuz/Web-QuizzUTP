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
    if (answered) {return;}

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
      // Guardar resultado en la base de datos
      await reportService.saveResult({
        score: finalScore,
        totalQuestions: questions.length,
        correctAnswers: correctAnswers,
        incorrectAnswers: incorrectAnswers,
      });

      // Actualizar mejor puntuación
      await authService.updateScore(user.id, finalScore);
    } catch (error) {
      console.error('Error al guardar resultado:', error);
    }
  };

  const getAnswerClass = (index) => {
    if (!answered) {return 'answer-option';}

    const isCorrect = index === questions[currentQuestion].correctAnswer;
    const isSelected = index === selectedAnswer;

    if (isCorrect) {return 'answer-option correct';}
    if (isSelected && !isCorrect) {return 'answer-option incorrect';}
    return 'answer-option';
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">Cargando preguntas...</div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-container">
        <div className="result-card">
          <h1 className="result-title">¡Quiz Completado!</h1>
          <div className="result-score">
            <span className="score-label">Tu puntuación</span>
            <span className="score-value">{score}</span>
            <span className="score-total">de {questions.length * 10}</span>
          </div>
          <div className="result-message">
            {score >= 80 ? '🎉 ¡Excelente trabajo!' :
              score >= 60 ? '👍 ¡Buen trabajo!' :
                score >= 40 ? '💪 Sigue practicando' :
                  '📚 Necesitas estudiar más'}
          </div>
          <button onClick={onFinish} className="return-button">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="quiz-info-bar">
          <span className="question-counter">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className="current-score">Puntuación: {score}</span>
        </div>
      </div>

      <div className="question-card">
        <h2 className="question-text">{question.questionText}</h2>

        <div className="answers-grid">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handleAnswerClick(num)}
              className={getAnswerClass(num)}
              disabled={answered}
            >
              <span className="answer-number">{num}</span>
              <span className="answer-text">{question[`option${num}`]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}