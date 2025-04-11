/**
* 文件：JourneyView/index.vue
* 功能：二次元风格的文章列表页面
* 作者：tlc
* 创建时间：2024-01-20
*/

<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div class="min-h-screen bg-pink-50">

    <!-- 主要内容区 -->
    <div class="max-w-7xl mx-auto px-4 pt-24 pb-12 flex gap-8">
      <!-- 文章列表 -->
      <div class="flex-1">
        <div class="grid grid-cols-1 gap-6">
          <article v-for="(post, index) in posts" :key="index" 
                   class="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-300">
            <div class="h-48 overflow-hidden">
              <img :src="post.image" :alt="post.title" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
              <div class="flex items-center space-x-4 mb-4">
                <span class="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">{{ post.category }}</span>
                <span class="text-gray-500 text-sm">{{ post.date }}</span>
              </div>
              <h2 class="text-xl font-bold mb-3 text-gray-800">{{ post.title }}</h2>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center space-x-4">
                  <span class="flex items-center">
                    <el-icon class="mr-1"><View /></el-icon>
                    {{ post.views }}
                  </span>
                  <span class="flex items-center">
                    <el-icon class="mr-1"><Star /></el-icon>
                    {{ post.likes }}
                  </span>
                </div>
                <button class="text-pink-500 hover:text-pink-600 !rounded-button whitespace-nowrap">
                  阅读全文
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="w-80 space-y-6">
        <!-- 博主信息 -->
        <div class="bg-white rounded-lg p-6 shadow-md">
          <div class="flex flex-col items-center">
            <img :src="authorAvatar" alt="作者头像" class="w-24 h-24 rounded-full mb-4 object-cover">
            <h3 class="text-lg font-bold mb-2">萌萌酱</h3>
            <p class="text-gray-600 text-center text-sm">热爱动漫与编程的二次元少女，分享各种有趣的动漫相关内容~</p>
          </div>
        </div>

        <!-- 分类导航 -->
        <div class="bg-white rounded-lg p-6 shadow-md">
          <h3 class="text-lg font-bold mb-4">文章分类</h3>
          <div class="space-y-3">
            <a v-for="(category, index) in categories" :key="index" href="#"
               class="flex items-center justify-between group">
              <span class="text-gray-600 group-hover:text-pink-500 transition-colors duration-300">{{ category.name }}</span>
              <span class="text-sm text-gray-500">{{ category.count }}</span>
            </a>
          </div>
        </div>

        <!-- 热门文章 -->
        <div class="bg-white rounded-lg p-6 shadow-md">
          <h3 class="text-lg font-bold mb-4">热门文章</h3>
          <div class="space-y-4">
            <a v-for="(article, index) in hotArticles" :key="index" href="#"
               class="flex items-start space-x-3 group">
              <img :src="article.image" :alt="article.title" class="w-20 h-20 rounded object-cover">
              <div>
                <h4 class="text-sm font-medium group-hover:text-pink-500 transition-colors duration-300 line-clamp-2">
                  {{ article.title }}
                </h4>
                <p class="text-xs text-gray-500 mt-1">{{ article.views }} 阅读</p>
              </div>
            </a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { View, Star } from '@element-plus/icons-vue';

const logoUrl = 'https://ai-public.mastergo.com/ai/img_res/e6a23f65f37dca835b1ef0e871042d47.jpg';
const authorAvatar = 'https://ai-public.mastergo.com/ai/img_res/9b5f197c6e6ff47ff99af783b7fb7d1e.jpg';

const navItems = ['首页', '动漫推荐', '漫评', '作品集', '关于我'];

const posts = ref([
  {
    title: '《进击的巨人》最终季完结篇深度解析',
    excerpt: '在这篇文章中，我们将深入探讨《进击的巨人》最终季的主题、角色发展以及故事结构，看看这部史诗级作品如何完美收官。',
    category: '漫评',
    date: '2024-03-15',
    views: '2.3k',
    likes: 156,
    image: 'https://ai-public.mastergo.com/ai/img_res/143c87ec062059f972994e58509d889e.jpg'
  },
  {
    title: '2024年春季新番导视：不容错过的十部作品',
    excerpt: '春季新番即将来临，本文为大家精选了十部最值得期待的作品，包括续作、原创及改编作品，带你提前了解这个季度的精彩内容。',
    category: '动漫推荐',
    date: '2024-03-10',
    views: '1.8k',
    likes: 142,
    image: 'https://ai-public.mastergo.com/ai/img_res/6e67d3e90e5cf5988f8159a592837d3b.jpg'
  },
  {
    title: '宫崎骏动画中的环保主题探讨',
    excerpt: '从《风之谷》到《红猪》，再到《幽灵公主》，本文将探讨宫崎骏作品中始终贯穿的环保意识与人性思考。',
    category: '动漫研究',
    date: '2024-03-05',
    views: '3.1k',
    likes: 289,
    image: 'https://ai-public.mastergo.com/ai/img_res/60c5eeead85250da056a6627d8478c6a.jpg'
  }
]);

const categories = [
  { name: '动漫推荐', count: 42 },
  { name: '漫评', count: 38 },
  { name: '动漫研究', count: 25 },
  { name: '新番导视', count: 18 },
  { name: '作品集', count: 15 }
];

const hotArticles = [
  {
    title: '《咒术回战》第二季终极分析：五条悟的角色魅力',
    views: '5.6k',
    image: 'https://ai-public.mastergo.com/ai/img_res/7048b66441ff3a589b533f4f850953c4.jpg'
  },
  {
    title: '从《鬼灭之刃》看新生代动画的制作革新',
    views: '4.2k',
    image: 'https://ai-public.mastergo.com/ai/img_res/3cc6a256d29a163818f043fcf7f3bb64.jpg'
  },
  {
    title: '细田守新作《未来的未来》影评',
    views: '3.8k',
    image: 'https://ai-public.mastergo.com/ai/img_res/fa2a41304964c52ef006723453458bdb.jpg'
  }
];
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>


