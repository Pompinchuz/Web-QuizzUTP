import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Archivos a ignorar
  {
    ignores: [
      'dist',
      'build',
      'node_modules',
      '*.config.js',
      'vite.config.js',
      'coverage',
    ],
  },

  // Configuración base de JavaScript
  js.configs.recommended,

  // Configuración para archivos JS/JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Reglas de React
      'react/jsx-uses-react': 'off', // No necesario en React 17+
      'react/react-in-jsx-scope': 'off', // No necesario en React 17+
      'react/jsx-uses-vars': 'error', // Detecta variables usadas en JSX
      'react/prop-types': 'off', // Desactivar si no usas PropTypes

      // Reglas de React Hooks
      ...reactHooks.configs.recommended.rules,

      // Regla de React Refresh para Vite
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Reglas generales de JavaScript
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'no-duplicate-imports': 'error',

      // Reglas de código limpio
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'curly': ['error', 'all'],
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'indent': ['error', 2, { SwitchCase: 1 }],

      // Reglas específicas de React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]
