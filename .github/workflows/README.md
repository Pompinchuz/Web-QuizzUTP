# CI/CD - Ejecución Automática de Pruebas

Este directorio contiene los workflows de GitHub Actions para la ejecución automática de pruebas en el proyecto **Web-QuizzUTP**.

## 📋 Workflows Configurados

### `tests.yml` - Ejecución Automática de Pruebas

Este workflow se ejecuta automáticamente en cada **push** y **pull request** a cualquier rama del repositorio.

#### 🎯 Objetivos

1. **Garantizar la calidad del código** mediante la ejecución automática de pruebas
2. **Detectar errores tempranamente** antes de que lleguen a producción
3. **Validar que el código cumpla con los estándares** definidos (linting)
4. **Verificar que el proyecto se compile correctamente**

## 🏗️ Estructura del Workflow

El workflow consta de 3 jobs principales:

### 1️⃣ Frontend Tests (React + Vitest)

Ejecuta las siguientes tareas para el frontend:

- ✅ **Checkout del código**: Descarga el código del repositorio
- ✅ **Configuración de Node.js 20**: Instala Node.js y configura caché
- ✅ **Instalación de dependencias**: `npm ci`
- ✅ **Linting**: `npm run lint` - Verifica calidad de código
- ✅ **Pruebas unitarias**: `npm run test:run` - Ejecuta tests con Vitest
- ✅ **Cobertura de código**: `npm run test:coverage` - Genera reporte
- ✅ **Build**: `npm run build` - Compila el proyecto

**Tecnologías utilizadas:**
- Node.js 20
- Vitest (framework de testing)
- ESLint (linter)
- React Testing Library

### 2️⃣ Backend Tests (Spring Boot + JUnit)

Ejecuta las siguientes tareas para el backend:

- ✅ **Checkout del código**: Descarga el código del repositorio
- ✅ **Configuración de JDK 17**: Instala Java 17 (Temurin)
- ✅ **Ejecución de pruebas**: `./mvnw test` - Ejecuta tests con JUnit
- ✅ **Build**: `./mvnw clean package` - Compila el proyecto

**Tecnologías utilizadas:**
- Java 17 (Temurin)
- Maven
- Spring Boot Test
- JUnit 5

### 3️⃣ Status Check

Verifica el estado general de todas las pruebas y reporta si alguna falló.

## 🚀 Disparadores (Triggers)

El workflow se ejecuta automáticamente en los siguientes eventos:

```yaml
on:
  push:
    branches: ['**']  # Cualquier push a cualquier rama
  pull_request:
    branches: ['**']  # Cualquier PR a cualquier rama
```

### Ejemplos de cuándo se ejecuta:

- ✅ Haces `git push` a cualquier rama
- ✅ Alguien crea un Pull Request
- ✅ Se actualiza un Pull Request existente
- ✅ Se hace merge a main, develop, o cualquier rama

## 📊 Visualización de Resultados

### En GitHub

1. Ve a la pestaña **"Actions"** de tu repositorio
2. Selecciona el workflow **"Ejecución Automática de Pruebas"**
3. Verás el estado de cada ejecución:
   - ✅ **Verde**: Todas las pruebas pasaron
   - ❌ **Rojo**: Algunas pruebas fallaron
   - 🟡 **Amarillo**: En ejecución

### En Pull Requests

Los resultados aparecerán automáticamente en cada PR:
- ✅ **Checks passed**: Puedes hacer merge
- ❌ **Checks failed**: Revisa los errores antes de hacer merge

## 🛠️ Ejecución Local

Antes de hacer push, puedes ejecutar las pruebas localmente:

### Frontend

```bash
cd frontend
npm install
npm run lint          # Verificar código
npm run test:run      # Ejecutar tests
npm run test:coverage # Ver cobertura
npm run build         # Compilar
```

### Backend

```bash
cd backend
./mvnw test           # Ejecutar tests
./mvnw clean package  # Compilar
```

## 📈 Mejores Prácticas

1. **Ejecuta las pruebas localmente** antes de hacer push
2. **Revisa los errores del workflow** si falla
3. **No hagas merge de PRs** con pruebas fallidas
4. **Mantén la cobertura de tests** alta
5. **Corrige los warnings del linter** antes de commit

## 🔧 Personalización

### Cambiar la versión de Node.js

Edita el archivo `tests.yml`:

```yaml
- name: Configurar Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Cambia aquí la versión
```

### Cambiar la versión de Java

```yaml
- name: Configurar JDK 17
  uses: actions/setup-java@v4
  with:
    java-version: '17'  # Cambia aquí la versión
```

### Ejecutar solo en ramas específicas

```yaml
on:
  push:
    branches: ['main', 'develop']  # Solo main y develop
```

## 🐛 Solución de Problemas

### Error: "npm ci no puede encontrar package-lock.json"

- Asegúrate de tener `package-lock.json` commiteado
- O cambia `npm ci` por `npm install` en el workflow

### Error: "Tests fallan en CI pero pasan localmente"

- Verifica variables de entorno
- Revisa diferencias en versiones de Node/Java
- Asegúrate de que todos los archivos necesarios estén commiteados

### Error: "Maven wrapper no tiene permisos"

```bash
cd backend
chmod +x mvnw
git add mvnw
git commit -m "fix: agregar permisos de ejecución a mvnw"
```

## 📚 Referencias

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vitest Documentation](https://vitest.dev/)
- [Spring Boot Testing](https://spring.io/guides/gs/testing-web/)
- [Maven Testing](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html)

## 💡 Próximos Pasos

Considera agregar:

- ✨ **Deployment automático** después de que pasen las pruebas
- ✨ **Notificaciones** por Slack/Discord cuando fallen tests
- ✨ **Análisis de código estático** (SonarQube)
- ✨ **Tests de integración** y **E2E**
- ✨ **Publicación de reportes de cobertura** en CodeCov
