<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div :class="{'bg-gray-900': isDark}" class="min-h-screen transition-colors duration-300 relative overflow-hidden">
    <div class="absolute inset-0 w-full h-full z-0">
      <el-image
        src="https://ai-public.mastergo.com/ai/img_res/5dd68bf4bbe70a5b9397b2e00146074c.jpg"
        class="w-full h-full object-cover opacity-20" fit="cover" />
    </div>

    <div class="relative z-10">
      <!-- 导航栏 -->
      <nav class="fixed w-full backdrop-blur-md bg-white/40 dark:bg-gray-900/40 z-50 border-b border-gray-100 dark:border-gray-800">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <el-avatar :size="40" :src="logoUrl" class="object-cover" />
            <span class="text-xl font-bold text-gray-800 dark:text-white">陈思行的博客</span>
          </div>
          <div class="flex items-center space-x-8">
            <el-menu mode="horizontal" :ellipsis="false" class="border-none">
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="2">文章</el-menu-item>
              <el-menu-item index="3">关于</el-menu-item>
            </el-menu>
            <el-button class="rotate" @click="toggleTheme" circle>
              <el-icon><Moon v-if="!isDark" /><Sunny v-else /></el-icon>
            </el-button>
          </div>
        </div>
      </nav>

      <!-- Hero区域 -->
      <header class="pt-32 pb-16 px-6">
        <div class="container mx-auto text-center">
          <div class="mb-6">
            <AvatarComponent :avatarUrl="heroLogoUrl" />
          </div>
          
          <!-- 时钟组件 -->
          <div class="inline-flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 shadow-lg">
            <div class="flex items-center space-x-2 text-4xl font-mono">
              <span class="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-lg">{{time.hours}}</span>
              <span class="text-gray-800 dark:text-white">:</span>
              <span class="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-lg">{{time.minutes}}</span>
              <span class="text-gray-800 dark:text-white">:</span>
              <span class="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-lg">{{time.seconds}}</span>
            </div>
          </div>

          <h1 class="text-4xl font-bold mt-6 mb-4 text-gray-800 dark:text-white">探索技术的无限可能</h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            分享编程技术、设计思考和生活感悟，让我们一起在技术的海洋中探索
          </p>
        </div>
      </header>

      <!-- 文章列表 -->
      <main class="container mx-auto px-6 py-12">
        <el-row :gutter="20">
          <PostCard v-for="(post, index) in posts" :key="index" :post="post" />
        </el-row>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted } from 'vue';
import { Moon, Sunny } from '@element-plus/icons-vue';
import AvatarComponent from '@/components/AvatarComponent.vue';
import PostCard from '@/components/PostCard.vue';

const state = reactive({
  isDark: false,
  logoUrl: 'https://ai-public.mastergo.com/ai/img_res/b375bfab3b410e07272122ec00a8c48a.jpg',
  heroLogoUrl: 'https://ai-public.mastergo.com/ai/img_res/c1902fa44deafe8f6f475db2b472bf9b.jpg',
  posts: [
    {
      title: '深入理解 Vue.js 响应式原理',
      description: '探讨 Vue.js 框架中响应式系统的实现机制，以及如何更好地利用这一特性开发高性能的前端应用。',
      category: '前端开发',
      date: '2024-01-15',
      image: 'https://ai-public.mastergo.com/ai/img_res/fb37e1a856c56cb7d21fcd4dde025bcb.jpg'
    },
    {
      title: '现代化前端工程化实践',
      description: '分享在大型前端项目中的工程化实践经验，包括构建工具、自动化测试、持续集成等关键话题。',
      category: '工程化',
      date: '2024-01-10',
      image: 'https://ai-public.mastergo.com/ai/img_res/ba298a86b0be2592c13bc23a6ee51a1f.jpg'
    },
    {
      title: '设计系统的构建与维护',
      description: '探讨如何构建和维护一个可扩展的设计系统，确保产品视觉和交互的一致性。',
      category: '设计系统',
      date: '2024-01-05',
      image: 'https://ai-public.mastergo.com/ai/img_res/d7f68a2b174594d64ec1070d4c3f0c9f.jpg'
    }
  ]
});

const time = reactive({
  hours: '00',
  minutes: '00',
  seconds: '00'
});

const { isDark, logoUrl, heroLogoUrl, posts } = toRefs(state);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const updateTime = () => {
  const now = new Date();
  time.hours = String(now.getHours()).padStart(2, '0');
  time.minutes = String(now.getMinutes()).padStart(2, '0');
  time.seconds = String(now.getSeconds()).padStart(2, '0');
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<style scoped>
.dark {
  color-scheme: dark;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate :deep(.el-icon) {
  animation: rotate 3s linear infinite;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

:deep(.el-menu) {
  --el-menu-bg-color: transparent !important;
  --el-menu-hover-bg-color: transparent !important;
}

:deep(.el-menu-item) {
  color: var(--el-text-color-regular);
}

:deep(.el-menu-item.is-active) {
  color: var(--el-color-primary);
}

:deep(.el-menu--horizontal .el-menu-item) {
  border-bottom: none !important;
}
</style>

