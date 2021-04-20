module.exports = {
  plugins: [
    '@typescript-eslint',
    'unused-imports'
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
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
    ]
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  ignorePatterns: ['node_modules/', 'build/'],
};