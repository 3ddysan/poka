import { readFileSync } from 'node:fs';
import { sxzz } from '@sxzz/eslint-config';
import storybook from 'eslint-plugin-storybook';

const { globals } = readFileSync('./.eslintrc-auto-import.json');
export default sxzz([
  {
    ignores: [
      'dist/*',
      'storybook-static/*',
      'coverage/*',
      '.husky/*',
      'server.mjs',
      '.vscode/*',
      '.prettierrc',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals,
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
        },
      ],
      'import/no-unused-modules': 'off',
    },
  },
  {
    files: ['**/*.stories.ts', '.storybook/*'],
    plugins: {
      storybook,
    },
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['**/*.{test,spec}.ts?(x)'],
    rules: {
      'import/no-unused-modules': 'off',
    },
  },
]);
