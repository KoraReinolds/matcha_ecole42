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

  async GET_USER ({ commit, state, rootState }, login) {
    const res = await this.$axios.$post('profile-get', {
      activationCode: rootState.auth.token,
      login,
    })
    console.log(123, res)
    if (res.type === 'ok') {
      console.log(login, res.data);
      commit('SET_USER', res.data);
    } else if (type === 'error') {
    }
  },

}