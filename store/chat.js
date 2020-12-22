export const state = () => ({
  users: [],
  curUser: null,
  messages: [],
})
export const getters = {
  CUR_USER: (state) => state.curUser,
  CHAT_LIST: (state) => state.users,
  CHAT_MESSAGES: (state) => state.messages,
}
export const mutations = {
  SET_USERS: (state, list) => state.users = list,
  SET_CUR_USER: (state, user) => state.curUser = user,
  PUSH_MESSAGE: (state, message) => state.messages.push(message),
  SET_MESSAGES: (state, messages) => state.messages = messages,
}
export const actions = {

  async SEND_MESSAGE ({ commit, state, rootState, dispatch }, message) {
    const msg = {
      message: message.replace(/\n/g, '<br />'),
      toLogin: state.curUser.login,
    }
    const res = await this.$axios.$post('/chat/save', msg)
    if (res.type === 'ok') {
      commit('PUSH_MESSAGE', {
        ...msg,
        time: new Date,
        read: false,
        // fromLogin: rootState.auth.login,
      })
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true })
  },

  async GET_MESSAGES ({ commit, state, rootState, dispatch }, user) {
    const res = await this.$axios.$get(`chat/full`, {
      params: {
        toLogin: user.login,
        limit: 50,
      }
    })
    if (res.type === 'ok') {
      commit('SET_CUR_USER', user)
      commit('SET_MESSAGES', res.data)
      setTimeout(() => {
        res.data.forEach((msg) => {
          if (msg.fromLogin !== rootState.auth.user.login) {
            msg.read = true
          }
        })
        commit('SET_MESSAGES', res.data)
      }, 1000)
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true })
    return res
  },

  async GET_CHAT_LIST ({ commit, dispatch, state, rootState }) {
    const res = await this.$axios.$get('connected', {
    })
    if (res.type === 'ok') {
      commit('SET_USERS', res.data)
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true })
    return res
  },
}