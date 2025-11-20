// src/services/api.js
const API_URL = 'http://localhost:8080/api';

// Función helper para obtener el token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const authService = {
  async register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async login(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async validateToken() {
    const token = localStorage.getItem('token');
    if (!token) {return { valid: false };}

    try {
      const response = await fetch(`${API_URL}/auth/validate`, {
        headers: getAuthHeader(),
      });
      return response.json();
    } catch {
      return { valid: false };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  async updateScore(userId, score) {
    const response = await fetch(`${API_URL}/auth/score/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ score }),
    });
    return response.json();
  },
};

export const questionService = {
  async getRandomQuestions(count) {
    const response = await fetch(`${API_URL}/questions/random/${count}`);
    return response.json();
  },
};

export const adminService = {
  async getAllQuestions() {
    const response = await fetch(`${API_URL}/admin/questions`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  async getQuestionById(id) {
    const response = await fetch(`${API_URL}/admin/questions/${id}`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  async createQuestion(questionData) {
    const response = await fetch(`${API_URL}/admin/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(questionData),
    });
    return response.json();
  },

  async updateQuestion(id, questionData) {
    const response = await fetch(`${API_URL}/admin/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(questionData),
    });
    return response.json();
  },

  async deleteQuestion(id) {
    const response = await fetch(`${API_URL}/admin/questions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    return response.json();
  },

  async getStats() {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },
};

export const reportService = {
  async saveResult(resultData) {
    const response = await fetch(`${API_URL}/reports/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(resultData),
    });
    return response.json();
  },

  async getMyResults() {
    const response = await fetch(`${API_URL}/reports/my-results`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  async getAllResults() {
    const response = await fetch(`${API_URL}/reports/all-results`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  async getGeneralStats() {
    const response = await fetch(`${API_URL}/reports/general-stats`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },
};