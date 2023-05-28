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
  },
  // 来源页
  redirectUrl: '/'
})
const mutations = {
  SET_USER(state, data) {
    state.profile = data
  },
  SET_NICKNAME(state, newvalue) {
    state.profile.nickname = newvalue
  },
  SET_REDIRECTURL(state, url) {
    state.redirectUrl = url
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
