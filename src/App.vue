<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="fixed w-full backdrop-blur-md bg-white/40 z-50 border-b border-gray-100">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <el-avatar :size="40" :src="logoUrl" class="object-cover" />
          <span class="text-xl font-bold text-gray-800">超超のblog</span>
        </div>
        <div class="flex items-center space-x-8">
          <!-- 导航链接 -->
          <div class="flex items-center space-x-6">
            <router-link 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="nav-link"
              :class="{ 'active': route.path === item.path }"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <SakuraEffect />
    <RippleEffect />
    <ControlPanel />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import RippleEffect from './components/RippleEffect.vue';
import ControlPanel from './components/ControlPanel.vue';
import SakuraEffect from './components/SakuraEffect.vue';

const route = useRoute();
const logoUrl = 'https://ai-public.mastergo.com/ai/img_res/b375bfab3b410e07272122ec00a8c48a.jpg';

const navItems = [
  { name: '首页', path: '/home' },
  { name: '旅程', path: '/journey' },
  { name: '关于', path: '/about' }
];

</script>

<style>
/* 导航链接样式 */
.nav-link {
  font-size: 1rem;
  color: var(--el-text-color-regular);
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.nav-link:hover {
  color: #ff69b4;
}

.nav-link.active {
  color: #ff69b4;
}

/* 隐藏滚动条但保持滚动功能 */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

*::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style> 