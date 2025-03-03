import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import AboutView from '../views/AboutView/index.vue'

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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router