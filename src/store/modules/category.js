// category-store模块
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
/* state */
const state = () => ({
  // 分类信息集合，要保证初始化有数据，不然有白屏，这个是自定义的数据，真正的数据需要请求
  list: topCategory.map((item) => ({ name: item }))
})
/* mutations */
const mutations = {
  // 请求到时，替换该数据
  async SET_LIST(state, payload) {
    state.list = payload
  },
  SHOW(state, item) {
    const category = state.list.find((category) => category.id === item.id)
    //  find会对原数组进行修改
    category.open = true
  },
  HIDE(state, item) {
    const category = state.list.find((category) => category.id === item.id)
    category.open = false
  }
}
/* actions */
const actions = {
  // 请求数据,在Layout组件请求
  async getList(context) {
    const { result } = await findAllCategory()
    result.forEach((item) => {
      // 添加控制二级分类的开关
      item.open = false
    })
    // 修改数据
    context.commit('SET_LIST', result)
  }
}
/* getters */
const getters = {}

export default {
  // 开启模块命名空间
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
