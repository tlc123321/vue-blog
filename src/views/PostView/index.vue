<template>
  <!-- 修改容器类，确保固定位置 -->
  <div class="min-h-screen bg-gradient-to-b from-white to-pink-50">
    <div class="post-container max-w-4xl mx-auto px-6 pt-24 pb-12 relative">
      <!-- 文章头部 -->
      <header class="mb-8 slide-down">
        <!-- 标题区域 - 添加渐变背景 -->
        <div class="bg-gradient-to-r from-pink-50/90 to-purple-50/90 backdrop-blur-md p-8 rounded-2xl shadow-sm mb-8 hover:shadow-md transition-all duration-300">
          <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {{ post?.title }}
          </h1>
          
          <!-- 元信息区域 -->
          <div class="flex items-center flex-wrap gap-4 text-gray-600 mb-4">
            <time class="text-sm font-medium fade-in" style="animation-delay: 0.3s">
              {{ formatDate(post?.createdAt) }}
            </time>
            <!-- 替换为单个分类标签 -->
            <el-tag 
              v-if="post?.category"
              size="small"
              effect="light"
              class="tag-animation"
              style="animation-delay: 0.4s"
            >
              {{ post.category }}
            </el-tag>
          </div>

          <!-- 添加描述文本 -->
          <p v-if="post?.description" class="text-gray-600 text-sm leading-relaxed fade-in" style="animation-delay: 0.5s">
            {{ post.description }}
          </p>
        </div>
        
        <!-- 封面图片 -->
        <el-image 
          v-if="post?.image"
          :src="post.image" 
          class="w-full object-cover rounded-lg mb-8 shadow-lg scale-in hover:scale-[1.02] transition-transform duration-500"
        />
      </header>

      <!-- 文章内容 -->
      <article 
        class="prose prose-lg max-w-none bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm slide-up"
        v-html="renderedContent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import { ElMessage } from 'element-plus';
import { posts } from '@/config/posts';  // 导入文章配置


const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    // 包装代码块，添加复制按钮，但保持原有样式
    return `<div class="code-wrapper"><button class="copy-btn" data-code="${encodeURIComponent(str)}">复制</button><span>${md.utils.escapeHtml(str)}</span></div>`;
  }
});

const route = useRoute();
const post = ref(null);
const renderedContent = ref('');

const formatDate = (date) => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 修改复制功能的实现
const initCopyButtons = () => {
  setTimeout(() => {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const code = decodeURIComponent(button.getAttribute('data-code'));
        try {
          // 尝试使用 navigator.clipboard
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(code);
          } else {
            // 回退方案：使用 execCommand
            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }
          
          ElMessage.success('复制成功');
          button.textContent = '已复制';
          setTimeout(() => {
            button.textContent = '复制';
          }, 2000);
        } catch (err) {
          console.error(err);
          ElMessage.error('复制失败');
        }
      });
    });
  }, 100);
};

onMounted(async () => {
  try {
    post.value = posts.find(p => p.slug === route.params.slug);
    if (!post.value) {
      throw new Error('文章不存在');
    }

    // 直接渲染 markdown 内容
    renderedContent.value = md.render(post.value.component);
    
    initCopyButtons();
  } catch (error) {
    console.error('Failed to load post:', error);
    ElMessage.error(error.message || '文章加载失败');
  }
});
</script>

<style>
/* 保留原有的 Markdown 样式 */

/* 添加新的动画效果 */
.slide-down {
  animation: slideDown 0.6s ease-out forwards;
  opacity: 0;
}

.slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
  animation-delay: 0.3s;
}

.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.scale-in {
  animation: scaleIn 0.6s ease-out forwards;
  opacity: 0;
}

.tag-animation {
  animation: tagSlideIn 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes tagSlideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 添加 fadeIn 动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 确保 fade-in 类使用正确的动画 */
.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

/* 优化文章内容样式 */
.prose {
  @apply text-gray-900;
}

.code-wrapper {
  @apply pt-6 overflow-x-auto;
}

.copy-btn {
  @apply absolute top-2 right-2 bg-gray-900 text-white px-2 py-1 rounded-md text-xs cursor-pointer hover:bg-gray-700 transition-all duration-300;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  @apply font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent;
}

.prose h1 {
  @apply text-3xl mb-6;
}

.prose h2 {
  @apply text-2xl mb-4;
}

.prose h3 {
  @apply text-xl mb-3;
}

.prose p {
  @apply mb-4 leading-relaxed text-gray-700;
}

.prose code {
  @apply bg-pink-50 px-2 py-1 rounded text-pink-600 font-mono text-sm;
}

.prose pre {
  @apply bg-[#1a1b26] overflow-x-auto rounded-xl relative;
  padding: 0.75rem 1rem;
  margin: 0 0 1.5rem 0 !important; /* 使用 !important 强制应用下边距 */
}

.prose pre code {
  @apply bg-transparent text-gray-200 block font-mono text-sm leading-relaxed;
  font-family: 'JetBrains Mono', monospace;
  padding: 0;  /* 移除内边距 */
}

.prose blockquote {
  @apply border-l-4 border-pink-300 pl-4 italic my-4 bg-pink-50/50 py-2 rounded-r-lg;
}

.prose ul,
.prose ol {
  @apply list-disc list-inside my-4 space-y-2;
}

.prose a {
  @apply text-pink-600 hover:text-pink-700 hover:underline decoration-wavy decoration-pink-300 transition-all duration-300;
}

/* 优化滚动行为 */
* {
  scroll-behavior: smooth;
}

/* 添加鼠标悬停效果 */
.prose h2:hover,
.prose h3:hover {
  @apply from-pink-600 to-purple-600;
}

/* 添加日期相关样式 */
time {
  @apply text-gray-600 hover:text-pink-500 transition-colors duration-300 whitespace-nowrap;
}

/* 代码块样式优化 */
.code-block-wrapper {
  @apply relative rounded-xl overflow-hidden my-2;
}

/* 代码语法高亮优化 */
.prose code .keyword { @apply text-purple-300; }
.prose code .string { @apply text-green-300; }
.prose code .comment { @apply text-gray-500; }
.prose code .function { @apply text-blue-300; }
.prose code .number { @apply text-orange-300; }
</style> 