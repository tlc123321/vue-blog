/**
* 文件：AboutView/index.vue
* 功能：关于页面，展示博主信息和网站介绍
* 作者：tlc
* 创建时间：2024-01-20
*/

<template>
  <div class="min-h-screen bg-pink-50">
    <!-- 主要内容区 -->
    <div class="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <!-- 博主信息卡片 -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8 transform hover:scale-105 transition-transform duration-300">
        <div class="flex flex-col items-center">
          <img :src="authorAvatar" alt="作者头像" class="w-32 h-32 rounded-full mb-6 object-cover border-4 border-pink-200">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">萌萌酱</h1>
          <p class="text-pink-500 text-lg mb-4">二次元爱好者 & 前端开发者</p>
          <div class="flex space-x-4 mb-6">
            <a href="#" class="text-gray-600 hover:text-pink-500 transition-colors duration-300">
              <i class="fab fa-github text-2xl"></i>
            </a>
            <a href="#" class="text-gray-600 hover:text-pink-500 transition-colors duration-300">
              <i class="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" class="text-gray-600 hover:text-pink-500 transition-colors duration-300">
              <i class="fab fa-bilibili text-2xl"></i>
            </a>
          </div>
          <p class="text-gray-600 text-center leading-relaxed">
            热爱动漫与编程的二次元少女，在这里分享各种有趣的动漫相关内容。
            希望通过这个博客，能和大家一起探讨动漫的魅力，分享编程的乐趣。
          </p>
        </div>
      </div>

      <!-- 技能展示 -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">技能树</h2>
        <div class="grid grid-cols-2 gap-6">
          <div v-for="(skill, index) in skills" :key="index" class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
              <i :class="skill.icon" class="text-2xl text-pink-500"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-800">{{ skill.name }}</h3>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-pink-500 h-2.5 rounded-full" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 兴趣爱好 -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">兴趣爱好</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="(hobby, index) in hobbies" :key="index" 
               class="flex flex-col items-center p-4 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors duration-300">
            <i :class="hobby.icon" class="text-3xl text-pink-500 mb-2"></i>
            <span class="text-gray-700">{{ hobby.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const authorAvatar = 'https://ai-public.mastergo.com/ai/img_res/9b5f197c6e6ff47ff99af783b7fb7d1e.jpg';

const skills = ref([
  { name: 'Vue.js', level: 90, icon: 'fab fa-vuejs' },
  { name: 'JavaScript', level: 85, icon: 'fab fa-js' },
  { name: 'HTML/CSS', level: 80, icon: 'fab fa-html5' },
  { name: 'Node.js', level: 75, icon: 'fab fa-node-js' },
  { name: 'UI设计', level: 70, icon: 'fas fa-palette' },
  { name: '动漫鉴赏', level: 95, icon: 'fas fa-film' }
]);

const hobbies = ref([
  { name: '动漫', icon: 'fas fa-film' },
  { name: '编程', icon: 'fas fa-code' },
  { name: '绘画', icon: 'fas fa-paint-brush' },
  { name: '游戏', icon: 'fas fa-gamepad' },
  { name: '音乐', icon: 'fas fa-music' },
  { name: '摄影', icon: 'fas fa-camera' },
  { name: '阅读', icon: 'fas fa-book' },
  { name: '旅行', icon: 'fas fa-plane' }
]);
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style> 