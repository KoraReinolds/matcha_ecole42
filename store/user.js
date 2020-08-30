import API from '~/api';

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

  async GET_USER ({ commit, state, rootState, dispatch }, login) {
    const res = await this.$axios.$post('profile-get', {
      activationCode: rootState.auth.token,
      login,
    })
    if (res.type === 'ok') {
      commit('SET_USER', res.data);
    }
    if (res.message) {
      dispatch('history/PUSH_POP_WINDOW', {
        action: res.type,
        visible: true,
        msg: res.message,
      }, { root: true });
    }
    return res;
  },

}