const { defineConfig } = require('eslint-define-config');
const vue = require('eslint-plugin-vue');
const babelParser = require('@babel/eslint-parser');
const babelPresetEnv = require.resolve('@babel/preset-env');

module.exports = defineConfig([
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [babelPresetEnv],
          plugins: ['@babel/plugin-syntax-jsx'], // 启用 JSX 解析插件
        },
      },
      globals: {
        node: true,
      },
    },
    plugins: {
      vue,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
    ignores: ['node_modules', 'dist'],
  },
]);