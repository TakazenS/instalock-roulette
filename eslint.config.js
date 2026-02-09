import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      '@stylistic': stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // --- TRI AUTOMATIQUE ---
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // --- STYLE (Espaces & Point-virgules) ---
      '@stylistic/semi': ['warn', 'always'],

      // --- ESPACE Ajoute les espaces : { data } ---
      '@stylistic/object-curly-spacing': ['warn', 'always'],

      '@stylistic/indent': ['warn', 2],

      // --- QUOTES (Autorise les backticks) ---
      '@stylistic/quotes': [
        'warn',
        'single',
        { 'allowTemplateLiterals': true }
      ],
    },
  },
);