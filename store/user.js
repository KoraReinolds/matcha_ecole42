import API from '~/api'

export const state = () => ({
  user: null,
})
export const getters = {
  USER: (state) => state.user,
}
export const mutations = {
  SET_USER: (state, user) => state.user = user,
  TOGGLE_BLOCK: (state) => state.user.isBlocked = !state.user.isBlocked,
}
export const actions = {

  async BAN ({ dispatch }, login) {
    const res = await this.$axios.$post(`/fake-user`, { login })
    if (res.type === 'ok') {
      dispatch('history/PUSH_POP_WINDOW', {
        ...res,
        message: 'Сообщение о нарушении отправлено',
      }, { root: true })
    }
  },

  async BLOCK ({ commit, dispatch }, data) {
    const res = await this.$axios.$post(`/blacklist/save`, data)
    if (res.type === 'ok') {
      commit('TOGGLE_BLOCK')
      dispatch('history/PUSH_POP_WINDOW', {
        ...res,
        message: `Пользователь ${ data.isBlocked ? 'за' : 'раз' }блокирован`,
      }, { root: true })
    }
  },

  async GET_USER ({ commit, state, rootState, dispatch }, login) {
    console.log(rootState.auth.user.login)
    const res = login === rootState.auth.user.login ?
      { type: 'ok', data: rootState.auth.user } :
      await this.$axios.$get(`profile-get/${login}`, { login })
    if (res.type === 'ok') {
      commit('SET_USER', res.data)
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true })
    return res
  },
}