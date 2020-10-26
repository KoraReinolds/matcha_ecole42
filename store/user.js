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
    const res = await this.$axios.$post('profile-get', { login })
    if (res.type === 'ok') {
      commit('SET_USER', res.data);
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true });
    return res;
  },
}