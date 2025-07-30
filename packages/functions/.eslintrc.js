module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      path.resolve(__dirname, './tsconfig.json'),
      path.resolve(__dirname, './tsconfig.dev.json')
    ],
    sourceType: 'module'
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/generated/**/*' // Ignore generated files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    quotes: 'off', // 統一交給 Prettier 處理
    semi: 'off', // 同上
    'comma-dangle': 'off', // Prettier 會自動處理
    'object-curly-spacing': 'off', // 不需要 ESLint 管格式
    '@typescript-eslint/explicit-module-boundary-types': 'off' // 有時太囉唆
  }
}
