// user-store模块
const state = () => ({
  // 用户信息
  profile: {
    id: '',
    avatar: '',
    nickname: '',
    account: '',
    mobile: '',
    token: ''
  }
})
const mutations = {
  SET_NICKNAME(state, newvalue) {
    state.profile.nickname = newvalue
  }
}
const actions = {}
const getters = {}

export default {
  // 开启模块命名空间
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
