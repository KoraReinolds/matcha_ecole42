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
    minDist: {
      value: '0',
      title: "Min_dist",
    },
    maxDist: {
      value: 10,
      title: "Max_dist",
    },
    minRate: {
      value: '0',
      title: "Min_rate",
    },
    maxRate: {
      value: 500,
      title: "Max_rate",
    },
    tags: {
      value: ['poker'],
      title: 'Tags',
    },
    gender: '',
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
    state.tools.tags.value = user.tags;
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
    console.log(opt)
    commit('CHANGE_TOOLS', opt);
    dispatch('GET_USERS', state.curPage);
  },
  GET_USERS ({ commit, state, rootState }, page) {
    commit('CHANGE_PAGE', page || 1);
    API.getUsers({
      activationCode: rootState.auth.token,
      limit:          state.limit,
      skip:           (state.curPage - 1) * state.limit,
      preference:     state.tools.pref.value,
      minAge:         state.tools.minAge.value,
      maxAge:         state.tools.maxAge.value,
      minDist:        state.tools.minDist.value,
      maxDist:        state.tools.maxDist.value,
      minRate:        state.tools.minRate.value,
      maxRate:        state.tools.maxRate.value,
      tags:           state.tools.tags.value,
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