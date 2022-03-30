// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  "extends": "next"
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': 'warn',
    'linebreak-style': 0,
    "avoidEscape": true,
    quotes: [2, 'single'],
    semi: [2, 'always'],
    'prefer-const': 'error',
    'jsx-quotes': [2, 'prefer-single'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'arrow-body-style': 0,
    'max-len': ['warn', { code: 180 }],
    'react/prop-types': 0,
  },
};
