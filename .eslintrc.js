module.exports = {
  parser: 'babel-eslint',
  rules: {
    'react/prop-types': 1,
    'react/jsx-filename-extension': 0,
    'no-console': 0,
    'react/forbid-prop-types': 0,
  },
  extends: 'airbnb',
  env: {
    browser: true,
  },
};
