import API from '~/api';

export const state = () => ({
  user: null,
})
export const getters = {
  USER: (state) => state.user,
  MY_PAGE: (state, getters, rootState) => state.user.login === rootState.auth.login.value,
  CHAT_AVAILABLE: (state, getters, rootState) => {
    return state.user.likeList.includes(rootState.auth.login.value) &&
    rootState.auth.likeList.includes(state.user.login);
  },
}
export const mutations = {
  SET_USER: (state, user) => state.user = user,
}
export const actions = {

  async GET_USER ({ commit, state, rootState }, login) {
    await API.getUser({
      activationCode: rootState.auth.token,
      login,
    })
      .then((res) => {
        if (res.type === 'ok') {
          console.log(res.data);
          commit('SET_USER', res.data);
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  },

}