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

  SEND_MESSAGE ({ commit, state, rootState }, message) {
    const msg = {
      target: state.curUser.login,
      message,
    };
    API.sendMessage({
      activationCode: rootState.auth.token,
      ...msg,
    })
      .then((res) => {
        if (res.type === 'ok') {
          commit('PUSH_MESSAGE', res.data);
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  },

  GET_MESSAGES ({ commit, state, rootState }, user) {
    API.getMessages({
      activationCode: rootState.auth.token,
      login: user.login
    })
      .then((res) => {
        if (res.type === 'ok') {
          commit('SET_CUR_USER', user);
          commit('SET_MESSAGES', res.data);
          this.$router.push({ path: `/chat/${user.login}` });
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  },

  GET_CHAT_LIST ({ commit, dispatch, state, rootState }, curUserLogin) {
    API.getChatList({
      activationCode: rootState.auth.token,
    })
      .then((res) => {
        if (res.type === 'ok') {
          if (curUserLogin) {
            const user = res.data.find((user) => user.login === curUserLogin);
            if (user) dispatch('GET_MESSAGES', user);
          }
          commit('SET_USERS', res.data);
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  },

}