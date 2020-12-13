export const state = () => ({
  users: [],
  curPage: 1,
  limit: 3,
  sortOrder: new Set(['sortTags', 'sortRating', 'sortLocation']),
  tools: {
    // pref: {
    //   value: null,
    //   title: 'Preferences',
    //   options: ['male', 'female', 'bisexual']
    // },
    pref: {
      value: ["1"],
      title: 'Preferences',
      options: { 'Учитывать мои предпочтения': "1" }
      // options: ['1']
    },
    ageMin: {
      value: null,
      title: "Min_age",
    },
    ageMax: {
      value: null,
      title: "Max_age",
    },
    radius: {
      value: 10,
      title: "Radius",
    },
    minRating: {
      value: '0',
      title: "Min_rate",
    },
    maxRating: {
      value: 500,
      title: "Max_rate",
    },
    tags: {
      value: ['poker'],
      title: 'Tags',
    },
    sortLocation: {
      value: ['1'],
      title: 'Dist',
      options: ['1', '-1'],
    },
    sortAge: {
      value: [],
      title: 'Age',
      options: ['1', '-1'],
    },
    sortRating: {
      value: ['-1'],
      title: 'Rate',
      options: ['1', '-1'],
    },
    sortTags: {
      value: ['-1'],
      title: 'Tags',
      options: ['1', '-1'],
    },
  },
})
export const getters = {
  SORT_ORDER: (state) => state.sortOrder,
  USERS: (state) => state.users,
  CUR_PAGE: (state) => state.curPage,
  TOOLS: (state) => state.tools,
}
export const mutations = {
  CHANGE_SORT_ORDER: (state, [newItem, isChange]) => {
    if (isChange) {
      state.sortOrder.delete(newItem)
      state.sortOrder.add(newItem)
    } else {
      state.sortOrder.delete(newItem)
    }
  },
  CHANGE_COUNT_PER_PAGE: (state) => {
    state.limit = window.innerWidth <= 480 ? 1 : 3
    state.curPage = 1
  },
  SET_INIT_TOOLS: (state, user) => {
    // state.tools.pref.value = ['male', 'female', 'bisexual'][user.preference - 1]
    state.tools.ageMin.value = Math.max(+user.age - 5, 18)
    state.tools.ageMax.value = Math.min(+user.age + 5, 99)
    state.tools.tags.value = user.tags
  },
  SET_USERS: (state, users) => {
    state.users = users
    state.maxLength = 1
  },
  CHANGE_PAGE: (state, newPage) => state.curPage = newPage,
  CHANGE_TOOLS: (state, { key, val }) => state.tools[key].value = val,
}
export const actions = {

  FILTER_USERS ({ commit, dispatch }, opt) {
    commit('SET_USERS', [])
    if (opt) commit('CHANGE_TOOLS', opt)
    commit('CHANGE_PAGE', 1)
    dispatch('GET_USERS')
  },

  async GET_USERS ({ state, commit, dispatch }) {
    // commit('CHANGE_PAGE', 1)
    // commit('SET_USERS', [])
    // if (opt) commit('CHANGE_TOOLS', opt)
    const tools = state.tools
    const reqParams = {
      needPreference: tools.pref.value[0] || 0,
      ageMin: tools.ageMin.value || 0,
      ageMax: tools.ageMax.value || 0,
      deltaRadius: tools.radius.value || 0,
      minRating: tools.minRating.value || 0,
      maxRating: tools.maxRating.value || 0,
      limit: state.limit,
      offset: (state.curPage - 1) * state.limit,
    }
    if (tools.tags.length) reqParams.tags = tools.tags.value.join(),
    state.sortOrder.forEach(fieldName => {
      reqParams[fieldName] = tools[fieldName].value[0]
    })
    const res = await this.$axios.$get(`get-users`, {
      params: reqParams,
    })
    if (res.type === 'ok') {
      commit('SET_USERS', [...state.users, ...res.data])
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true })
  },
}