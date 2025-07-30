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
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended' // ✅ 新增 prettier 支援
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
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier' // ✅ 新增 prettier 插件
  ],
  rules: {
    // ✅ 規則自訂
    // quotes: ['error', 'double'],
    'import/no-unresolved': 0,
    indent: 'off', // ❌ off 讓 prettier 處理
    '@typescript-eslint/indent': 'off',
    'prettier/prettier': ['error'] // ✅ 由 prettier 控制格式
  }
}
