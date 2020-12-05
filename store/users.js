import API from '~/api'

export const state = () => ({
  users: [],
  curPage: 1,
  // maxLength: null,
  limit: 3,
  sortOrder: ['countTags', 'sortRating', 'sortLocation'],
  tools: {
    pref: {
      value: null,
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
      value: 1,
      title: 'Dist',
      options: [1, -1],
    },
    sortAge: {
      value: null,
      title: 'Age',
      options: [1, -1],
    },
    sortRating: {
      value: -1,
      title: 'Rate',
      options: [1, -1],
    },
    sortTags: {
      value: -1,
      title: 'Tags',
      options: [1, -1],
    },
  },
})
export const getters = {
  // MAX_LENGTH: (state) => state.maxLength,
  USERS: (state) => state.users,
  // USERS: (state) => state.users.slice(0, state.limit),
  CUR_PAGE: (state) => state.curPage,
  // LAST_PAGE: (state) => Math.ceil(state.maxLength / state.limit),
  TOOLS: (state) => state.tools,
  // SORT_LIST: (state) => state.sortOrder,
}
export const mutations = {
  CHANGE_COUNT_PER_PAGE: (state) => {
    state.limit = window.innerWidth <= 480 ? 1 : 3
    state.curPage = 1
  },
  SET_INIT_TOOLS: (state, user) => {
    state.tools.pref.value = ['male', 'female', 'bisexual'][user.preference - 1]
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
  GET_TOOLS: (state, { key, val }) => state.tools[key].value = val,
  CHANGE_SORT_ORDER: (state, { key, val }) => {
    if (val.length) {
      const prefix = val[0].split('_')[0]
      if (!state.sortOrder.includes(prefix)) {
        state.sortOrder.push(prefix)
      }
    } else {
      const index = state.sortOrder.indexOf(state.tools[key].options[0])
      state.sortOrder.splice(index, 1)
    }
  },
}
export const actions = {
  // SORT: ({ commit, dispatch }, opt) => {
  //   if (opt.val.length) opt.val = [opt.val[opt.val.length - 1]]
  //   commit('CHANGE_TOOLS', opt)
  //   commit('CHANGE_SORT_ORDER', opt)
  //   dispatch('GET_USERS', state.curPage)
  // },
  FILTER_LIST ({ state, commit, dispatch }, opt) {
    commit('CHANGE_PAGE', 1)
    commit('SET_USERS', [])
    commit('CHANGE_TOOLS', opt)
    dispatch('GET_USERS', state.curPage, true)
  },
  async GET_USERS ({ commit, state, rootState, dispatch }, page, newList) {
    commit('CHANGE_PAGE', page || 1)
    // const sortOrder = state.sortOrder.reduce((sum, cur) => {
    //   let val
    //   if (cur === 'dist') val = state.tools.sortLocation.value
    //   else if (cur === 'age') val = state.tools.sortAge.value
    //   else if (cur === 'rating') val = state.tools.sortRating.value
    //   else if (cur === 'countTags') val = state.tools.sortTags.value
    //   if (val.length) {
    //     sum[cur] = -1 * Math.min(val[0].indexOf('_'), 1)
    //   }
    //   return sum
    // }, {})
    // preference:     state.tools.pref.value,
    // `
    // ageMin=0&
    // ageMax=100&
    // minRating=0&
    // maxRating=999&
    // deltaRadius=1000&
    // limit=100&
    // offset=0&
    // sortAge=1&
    // sortLocation=1&
    // sortRating-1&
    // sortTags=1&
    // needPreference=1
    // `
    const tools = state.tools
    const reqParams = {
      needPreference: { male: 1, female: 2, bisexual: 3 }[tools.pref.value],
      ageMin: tools.ageMin.value,
      ageMax: tools.ageMax.value,
      deltaRadius: tools.radius.value,
      minRating: tools.minRating.value,
      maxRating: tools.maxRating.value,
      tags: tools.tags.value.join(),
      limit: state.limit,
      offset: (state.curPage - 1) * state.limit,
      // sortLocation: tools.sortLocation,
      // sortAge: tools.sortAge,
      // sortRating: tools.sortRating,
      // sortTags: tools.sortTags,
    }

  //   console.log(Object.entries(reqParams).map(param => param.join('=')).join('&'))
  //   console.log(state.tools.tags.value, `get-users
  //   ?tags=${state.tools.tags.value.join()}
  //   &sortAge=1
  //   &sortLocation=1
  //   &sortRating=1
  //   &sortTags=1
  //   &ageMin=${state.tools.ageMin.value}
  //   &ageMax=${state.tools.ageMax.value}
  //   &minRating=${state.tools.minRating.value}
  //   &maxRating=${state.tools.maxRating.value}
  //   &deltaRadius=${state.tools.maxRating.value}
  //   &limit=${state.limit}
  //   &offset=${(state.curPage - 1) * state.limit}
  // `)
    // const res = await this.$axios.$get(`get-users?tags=${state.tools.tags.value.join()}&sortAge=1&sortLocation=1&sortRating=1&sortTags=1&ageMin=${state.tools.ageMin.value}&ageMax=${state.tools.ageMax.value}&minRating=${state.tools.minRating.value}&maxRating=${state.tools.maxRating.value}&deltaRadius=${state.tools.maxRating.value}&limit=${state.limit}&offset=${(state.curPage - 1) * state.limit}
    // `)
    const res = await this.$axios.$get(`get-users?${Object.entries(reqParams).map(param => param.join('=')).join('&')}`)
    if (res.type === 'ok') {
      commit('SET_USERS', [...(newList ? [] : state.users), ...res.data])
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true })
  },
}