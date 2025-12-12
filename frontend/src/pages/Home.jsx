// src/pages/Home.jsx
import { useState } from 'react';
import './Home.css';

export default function Home({ onNavigateToLogin, onNavigateToRegister }) {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      id: 'hero',
      title: 'Quiz UTP',
      subtitle: 'Sistema de Evaluación Interactiva',
      description: 'Plataforma moderna para realizar evaluaciones académicas de forma interactiva y eficiente',
      icon: '🎓',
    },
    {
      id: 'features',
      title: 'Características Principales',
      subtitle: 'Todo lo que necesitas para evaluar',
      items: [
        {
          icon: '📝',
          title: 'Evaluaciones Dinámicas',
          description: 'Realiza cuestionarios interactivos con preguntas aleatorias y evalúa tus conocimientos de forma efectiva'
        },
        {
          icon: '📊',
          title: 'Seguimiento de Progreso',
          description: 'Visualiza tus resultados, estadísticas detalladas y evolución a lo largo del tiempo'
        },
        {
          icon: '🎯',
          title: 'Resultados Instantáneos',
          description: 'Obtén retroalimentación inmediata de tu desempeño con análisis detallado de respuestas'
        },
      ],
    },
    {
      id: 'benefits',
      title: 'Beneficios del Sistema',
      subtitle: 'Optimiza tu proceso de aprendizaje',
      items: [
        {
          icon: '⚡',
          title: 'Rápido y Eficiente',
          description: 'Sistema optimizado para una experiencia fluida y sin interrupciones'
        },
        {
          icon: '🔒',
          title: 'Seguro y Confiable',
          description: 'Tus datos y resultados están protegidos con los más altos estándares de seguridad'
        },
        {
          icon: '📱',
          title: 'Acceso Multiplataforma',
          description: 'Realiza tus evaluaciones desde cualquier dispositivo: PC, tablet o móvil'
        },
      ],
    },
    {
      id: 'cta',
      title: '¿Listo para comenzar?',
      subtitle: 'Únete a Quiz UTP hoy mismo',
      description: 'Accede a todas las funcionalidades del sistema y comienza a realizar tus evaluaciones'
    }
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderSection = () => {
    const section = sections[currentSection];

    switch (section.id) {
      case 'hero':
        return (
          <div className="section-hero">
            <div className="hero-icon">{section.icon}</div>
            <h1 className="section-title">{section.title}</h1>
            <p className="section-subtitle">{section.subtitle}</p>
            <p className="section-description">{section.description}</p>
          </div>
        );

      case 'features':
      case 'benefits':
        return (
          <div className="section-content">
            <h2 className="section-title">{section.title}</h2>
            <p className="section-subtitle">{section.subtitle}</p>
            <div className="cards-grid">
              {section.items.map((item, index) => (
                <div key={index} className="info-card">
                  <div className="card-icon">{item.icon}</div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="section-cta">
            <h2 className="section-title">{section.title}</h2>
            <p className="section-subtitle">{section.subtitle}</p>
            <p className="section-description">{section.description}</p>
            <div className="cta-buttons">
              <button className="cta-button primary" onClick={onNavigateToLogin}>
                Iniciar Sesión
              </button>
              <button className="cta-button secondary" onClick={onNavigateToRegister}>
                Crear Cuenta
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">Quiz UTP</span>
          </div>
          <nav className="header-nav">
            <button className="nav-button" onClick={() => setCurrentSection(0)}>Inicio</button>
            <button className="nav-button" onClick={() => setCurrentSection(1)}>Características</button>
            <button className="nav-button" onClick={() => setCurrentSection(2)}>Beneficios</button>
            <button className="nav-button-highlight" onClick={onNavigateToLogin}>Acceder</button>
          </nav>
        </div>
      </header>

      {/* Body */}
      <main className="home-body">
        <div className="body-content">
          {renderSection()}
        </div>

        {/* Indicadores de sección */}
        <div className="section-indicators">
          {sections.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSection ? 'active' : ''}`}
              onClick={() => setCurrentSection(index)}
              aria-label={`Ir a sección ${index + 1}`}
            />
          ))}
        </div>

        {/* Botones de navegación */}
        <div className="navigation-buttons">
          <button
            className="nav-arrow prev"
            onClick={handlePrev}
            disabled={currentSection === 0}
            aria-label="Sección anterior"
          >
            <span className="arrow-icon">←</span>
            <span className="arrow-text">Anterior</span>
          </button>
          <button
            className="nav-arrow next"
            onClick={handleNext}
            disabled={currentSection === sections.length - 1}
            aria-label="Siguiente sección"
          >
            <span className="arrow-text">Siguiente</span>
            <span className="arrow-icon">→</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quiz UTP</h4>
            <p>Sistema de Evaluación Interactiva</p>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Universidad Tecnológica del Perú</p>
            <p>Campus Chiclayo, Perú</p>
          </div>
          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <button className="footer-link" onClick={onNavigateToLogin}>Iniciar Sesión</button>
            <button className="footer-link" onClick={onNavigateToRegister}>Registrarse</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Universidad Tecnológica del Perú. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
