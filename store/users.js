import API from '~/api';

export const state = () => ({
  users: [],
  curPage: 1,
  maxLength: null,
  limit: 3,
  sortOrder: ['countTags', 'fameRaiting', 'dist'],
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
    
    sortDist: {
      value: ['dist'],
      title: 'Dist',
      options: ['dist', 'dist_rev'],
    },
    sortAge: {
      value: [],
      title: 'Age',
      options: ['age', 'age_rev'],
    },
    sortRate: {
      value: ['fameRaiting_rev'],
      title: 'Rate',
      options: ['fameRaiting', 'fameRaiting_rev'],
    },
    sortTags: {
      value: ['countTags_rev'],
      title: 'Tags',
      options: ['countTags', 'countTags_rev'],
    },
  },
})
export const getters = {
  MAX_LENGTH: (state) => state.maxLength,
  USERS: (state) => state.users.slice(0, state.limit),
  CUR_PAGE: (state) => state.curPage,
  LAST_PAGE: (state) => Math.ceil(state.maxLength / state.limit),
  TOOLS: (state) => state.tools,
  SORT_LIST: (state) => state.sortOrder,
}
export const mutations = {
  CHANGE_COUNT_PER_PAGE: (state) => {
    state.limit = window.innerWidth <= 480 ? 1 : 3;
    console.log(state.limit)
    state.curPage = 1;
  },
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
  CHANGE_SORT_ORDER: (state, { key, val }) => {
    if (val.length) {
      const prefix = val[0].split('_')[0];
      if (!state.sortOrder.includes(prefix)) {
        state.sortOrder.push(prefix);
      }
    } else {
      const index = state.sortOrder.indexOf(state.tools[key].options[0]);
      state.sortOrder.splice(index, 1);
    }
  },
}
export const actions = {
  SORT: ({ commit, dispatch }, opt) => {
    if (opt.val.length) opt.val = [opt.val[opt.val.length - 1]];
    commit('CHANGE_TOOLS', opt);
    commit('CHANGE_SORT_ORDER', opt);
    dispatch('GET_USERS', state.curPage);
  },
  FILTER_LIST ({ commit, dispatch }, opt) {
    commit('CHANGE_TOOLS', opt);
    dispatch('GET_USERS', state.curPage);
  },
  async GET_USERS ({ commit, state, rootState, dispatch }, page) {
    commit('CHANGE_PAGE', page || 1);
    const sortOrder = state.sortOrder.reduce((sum, cur) => {
      let val;
      if (cur === 'dist') val = state.tools.sortDist.value
      else if (cur === 'age') val = state.tools.sortAge.value
      else if (cur === 'fameRaiting') val = state.tools.sortRate.value
      else if (cur === 'countTags') val = state.tools.sortTags.value
      if (val.length) {
        sum[cur] = -1 * Math.min(val[0].indexOf('_'), 1);
      }
      return sum;
    }, {});
    const res = await this.$axios.$post('get-users', {
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
      sortOrder:      sortOrder,
    })
    if (res.type === 'ok') {
      commit('SET_USERS', res.data);
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true });
  },
}