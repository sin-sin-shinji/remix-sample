import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import configPrettier from 'eslint-config-prettier';
import { fixupPluginRules } from '@eslint/compat';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules', '.cache', 'build', 'public/build', '.env'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  //react
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: pluginReact,
      import: pluginImport,
      'jsx-a11y': pluginJsxA11y,
      'react-hooks': fixupPluginRules(pluginReactHooks),
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginJsxA11y.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
    },
  },
  configPrettier,
  {
    rules: {
      'import/order': ['error'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
];
