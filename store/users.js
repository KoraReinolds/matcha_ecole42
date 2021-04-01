export const state = () => ({
  mobilePage: 0,
  loading: false,
  users: [],
  curPage: 1,
  limit: 4,
  sortOrder: new Set(['tagsCount', 'rating', 'dist']),
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
    dist: {
      value: ['sort-amount-down'],
      title: 'Dist',
      options: ['sort-amount-down', 'sort-amount-up'],
    },
    age: {
      value: [],
      title: 'Age',
      options: ['sort-amount-down', 'sort-amount-up'],
    },
    rating: {
      value: ['sort-amount-up'],
      title: 'Rate',
      options: ['sort-amount-down', 'sort-amount-up'],
    },
    tagsCount: {
      value: ['sort-amount-up'],
      title: 'Tags',
      options: ['sort-amount-down', 'sort-amount-up'],
    },
  },
})

export const getters = {

  MOBILE_USER: state => state.users[state.mobilePage] || null

}

export const mutations = {

  CHANGE_SORT_ORDER: (state, [newItem, isChange]) => {

    state.sortOrder.delete(newItem)

    // add newItem if length of value > 0
    if (isChange) {
      state.sortOrder = new Set([...state.sortOrder, newItem])
    }

  },

  SET_LOADING: (state, value) => state.loading = value,

  SET_INIT_TOOLS: (state, user) => {

    state.tools.pref.value = user.preference
    state.tools.ageMin.value = Math.max(+user.age - 5, 18)
    state.tools.ageMax.value = Math.min(+user.age + 5, 99)
    state.tools.tags.value = user.tags

  },

  SET_USERS: (state, users) => state.users = users,

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
    // set last value in options array
    dispatch('FILTER_USERS', { key, val: [val[val.length - 1]] })

  },

  async CHANGE_MOBILE_USER ({ commit, state, dispatch }, inc) {

    let page = state.mobilePage + inc

    if (page === -1) {
      page = state.users.length - 1
    }
    else if (state.users[page] === undefined) {
      commit('CHANGE_PAGE', state.curPage + 1)
      await dispatch('GET_USERS')
    }
    commit('CHANGE_MOBILE_PAGE', state.users[page] ? page : 0)

  },

  FILTER_USERS ({ commit, dispatch }, opt) {

    // refresh user list
    commit('SET_USERS', [])
    if (opt) commit('CHANGE_TOOLS', opt)
    commit('CHANGE_PAGE', 1)
    dispatch('GET_USERS')

  },

  async GET_USERS ({ state, commit, dispatch }) {

    if (!state.loading) {

      // forbid get users until recieve data
      commit('SET_LOADING', true)
      
      const params = {
        ...Object.entries(state.tools).reduce(
          (sum, [key, { value }]) => ({
            ...sum,
            [key]: value
          }), {}
        ),
        sort: [...state.sortOrder].reduce((sum, sortKey) => ({
          ...sum,
          [sortKey]: state.tools[sortKey].value[0].split('-')[2] === "up" ? 1 : -1
        }), {}),
        limit: state.limit,
        skip: (state.curPage - 1) * state.limit,
      }

      const res = await this.$axios.$get(`get-users`, { params })

      if (res.type === 'ok') {
        commit('SET_USERS', [...state.users, ...res.data])
      }

      commit('SET_LOADING', false)

    }
  },

}