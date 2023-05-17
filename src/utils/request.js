import axios from 'axios'
import store from '@/store'
import router from '@/router'

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const timeout = 5000
const instance = axios.create({
  baseURL,
  timeout
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 判断是否有token，并在headers.Authorization上携带token
    // 1.获取用户信息对象
    // const { profile } = store.state.user
    const profile = store.getters.profile
    console.log(profile)
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token} `
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.respinse.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      // 1. 清空无效用户信息
      // 2. 跳转到登录页
      // 3. 跳转需要传参（当前路由地址）给登录页码
      store.commit('user/SET_NICKNAME', {}) // 1. 清空无效用户信息
      // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
      // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      // encodeURIComponent 转换url编码，防止解析地址出问题
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
  }
)

// 请求工具函数
/*
function request(url, method, submitData) {
  return instance({
    url,
    method,
    // toLowerCase转化为小写
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
 */
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // toLowerCase转化为小写
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
