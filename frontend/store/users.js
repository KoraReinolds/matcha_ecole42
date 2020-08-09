import API from '~/api';

export const state = () => ({
  users: null,
  curPage: 1,
  maxLength: null,
  limit: 2,
})
export const getters = {
  USERS: (state) => state.users,
  CUR_PAGE: (state) => state.curPage,
  LAST_PAGE: (state) => state.maxLength / state.limit,
}
export const mutations = {
  SET_USERS: (state, { users, length }) => {
    state.users = users;
    state.maxLength = length;
  },
  CHANGE_PAGE: (state, newPage) => state.curPage = newPage,
}
export const actions = {
  async GET_USERS ({ commit, state, rootState }, page) {
    commit('CHANGE_PAGE', page || 1);
    await API.getUsers({
      activationCode: rootState.auth.token,
      limit: state.limit,
      skip: (state.curPage - 1) * state.limit,
    })
    .then(({ type, data }) => {
      if (type === 'ok') {
          commit('SET_USERS', data);
      } else if (type === 'error') {
      }
    })
    .catch((e) => {});
  },

}