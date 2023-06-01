import store from '@/store'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
// 懒加载
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods')
const Login = () => import('@/views/login')
const Callback = () => import('@/views/login/callback.vue')
const Cart = () => import('@/views/cart')
const Checkout = () => import('@/views/member/pay/Checkout.vue')
const Pay = () => import('@/views/member/pay')
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
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        // 下单结算
        path: '/member/checkout',
        component: Checkout
      },
      {
        // 支付
        path: '/member/par',
        component: Pay
      }
    ]
  },
  {
    // 登录页面
    path: '/login',
    component: Login
  },
  {
    // 联合登录页面
    path: '/login/callback',
    component: Callback
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

// 前置导航守卫
router.beforeEach((to, from, next) => {
  const { token } = store.state.user.profile
  // to:从哪来
  // from：到哪去
  if (to.path.startsWith('/member') && !token) {
    // redirectUrl：回调地址
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})
export default router
