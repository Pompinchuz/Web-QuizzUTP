# 🎯 Quiz UTP - Sistema de Evaluación de Programación

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge&logo=jsonwebtokens)

**Sistema interactivo de evaluación tipo Kahoot para preguntas de programación con autenticación JWT y roles de usuario**

[Demo](#-capturas-de-pantalla) • [Características](#-características) • [Instalación](#-instalación) • [API](#-documentación-api) • [Contribuir](#-contribución)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación API](#-documentación-api)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Seguridad](#-seguridad)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## ✨ Características

### 🔐 Sistema de Autenticación
- ✅ Registro e inicio de sesión con JWT
- ✅ Tokens con duración de 24 horas
- ✅ Validación automática de sesión
- ✅ Persistencia de sesión con localStorage
- ✅ Cierre de sesión explícito

### 👥 Sistema de Roles
- ✅ **ESTUDIANTE**: Acceso a quiz y resultados personales
- ✅ **ADMINISTRADOR**: Acceso completo a CRUD y reportes generales

### 🎮 Quiz Interactivo
- ✅ 10 preguntas aleatorias por sesión
- ✅ Interfaz estilo Kahoot
- ✅ Feedback visual instantáneo (verde/rojo)
- ✅ Barra de progreso
- ✅ Sistema de puntuación (10 puntos por respuesta)
- ✅ Guardado automático de resultados

### 🛠️ Panel de Administración (CRUD)
- ✅ Crear nuevas preguntas
- ✅ Editar preguntas existentes
- ✅ Eliminar preguntas con confirmación
- ✅ Vista de todas las preguntas en tabla
- ✅ Filtrado por dificultad (fácil, medio, difícil)

### 📊 Sistema de Reportes
**Para Estudiantes:**
- 📈 Historial personal de intentos
- 🎯 Promedio de puntuación
- 🏆 Mejor puntuación
- 📅 Fecha y hora de cada intento

**Para Administradores:**
- 👥 Resultados de todos los estudiantes
- 📊 Estadísticas generales del grupo
- 📈 Promedio general de puntuaciones
- 🎯 Total de intentos realizados
- 👨‍🎓 Número total de estudiantes

### 🎨 Interfaz Moderna
- ✅ Diseño responsivo
- ✅ Gradientes y animaciones suaves
- ✅ Componentes reutilizables
- ✅ Feedback visual en todas las interacciones

---

## 🛠️ Tecnologías

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
  - Spring Web
  - Spring Data JPA
  - Spring Boot Starter
- **MySQL 8.0**
- **JWT (jjwt 0.11.5)**
- **Lombok**
- **Maven**

### Frontend
- **React 19.1.1**
- **Vite**
- **JavaScript ES6+**
- **CSS3** (Gradientes, Animaciones, Grid, Flexbox)
- **Fetch API**

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Login/    │  │  Dashboard   │  │     Quiz      │  │
│  │  Register   │  │   Student    │  │   Interface   │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Admin     │  │   Reports    │  │  API Service  │  │
│  │  Dashboard  │  │   (Roles)    │  │   (JWT)       │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP + JWT
                         ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Spring Boot + JWT)                 │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │    Auth     │  │   Question   │  │    Admin      │  │
│  │ Controller  │  │  Controller  │  │  Controller   │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Reports   │  │   Services   │  │   JwtUtil     │  │
│  │ Controller  │  │    Layer     │  │   (Security)  │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │ JPA/Hibernate
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    DATABASE (MySQL)                      │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────────┐ │
│  │ usuarios │  │ questions │  │    quiz_results      │ │
│  └──────────┘  └───────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 📥 Instalación

### Requisitos Previos
- Java JDK 17 o superior
- Node.js 18 o superior
- MySQL 8.0 o superior
- Maven 3.6+
- Git

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/quizzutp.git
cd quizzutp
```

### 2️⃣ Configurar Base de Datos

```bash
# Iniciar MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE quizzutp_db;
USE quizzutp_db;

# Ejecutar scripts SQL
source sql/insert_questions.sql
source sql/insert_admin_user.sql
```

### 3️⃣ Configurar Backend

```bash
# Navegar al directorio backend
cd backend

# Editar application.properties
nano src/main/resources/application.properties
```

**Configurar credenciales de MySQL:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quizzutp_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD_AQUI
```

```bash
# Instalar dependencias y compilar
mvn clean install

# Ejecutar el servidor
mvn spring-boot:run
```

El servidor estará corriendo en: `http://localhost:8080`

### 4️⃣ Configurar Frontend

