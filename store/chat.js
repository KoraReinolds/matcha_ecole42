import API from '~/api';

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
      target: state.curUser.login,
      message: message.replace(/\n/g, '<br />'),
    };
    const res = await this.$axios.$post('send-message', msg)
    console.log(res)
    if (res.type === 'ok') {
      commit('PUSH_MESSAGE', {
        ...res.data,
        who: { login: rootState.auth.login },
      });
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true });
  },

  async GET_MESSAGES ({ commit, state, rootState, dispatch }, user) {
    const res = await this.$axios.$post('get-messages', {
      login: user.login
    })
    if (res.type === 'ok') {
      commit('SET_CUR_USER', user);
      commit('SET_MESSAGES', res.data);
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true });
    return res;
  },

  async GET_CHAT_LIST ({ commit, dispatch, state, rootState }) {
    const res = await this.$axios.$post('chat-list', {
    })
    if (res.type === 'ok') {
      commit('SET_USERS', res.data);
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true });
    return res;
  },
}