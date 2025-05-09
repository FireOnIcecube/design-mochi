/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    // 關閉 multi-word component name 的檢查
    'vue/multi-word-component-names': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