```bash
# En otra terminal, navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

El frontend estará corriendo en: `http://localhost:5173`

---

## ⚙️ Configuración

### Variables de Entorno (Backend)

Crear archivo `application-dev.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/quizzutp_db
spring.datasource.username=root
spring.datasource.password=tu_password

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server
server.port=8080

# JWT (opcional - JwtUtil usa clave generada automáticamente)
# jwt.secret=tu_clave_secreta_muy_larga_y_segura
# jwt.expiration=86400000
```

### CORS Configuration

El backend está configurado para aceptar peticiones de:
- `http://localhost:5173` (desarrollo)

Para producción, modificar en cada `@CrossOrigin`:
```java
@CrossOrigin(origins = "https://tu-dominio.com")
```

---

## 🚀 Uso

### Credenciales de Acceso

#### Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin123`
- **Permisos**: Acceso completo

#### Estudiantes de Ejemplo
- **Usuario**: `estudiante1` / **Contraseña**: `123456`
- **Usuario**: `estudiante2` / **Contraseña**: `123456`
- **Permisos**: Quiz y reportes personales

### Flujo de Uso para Estudiantes

1. **Registrarse** o **Iniciar Sesión**
2. En el **Dashboard**, ver mejor puntuación
3. Click en **"Comenzar Quiz"**
4. Responder 10 preguntas de programación
5. Ver resultados instantáneos
6. Click en **"Mis Resultados"** para ver historial
7. **"Volver al Inicio"** (la sesión se mantiene activa)
8. **"Cerrar Sesión"** cuando termine

### Flujo de Uso para Administradores

1. **Iniciar Sesión** con credenciales de admin
2. En el **Panel de Administración**, ver todas las preguntas
3. **Crear** nuevas preguntas con el botón **"➕ Nueva Pregunta"**
4. **Editar** preguntas existentes con el botón **"✏️"**
5. **Eliminar** preguntas con confirmación **"🗑️"**
6. Click en **"Ver Reportes"** para estadísticas generales
7. Ver rendimiento de todos los estudiantes
8. **"Cerrar Sesión"** cuando termine

---

## 📁 Estructura del Proyecto

```
quizzutp/
│
├── backend/                           # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/quizzutp/
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AdminController.java
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── QuestionController.java
│   │   │   │   │   └── ReportsController.java
│   │   │   │   │
│   │   │   │   ├── model/
│   │   │   │   │   ├── Usuarios.java
│   │   │   │   │   ├── Question.java
│   │   │   │   │   └── QuizResult.java
│   │   │   │   │
│   │   │   │   ├── repository/
│   │   │   │   │   ├── UsuariosRepository.java
│   │   │   │   │   ├── QuestionRepository.java
│   │   │   │   │   └── QuizResultRepository.java
│   │   │   │   │
│   │   │   │   ├── service/
│   │   │   │   │   ├── UsuariosService.java
│   │   │   │   │   ├── QuestionService.java
│   │   │   │   │   └── QuizResultService.java
│   │   │   │   │
│   │   │   │   ├── util/
│   │   │   │   │   └── JwtUtil.java
│   │   │   │   │
│   │   │   │   └── QuizzutpApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── sql/
│   │   │           ├── insert_questions.sql
│   │   │           └── insert_admin_user.sql
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── QuestionForm.jsx
│   │   │   ├── Auth.css
│   │   │   └── QuestionForm.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Dashboard.css
│   │   │   ├── Quiz.jsx
│   │   │   ├── Quiz.css
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminDashboard.css
│   │   │   ├── Reports.jsx
│   │   │   └── Reports.css
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 📡 Documentación API

### Base URL
```
http://localhost:8080/api
```

### Autenticación

#### Registro
```http
POST /auth/register
Content-Type: application/json

