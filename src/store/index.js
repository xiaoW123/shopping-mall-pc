import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import getters from './getters'
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
// import category from './modules/category'

export default createStore({
  modules: {
    user,
    cart,
    category
  },
  // 创建的快捷访问
  getters,
  plugins: [
    createPersistedstate({
      // 本地存储名字
      key: 'shopping-mall-pc-store',
      // 本地需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
