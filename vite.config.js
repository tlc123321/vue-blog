import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Markdown from 'vite-plugin-md';

export default defineConfig({
  base: '/vue-blog/',
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // 让 Vue 处理 .md 文件
    }),
    Markdown({
      // 配置 markdown-it 选项
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // 将 markdown 转换为 Vue 组件
      transforms: {
        after: (html) => {
          return html;
        }
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
}); 