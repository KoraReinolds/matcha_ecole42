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

  async GET_USER ({ commit }, token) {
    await API.getUser({ activationCode: token })
      .then((res) => {
        if (res.type === 'ok') {
          commit('SET_USER', JSON.parse(res.data));
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  },
  
}