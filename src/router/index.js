import { createRouter, createWebHashHistory } from 'vue-router'
// 懒加载
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      }
    ]
  }
]

// 创建路由
const router = createRouter({
  // hash路由模式
  history: createWebHashHistory(),
  routes
})

export default router
