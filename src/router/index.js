import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import AboutView from '../views/AboutView/index.vue'
import JourneyView from '../views/JourneyView/index.vue'
import PostView from '../views/PostView/index.vue'

// 基础路由配置
const routes = [
  {
    path: '/',
    redirect: '/home', // 重定向根路径到 /home
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/journey',
    name: 'Journey',
    component: JourneyView,
  },
  {
    path: '/post/:slug',
    name: 'post',
    component: PostView,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'post') {
      // 进入文章详情页时，强制滚动到顶部并禁用平滑滚动
      return {
        top: 0,
        behavior: 'instant'  // 立即滚动，不使用平滑滚动
      }
    }
    
    // 其他路由跳转
    if (savedPosition) {
      // 如果有保存的位置（使用浏览器的后退/前进按钮时）
      return savedPosition
    } else {
      // 否则滚动到顶部
      return {
        top: 0,
        behavior: 'instant'
      }
    }
  }
})

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 在路由切换前强制滚动到顶部
  window.scrollTo(0, 0)
  next()
})

export default router