module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    // 生成器函数 *号的前后空格
    'generator-star-spacing': 'off',
    // 引号类型
    'quotes': [1, 'single'],
    'vue/no-parsing-error': [2, {'x-invalid-end-tag': false }],
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-implicit-globals': 0,
    // 'semi': 2, // 配置是否分号验证 0 不验证， 1 警告，2 错误
    'space-before-function-paren': 2,
    // 可以有声明后未被使用的变量
    'no-unused-vars': 'off'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint'
  }
}
