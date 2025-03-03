# Vue 3 个人博客项目

这是一个使用 Vue 3、Vite、Element Plus 和 TailwindCSS 构建的现代化个人博客项目。

## 🌟 特性

- 💻 PC端优化设计
- 🌓 明暗主题切换
- 🌸 樱花飘落效果
- 💫 点击水波纹效果
- ⚡ Vite 构建，快速的开发体验
- 🎨 TailwindCSS 样式管理
- 📦 Pinia 状态管理
- 🚀 Vue Router 路由管理

## 🛠️ 技术栈

- Vue 3
- Vite
- Element Plus
- TailwindCSS
- Pinia
- Vue Router

## 📦 安装

```bash
# 克隆项目
git clone https://github.com/tlc123321/vue-blog.git

# 进入项目目录
cd vue-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🚀 项目结构

```
vue-blog/
├── public/
├── src/
│   ├── components/          # 组件
│   │   ├── AvatarComponent.vue
│   │   ├── ControlPanel.vue
│   │   ├── PostCard.vue
│   │   ├── RippleEffect.vue
│   │   └── SakuraEffect.vue
│   ├── views/              # 页面
│   │   ├── HomeView/
│   │   └── AboutView/
│   ├── stores/            # Pinia 状态管理
│   ├── router/            # 路由配置
│   ├── App.vue           # 根组件
│   └── main.js          # 入口文件
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
└── package.json
```

## 🎨 功能特性

### 主题切换
- 支持明暗主题切换
- 自动保存主题偏好

### 特效
- 樱花飘落效果
- 点击水波纹效果
- 可通过控制面板开关特效

### PC端优化
- 针对桌面端优化的界面设计
- 流畅的过渡动画

## 📝 开发指南

### 目录结构说明
- `components/`: 存放可复用的组件
- `views/`: 存放页面级组件
- `stores/`: Pinia 状态管理
- `router/`: Vue Router 路由配置

### 开发命令

```bash
# 开发环境
npm run dev

# 构建生产环境
npm run build

# 预览生产环境
npm run preview
```

## 📄 License

[MIT](LICENSE)
