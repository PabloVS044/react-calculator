import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const noSemicolonsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prohibits semicolons in project source files',
    },
    schema: [],
    messages: {
      forbiddenSemicolon: 'Los puntos y coma estan prohibidos en este proyecto.',
    },
  },
  create(context) {
    return {
      Program(node) {
        for (const token of context.sourceCode.getTokens(node)) {
          if (token.type === 'Punctuator' && token.value === ';') {
            context.report({
              loc: token.loc,
              messageId: 'forbiddenSemicolon',
            })
          }
        }
      },
    }
  },
}

const localPlugin = {
  rules: {
    'no-semicolons': noSemicolonsRule,
  },
}

const rubricRules = {
  'local/no-semicolons': 'error',
  'max-len': ['error', { code: 120 }],
}

export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      local: localPlugin,
    },
    rules: {
      ...rubricRules,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
  {
    files: ['vite.config.ts', '.storybook/**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      local: localPlugin,
    },
    rules: rubricRules,
  },
  {
    files: ['eslint.config.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      local: localPlugin,
    },
    rules: rubricRules,
  },
])
