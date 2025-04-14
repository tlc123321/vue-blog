<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div :class="{'bg-gray-900': isDark}" class="min-h-screen transition-colors duration-300 relative overflow-hidden">
    <div class="absolute inset-0 w-full h-full z-0">
      <el-image
        src="https://ai-public.mastergo.com/ai/img_res/5dd68bf4bbe70a5b9397b2e00146074c.jpg"
        class="w-full h-full object-cover opacity-20" fit="cover" />
    </div>

    <div class="relative z-10">
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
          
          <!-- 添加二次元风格的开始旅程按钮 -->
          <el-button 
            type="primary" 
            class="mt-8 anime-btn"
            size="large" 
            @click="startJourney"
          >
            开始旅程！
          </el-button>
        </div>
      </header>

      <!-- 文章列表 -->
      <main class="container mx-auto px-6 py-12">
        <el-row :gutter="20">
          <PostCard 
            v-for="post in posts" 
            :key="post.slug" 
            :post="post" 
            @click="handlePostClick(post)"
          />
        </el-row>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted } from 'vue';
import AvatarComponent from '@/components/AvatarComponent.vue';
import PostCard from '@/components/PostCard.vue';
import { useRouter } from 'vue-router';
import { homePosts } from '@/config/posts';

const router = useRouter();

const state = reactive({
  isDark: false,
  logoUrl: 'https://ai-public.mastergo.com/ai/img_res/b375bfab3b410e07272122ec00a8c48a.jpg',
  heroLogoUrl: 'https://ai-public.mastergo.com/ai/img_res/c1902fa44deafe8f6f475db2b472bf9b.jpg',
  posts: homePosts
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

const startJourney = () => {
  router.push('/journey');
};

const handlePostClick = (post) => {
  router.push({
    name: 'post',
    params: { slug: post.slug }
  });
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

/* 二次元风格按钮 */
.anime-btn {
  background: linear-gradient(45deg, #ff69b4, #ff99cc) !important;
  border: none !important;
  padding: 12px 30px !important;
  font-size: 1.1rem !important;
  font-weight: bold !important;
  letter-spacing: 2px;
  border-radius: 25px !important;
  box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.anime-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 105, 180, 0.6);
  background: linear-gradient(45deg, #ff99cc, #ff69b4) !important;
}

.anime-btn:active {
  transform: translateY(1px);
}

.anime-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: 0.5s;
}

.anime-btn:hover::before {
  left: 100%;
}

/* 暗色模式适配 */
.dark .anime-btn {
  background: linear-gradient(45deg, #ff69b4, #ff1493) !important;
}

.dark .anime-btn:hover {
  background: linear-gradient(45deg, #ff1493, #ff69b4) !important;
}
</style>

