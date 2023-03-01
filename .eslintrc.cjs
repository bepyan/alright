module.exports = {
  root: true,
  globals: {
    kakao: true,
  },
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['unused-imports', 'simple-import-sort'],
  settings: {
    tailwindcss: {
      callees: ['cn'],
    },
  },
  rules: {
    // https://github.com/sweepline/eslint-plugin-unused-imports
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // https://github.com/lydell/eslint-plugin-simple-import-sort
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^\\u0000'], ['^@?\\w'], ['^~/'], ['^\\.']],
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    // https://nextjs.org/docs/basic-features/eslint
    'react-hooks/exhaustive-deps': 'off',
    'no-html-link-for-pages': 'off',
  },
};
