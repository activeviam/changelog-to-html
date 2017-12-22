'use strict';

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:all', 'plugin:node/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  plugins: ['node'],
  root: true,
  rules: {
    'capitalized-comments': 'off',
    eqeqeq: ['error', 'smart'],
    'line-comment-position': 'off',
    'linebreak-style': 'off',
    'max-statements': 'off',
    'multiline-comment-style': ['error', 'separate-lines'],
    'no-eq-null': 'off',
    'no-inline-comments': 'off',
    'no-magic-numbers': 'off',
    'no-prototype-builtins': 'off',
    'no-ternary': 'off',
    'no-underscore-dangle': 'off',
    'one-var': 'off',
    'sort-keys': ['error', 'asc', {caseSensitive: false, natural: true}],
  },
};
