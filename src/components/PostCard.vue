<template>
  <el-col :xs="24" :sm="12" :md="8" class="mb-6">
    <el-card class="h-full transition-transform duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer" :body-style="{ padding: '0px' }">
      <el-image :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
      <div class="p-6">
        <div class="flex items-center space-x-2 mb-4">
          <el-tag size="small" type="info">{{ post.category }}</el-tag>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
        </div>
        <h2 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">{{ post.title }}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ post.description }}</p>
        <el-button type="primary" text class="!rounded-button whitespace-nowrap">
          阅读更多<el-icon class="ml-2"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </el-card>
  </el-col>
</template>

<script setup>
import { defineProps } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.w-full {
  width: 100%;
}

.h-48 {
  height: 12rem;
}

.object-cover {
  object-fit: cover;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.cursor-pointer {
  cursor: pointer;
}

.transition-transform {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style> 