import API from '~/api';

export const state = () => ({
  users: null,
  curPage: 1,
  maxLength: null,
  limit: 3,
  tools: {
    pref: {
      value: [],
      title: 'Preferences',
      options: ['male', 'female', 'bisexual']
    },
    minAge: {
      value: null,
      title: "Min_age",
    },
    maxAge: {
      value: null,
      title: "Max_age",
    },
    gender: '',
    minRate: '0',
    maxRate: 1000,
    minDist: '0',
    maxDist: 100,
    tags: [],
  },
})
export const getters = {
  USERS: (state) => state.users,
  CUR_PAGE: (state) => state.curPage,
  LAST_PAGE: (state) => Math.ceil(state.maxLength / state.limit),
  TOOLS: (state) => state.tools,
}
export const mutations = {
  SET_INIT_TOOLS: (state, user) => {
    state.tools.pref.value = user.preference;
    state.tools.minAge.value = Math.max(+user.age - 5, 18);
    state.tools.maxAge.value = Math.min(+user.age + 5, 99);
  },
  SET_USERS: (state, { users, length }) => {
    state.users = users;
    state.maxLength = length;
  },
  CHANGE_PAGE: (state, newPage) => state.curPage = newPage,
  CHANGE_TOOLS: (state, { key, val }) => state.tools[key].value = val,
  GET_TOOLS: (state, { key, val }) => state.tools[key].value = val,
}
export const actions = {
  CHANGE_TOOLS ({ commit, dispatch }, opt) {
    commit('CHANGE_TOOLS', opt);
    dispatch('GET_USERS', state.curPage);
  },
  GET_USERS ({ commit, state, rootState }, page) {
    commit('CHANGE_PAGE', page || 1);
    API.getUsers({
      activationCode: rootState.auth.token,
      limit: state.limit,
      skip: (state.curPage - 1) * state.limit,
      preference: state.tools.pref.value,
      minAge: state.tools.minAge.value,
      maxAge: state.tools.maxAge.value,
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