{
  "username": "estudiante3",
  "email": "est3@utp.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 3,
    "username": "estudiante3",
    "email": "est3@utp.com",
    "bestScore": 0,
    "role": "ESTUDIANTE"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### Validar Token
```http
GET /auth/validate
Authorization: Bearer {token}
```

#### Actualizar Puntuación
```http
PUT /auth/score/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "score": 80
}
```

---

### Preguntas

#### Obtener Preguntas Aleatorias (Público)
```http
GET /questions/random/10
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "questionText": "¿Qué significa HTML?",
    "option1": "Hyper Text Markup Language",
    "option2": "High Tech Modern Language",
    "option3": "Home Tool Markup Language",
    "option4": "Hyperlinks and Text Markup Language",
    "correctAnswer": 1,
    "difficulty": "facil"
  }
]
```

---

### Administración (Solo ADMINISTRADOR)

#### Listar Todas las Preguntas
```http
GET /admin/questions
Authorization: Bearer {token}
```

#### Obtener Pregunta por ID
```http
GET /admin/questions/{id}
Authorization: Bearer {token}
```

#### Crear Pregunta
```http
POST /admin/questions
Authorization: Bearer {token}
Content-Type: application/json

{
  "questionText": "¿Cuál es el resultado de 2 + 2?",
  "option1": "3",
  "option2": "4",
  "option3": "5",
  "option4": "22",
  "correctAnswer": 2,
  "difficulty": "facil"
}
```

#### Actualizar Pregunta
```http
PUT /admin/questions/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "questionText": "¿Cuál es el resultado de 2 + 2?",
  "option1": "3",
  "option2": "4",
  "option3": "5",
  "option4": "22",
  "correctAnswer": 2,
  "difficulty": "medio"
}
```

#### Eliminar Pregunta
```http
DELETE /admin/questions/{id}
Authorization: Bearer {token}
```

#### Estadísticas
```http
GET /admin/stats
Authorization: Bearer {token}
```

---

### Reportes

#### Guardar Resultado de Quiz
```http
POST /reports/save
Authorization: Bearer {token}
Content-Type: application/json

{
  "score": 70,
  "totalQuestions": 10,
  "correctAnswers": 7,
  "incorrectAnswers": 3
}
```

#### Mis Resultados (ESTUDIANTE)
```http
GET /reports/my-results
Authorization: Bearer {token}
```

#### Todos los Resultados (Solo ADMINISTRADOR)
```http
GET /reports/all-results
Authorization: Bearer {token}
```

#### Estadísticas Generales (Solo ADMINISTRADOR)
```http
GET /reports/general-stats
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "averageScore": 72.5,
  "totalAttempts": 45,
  "totalStudents": 12
}
```

---

## 📸 Capturas de Pantalla

### Login / Registro

<p align="center">
  <img src="https://raw.githubusercontent.com/Pompinchuz/bunker_hr/refs/heads/main/celulares/login-quizz.png" alt="Reporte Administrador" width="600"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Pompinchuz/bunker_hr/refs/heads/main/celulares/registrarse.png" alt="Reporte Administrador" width="600"/>
</p>

*Interfaz moderna con gradientes morado-azul*

### Dashboard Estudiante

<p align="center">
  <img src="https://raw.githubusercontent.com/Pompinchuz/bunker_hr/refs/heads/main/celulares/reporte_notas.png" alt="Reporte Administrador" width="600"/>
</p>


### Quiz Interface
<p align="center">
  <img src="https://raw.githubusercontent.com/Pompinchuz/bunker_hr/refs/heads/main/celulares/quizzim.png" alt="Reporte Administrador" width="600"/>
</p>

*Las opciones se vuelven verdes (correctas) o rojas (incorrectas)*

### Panel de Administración
<p align="center">
  <img src="https://github.com/Pompinchuz/bunker_hr/blob/main/celulares/panel-administracion.png?raw=true" alt="Reporte Administrador" width="600"/>
</p>



---

## 🔒 Seguridad

### JWT (JSON Web Tokens)
- **Algoritmo**: HS256
- **Duración**: 24 horas (86400000 ms)
- **Payload**: userId, username, role
- **Almacenamiento**: localStorage (cliente)

### Protección de Rutas
- Todas las rutas de `/admin/*` requieren rol ADMINISTRADOR
- Todas las rutas de `/reports/all-results` y `/reports/general-stats` requieren rol ADMINISTRADOR
- Los estudiantes solo pueden acceder a sus propios resultados

### Validaciones Backend
- Verificación de token en cada petición protegida
- Validación de roles antes de ejecutar acciones
- Validación de propiedad de recursos (usuarios solo pueden modificar sus datos)

### Contraseñas
⚠️ **IMPORTANTE**: En producción, implementar:
- Hashing de contraseñas con BCrypt
- Validación de fortaleza de contraseñas
- Rate limiting en login
- HTTPS obligatorio

**Ejemplo con BCrypt:**
```java
// En UsuariosService.java
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

public Usuarios register(Usuarios usuario) {
    usuario.setPassword(encoder.encode(usuario.getPassword()));
    return usuariosRepository.save(usuario);
}

public Usuarios login(String username, String password) {
    Usuarios usuario = usuariosRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    
    if (encoder.matches(password, usuario.getPassword())) {
        return usuario;
    }
    throw new RuntimeException("Credenciales inválidas");
}
```

---

## 🧪 Testing

### Backend Tests
```bash
# Ejecutar todos los tests
mvn test

# Tests específicos
mvn test -Dtest=AuthControllerTest
mvn test -Dtest=QuestionServiceTest
```

### Frontend Tests
```bash
# Instalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Ejecutar tests
npm test
```

---

## 🚀 Deployment

### Backend (Spring Boot)

#### Generar JAR
```bash
mvn clean package
java -jar target/quizzutp-0.0.1-SNAPSHOT.jar
```

#### Docker
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/quizzutp-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Frontend (React)

#### Build de Producción
```bash
npm run build
```

#### Servir con nginx
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    
    location / {
        root /usr/share/nginx/html;
        try_files $uri /index.html;
    }
    
    location /api {
        proxy_pass http://backend:8080;
    }
}
```

---

## 🤝 Contribución

### Cómo Contribuir

1. **Fork** el proyecto
2. Crear una rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un **Pull Request**

### Estándares de Código

#### Commits (Conventional Commits)
```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato/estilo
refactor: refactorización
test: tests
chore: tareas de mantenimiento
```

#### Java (Backend)
- Seguir convenciones de Spring Boot
- Usar Lombok para reducir boilerplate
- Documentar métodos públicos con Javadoc
- Nombres descriptivos en inglés

#### JavaScript (Frontend)
- Usar ES6+ features
- Componentes funcionales con Hooks
- Nombres de componentes en PascalCase
- Nombres de funciones en camelCase

---

## 📝 Roadmap

### Versión 1.1 (Próxima)
- [ ] Hashing de contraseñas con BCrypt
- [ ] Límite de tiempo por pregunta
- [ ] Categorías de preguntas
- [ ] Modo práctica vs modo examen
- [ ] Exportar reportes a PDF/Excel

### Versión 1.2
- [ ] Sistema de logros y badges
- [ ] Ranking de estudiantes
- [ ] Modo multijugador en tiempo real
- [ ] Integración con Canvas/Moodle
- [ ] Notificaciones por email

### Versión 2.0
- [ ] App móvil (React Native)
- [ ] IA para generar preguntas
- [ ] Análisis de aprendizaje con gráficos
- [ ] Sistema de recomendaciones personalizadas

---

## 🐛 Issues Conocidos

- [ ] El botón "Volver al inicio" recarga la página completa (usar navegación de React Router)
- [ ] Las contraseñas se almacenan en texto plano (implementar BCrypt)
- [ ] No hay paginación en la tabla de preguntas del admin
- [ ] Falta validación de email en el frontend

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2024 Quiz UTP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👥 Autores

- **JESÚS ANTONIO HUILLA ROSILLO JESÚS ANTONIO** - *Desarrollo Backend* - [@tu-github](https://github.com/Pompinchuz)
- **SANTISTEBAN COICO STEFANO** - *Desarrollo Frontend* - [@compañero-github](https://github.com/stefano1001)

---

## 🙏 Agradecimientos

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [JWT.io](https://jwt.io/)
- [Kahoot!](https://kahoot.com/) - Inspiración del diseño
- [Shields.io](https://shields.io/) - Badges del README

---

## 📞 Contacto

- **Email**: huillajesusantonio@gmail.com.com
- **GitHub Issues**: [https://github.com/Pompinchuz/quizzutp/issues](https://github.com/Pompinchuz/Web-QuizzUTP/issues)


---

## 📊 Estadísticas del Proyecto

![GitHub repo size](https://img.shields.io/github/repo-size/Pompinchuz/Web-QuizzUTP)
![GitHub contributors](https://img.shields.io/github/contributors/Pompinchuz/Web-QuizzUTP)
![GitHub stars](https://img.shields.io/github/stars/Pompinchuz/Web-QuizzUTP?style=social)
![GitHub forks](https://img.shields.io/github/forks/Pompinchuz/Web-QuizzUTP?style=social)
![GitHub issues](https://img.shields.io/github/issues/Pompinchuz/Web-QuizzUTP)
![GitHub last commit](https://img.shields.io/github/last-commit/Pompinchuz/Web-QuizzUTP)

---

<div align="center">

### ⭐ Si este proyecto te ayudó, dale una estrella en GitHub ⭐

**Hecho con ❤️ por estudiantes de UTP**

[⬆ Volver arriba](#-quiz-utp---sistema-de-evaluación-de-programación)

</div>
