# Configuración de ESLint

Este proyecto utiliza **ESLint 9** con la sintaxis de configuración plana (flat config) para mantener la calidad del código y seguir las mejores prácticas de desarrollo.

## Tecnologías

- **ESLint 9.33.0**: Linter principal
- **React**: Framework de UI
- **Vite**: Build tool y servidor de desarrollo
- **React Hooks**: Plugins para validar reglas de hooks
- **React Refresh**: Plugin para hot module replacement

## Archivos de Configuración

### `eslint.config.js`

Archivo principal de configuración que utiliza la sintaxis plana de ESLint 9. Este formato reemplaza a `.eslintrc.json` y `.eslintrc.js`.

## Reglas Configuradas

### Reglas de JavaScript General

- **`no-var`**: Prohibe el uso de `var`, requiere `let` o `const`
- **`prefer-const`**: Requiere `const` cuando las variables no son reasignadas
- **`no-unused-vars`**: Error en variables no utilizadas (permite variables que comienzan con `_`)
- **`no-console`**: Advertencia en `console.log`, permite `console.warn` y `console.error`
- **`no-debugger`**: Advertencia al usar debugger
- **`prefer-arrow-callback`**: Recomienda funciones flecha en callbacks
- **`no-duplicate-imports`**: Prohibe importaciones duplicadas del mismo módulo

### Reglas de Código Limpio

- **`eqeqeq`**: Requiere `===` y `!==` en lugar de `==` y `!=`
- **`curly`**: Requiere llaves en todas las estructuras de control
- **`no-multi-spaces`**: Prohibe múltiples espacios consecutivos
- **`no-trailing-spaces`**: Prohibe espacios al final de las líneas
- **`no-multiple-empty-lines`**: Máximo 1 línea vacía consecutiva

### Reglas de Estilo

- **`comma-dangle`**: Requiere comas finales en objetos y arrays multilínea
- **`quotes`**: Requiere comillas simples (`'`) en lugar de dobles (`"`)
- **`semi`**: Prohibe punto y coma al final de las declaraciones
- **`indent`**: Requiere indentación de 2 espacios

### Reglas de React

- **`react-hooks/rules-of-hooks`**: Error si se violan las reglas de hooks
- **`react-hooks/exhaustive-deps`**: Advertencia sobre dependencias faltantes en hooks
- **`react-refresh/only-export-components`**: Advertencia si se exportan cosas además de componentes (Vite HMR)

## Archivos Ignorados

Los siguientes archivos y directorios son ignorados por ESLint:

- `dist/` - Archivos de producción
- `build/` - Archivos de build
- `node_modules/` - Dependencias
- `*.config.js` - Archivos de configuración
- `vite.config.js` - Configuración de Vite
- `coverage/` - Reportes de cobertura de tests

## Scripts Disponibles

### `npm run lint`

Ejecuta ESLint en todo el proyecto y muestra los errores y advertencias encontrados.

```bash
npm run lint
```

### `npm run lint:fix`

Ejecuta ESLint y **corrige automáticamente** los problemas que pueden ser auto-corregidos (como formato, comillas, punto y coma, etc).

```bash
npm run lint:fix
```

## Uso Recomendado

### Durante el Desarrollo

1. **Ejecuta `npm run lint:fix` periódicamente** para corregir automáticamente problemas de estilo
2. **Integra ESLint con tu editor**:
   - VSCode: Instala la extensión "ESLint"
   - WebStorm: ESLint viene integrado
   - Vim/Neovim: Usa plugins como ALE o coc-eslint

### Antes de Commit

Es recomendable ejecutar el linter antes de hacer commit:

```bash
npm run lint
```

### En CI/CD

Agrega el linting como parte del pipeline de CI/CD para asegurar que todo el código siga los estándares:

```bash
npm run lint
```

## Personalización

Si necesitas ajustar las reglas, edita el archivo `eslint.config.js`:

```javascript
rules: {
  // Cambiar el nivel de severidad: 'off', 'warn', 'error'
  'no-console': 'off', // Permite console.log en todo el proyecto

  // Personalizar opciones de una regla
  'indent': ['error', 4], // Cambiar a 4 espacios de indentación
}
```

## Solución de Problemas

### Error: "Cannot find package '@eslint/js'"

Ejecuta:
```bash
npm install
```

### Demasiados errores al principio

Usa el comando de auto-fix para corregir la mayoría:
```bash
npm run lint:fix
```

### Conflictos con Prettier

Si usas Prettier, considera instalar `eslint-config-prettier` para desactivar reglas de estilo que entren en conflicto.

## Referencias

- [Documentación oficial de ESLint](https://eslint.org/)
- [Guía de migración a ESLint 9](https://eslint.org/docs/latest/use/configure/migration-guide)
- [Reglas de ESLint](https://eslint.org/docs/rules/)
- [Plugin React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
