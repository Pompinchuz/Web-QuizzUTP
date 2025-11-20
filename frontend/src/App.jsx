
// src/App.jsx
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import AdminDashboard from './pages/AdminDashboard';
import Reports from './pages/Reports';
import { authService } from './services/api';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('loading');
  const [user, setUser] = useState(null);

  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      const validation = await authService.validateToken();
      if (validation.valid) {
        setUser(validation.user);
        // Redirigir según el rol
        if (validation.user.role === 'ADMINISTRADOR') {
          setCurrentView('admin');
        } else {
          setCurrentView('dashboard');
        }
      } else {
        authService.logout();
        setCurrentView('login');
      }
    } else {
      setCurrentView('login');
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === 'ADMINISTRADOR') {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleFinishQuiz = () => {
    setCurrentView('dashboard');
  };

  const handleViewReports = () => {
    setCurrentView('reports');
  };

  const handleBackToDashboard = () => {
    if (user.role === 'ADMINISTRADOR') {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentView('login');
  };

  if (currentView === 'loading') {
    return (
      <div className="app loading-screen">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {currentView === 'login' && (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentView('register')}
        />
      )}

      {currentView === 'register' && (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}

      {currentView === 'dashboard' && user && (
        <Dashboard
          user={user}
          onStartQuiz={handleStartQuiz}
          onViewReports={handleViewReports}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'quiz' && user && (
        <Quiz
          user={user}
          onFinish={handleFinishQuiz}
        />
      )}

      {currentView === 'admin' && user && (
        <AdminDashboard
          user={user}
          onViewReports={handleViewReports}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'reports' && user && (
        <Reports
          user={user}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;