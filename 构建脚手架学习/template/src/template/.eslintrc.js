module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
      browser: true,
      es6: true,
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
    'standard/computed-property-even-spacing': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-continue': 'off',
    'no-template-curly-in-string': 'off',
    'no-prototype-builtins': 'off',
    'no-misleading-character-class': 'off',
    'no-case-declarations': 'off',
    'no-async-promise-executor': 'off',
    'no-useless-catch': 'off',
    'space-before-function-paren': [
        'error',
        {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
        },
    ],
    'no-new': 0,
    //'array-bracket-spacing': ['error', 'never'],
    //'standard/array-bracket-even-spacing': ['error', 'never'],
    indent: ['error', 4],
    'no-plusplus': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
  }
}
