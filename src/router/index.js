import { createRouter, createWebHashHistory } from 'vue-router'
// 懒加载
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods')

const routes = [
  {
    path: '/',
    component: Layout,
    // 二级路由
    children: [
      {
        path: '/',
        component: Home
      },
      {
        // 一级路由的分类路由（二级路由）
        path: '/category/:id',
        component: TopCategory
      },
      {
        // 一级路由的弹窗分类的路由（二级路由）
        path: '/category/sub/:id',
        component: SubCategory
      },
      {
        // 商品详情页
        path: '/product/:id',
        component: Goods
      }
    ]
  }
]

// 创建路由
const router = createRouter({
  // hash路由模式
  history: createWebHashHistory(),
  routes,
  // 当路由发生变化时，回到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

export default router
