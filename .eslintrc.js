module.exports = {
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    quotes: ['warn', 'single'],
    indent: [
      'warn',
      2,
      {
        'SwitchCase': 1
      }
    ],
    semi: ['warn', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  ignorePatterns: ['node_modules/', 'build/'],
};