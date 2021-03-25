export const state = () => ({
  mobilePage: 0,
  loading: false,
  users: [],
  curPage: 1,
  limit: 4,
  sortOrder: new Set(['sortTags', 'sortRating', 'sortLocation']),
  tools: {
    pref: {
      value: [],
      title: 'Preferences',
      options: ['male', 'female', 'bisexual']
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
      value: 20,
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
      value: [],
      title: 'Tags',
    },
    sortLocation: {
      value: ['sort-amount-down'],
      title: 'Dist',
      options: ['sort-amount-down', 'sort-amount-up'],
    },
    sortAge: {
      value: [],
      title: 'Age',
      options: ['sort-amount-down', 'sort-amount-up'],
    },
    sortRating: {
      value: ['sort-amount-up'],
      title: 'Rate',
      options: ['sort-amount-down', 'sort-amount-up'],
    },
    sortTags: {
      value: ['sort-amount-up'],
      title: 'Tags',
      options: ['sort-amount-down', 'sort-amount-up'],
    },
  },
})
export const getters = {
  USERS: (state, _, rootState) => rootState.mobile ? 
    state.users.length ? [state.users[state.mobilePage]] : [] :
    state.users
}
export const mutations = {
  CHANGE_SORT_ORDER: (state, [newItem, isChange]) => {
    if (isChange) {
      state.sortOrder.delete(newItem)
      state.sortOrder = new Set([newItem, ...state.sortOrder])
    } else {
      state.sortOrder.delete(newItem)
    }
  },
  SET_LOADING: (state, value) => state.loading = value,
  SET_INIT_TOOLS: (state, user) => {
    state.tools.pref.value = user.preference
    state.tools.ageMin.value = Math.max(+user.age - 5, 18)
    state.tools.ageMax.value = Math.min(+user.age + 5, 99)
    state.tools.tags.value = user.tags
  },
  SET_USERS: (state, users) => {
    state.users = users
  },
  CHANGE_MOBILE_PAGE: (state, newPage) => state.mobilePage = newPage,
  CHANGE_PAGE: (state, newPage) => state.curPage = newPage,
  CHANGE_TOOLS: (state, { key, val }) => state.tools[key].value = val,
}
export const actions = {

  async LOAD_MORE_USERS ({ commit, state, dispatch }) {
    if (state.curPage * state.limit === state.users.length) {
      commit('CHANGE_PAGE', state.curPage + 1)
      await dispatch('GET_USERS')
    }
  },

  async CHANGE_SORT_ORDER ({ commit, state, dispatch }, { val, key }) {
    commit('CHANGE_SORT_ORDER', [key, val.length])
    dispatch('FILTER_USERS', { key, val: [val[val.length - 1]] })
  },

  async CHANGE_MOBILE_USER ({ commit, state, dispatch }, page) {

    if (page === -1) {
      page = state.users.length - 1
    }
    else if (state.users[page] === undefined) {
      commit('CHANGE_PAGE', state.curPage + 1)
      await dispatch('GET_USERS')
    }
    if (state.users[page]) {
      commit('CHANGE_MOBILE_PAGE', page)
    } else {
      commit('CHANGE_MOBILE_PAGE', 0)
    }

  },

  FILTER_USERS ({ commit, dispatch }, opt) {
    commit('SET_USERS', [])
    if (opt) commit('CHANGE_TOOLS', opt)
    commit('CHANGE_PAGE', 1)
    dispatch('GET_USERS')
  },

  async GET_USERS ({ state, commit, dispatch }) {

    if (!state.loading) {

      commit('SET_LOADING', true)
      const tools = state.tools
      const reqParams = {
        preference: tools.pref.value || 0,
        ageMin: tools.ageMin.value || 0,
        ageMax: tools.ageMax.value || 0,
        deltaRadius: tools.radius.value || 0,
        minRating: tools.minRating.value || 0,
        maxRating: tools.maxRating.value || 0,
        tags: tools.tags.value || 0,
        limit: state.limit,
        offset: (state.curPage - 1) * state.limit,
      }
      // if (tools.tags.value.length) reqParams.tags = tools.tags.value.join()
      // state.sortOrder.forEach(fieldName => {
      //   reqParams[fieldName] = tools[fieldName].value[0]
      // })
      const res = await this.$axios.$get(`get-users`, {
        params: reqParams,
      })
      if (res.type === 'ok') {
        commit('SET_USERS', [...state.users, ...res.data])
      }

      commit('SET_LOADING', false)

    }
  },

}