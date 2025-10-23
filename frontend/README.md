
### Descripción de Componentes y Páginas

- **`QuestionForm.jsx`**: Componente que gestiona el formulario para crear o editar preguntas.
  - Incluye validación de campos.
  - Selector de respuesta correcta y dificultad.
  
- **`Login.jsx`**: Componente para el inicio de sesión de los usuarios.
  - Requiere el correo y la contraseña del usuario.
  - Almacena el token JWT en `localStorage`.

- **`Register.jsx`**: Componente para registrar nuevos usuarios.

- **`AdminDashboard.jsx`**: Panel de administración para gestionar las preguntas del cuestionario.
  - Muestra una tabla con todas las preguntas.
  - Permite agregar, editar o eliminar preguntas.

- **`Dashboard.jsx`**: Página de inicio para el estudiante, que muestra sus resultados personales.

- **`Quiz.jsx`**: Página para realizar el cuestionario.
  - Muestra las preguntas y registra las respuestas del estudiante.

- **`Reports.jsx`**: Página de reportes para ver el rendimiento del estudiante o del grupo (según el rol).

- **`NavBar.jsx`**: Barra de navegación para la gestión de la sesión y acceso a diferentes secciones de la app.

### Servicios

- **`api.js`**: Servicio que gestiona todas las peticiones HTTP a la API del backend.
  - **Métodos principales**:
    - `login()`: Para el inicio de sesión.
    - `register()`: Para el registro de nuevos usuarios.
    - `fetchQuestions()`: Para obtener todas las preguntas.
    - `saveQuizResult()`: Para guardar los resultados del quiz.
    - `fetchReports()`: Para obtener los reportes de resultados.

## Instalación

### Prerequisitos

Asegúrate de tener Node.js y npm instalados. Si no los tienes, puedes descargarlos desde [aquí](https://nodejs.org/).

### Pasos de Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/quiz-frontend.git
   cd quiz-frontend



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
