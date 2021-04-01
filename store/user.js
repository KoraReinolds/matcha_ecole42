export const state = () => ({
  user: null,
})
export const getters = {
  USER: (state) => state.user,
}
export const mutations = {
  SET_USER: (state, user) => state.user = user,
}
export const actions = {

  async GET_USER ({ commit, rootState }, login) {
    const res = login === rootState.auth.user.login ?
      await this.$axios.$get(`profile-get`, { login }) :
      await this.$axios.$get(`profile-get/${login}`, { login })
    if (res.type === 'ok') {
      commit('SET_USER', res.data)
    } else {
      
    }
    return res
  },
}