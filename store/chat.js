export const state = () => ({
  users: [],
  curUser: null,
  messages: [],
  message: '',
})

export const getters = {
  MSG_TRIM: state => state.message.trim(),
  MSG_LIST: state => {

    const today = new Date(Date.now()).toLocaleString('ru', {
      day: 'numeric',
      month: 'long',
      timezone: 'UTC',
    })

    const getDate = (t) => {
      let date = new Date(t).toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
      })
      let time = new Date(t).toLocaleString('ru', {
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
      })
      return `${(date === today ? 'today' : date)} ${time}`
    }

    return state.messages.map(msg => ({
      ...msg,
      created: getDate(msg.created)
    }))

  }
}

export const mutations = {
  SET_MSG: (state, msg) => state.message = msg,
  SET_USERS: (state, list) => state.users = list,
  SET_CUR_USER: (state, user) => state.curUser = user,
  PUSH_MESSAGE: (state, message) => state.messages.push(message),
  SET_MESSAGES: (state, messages) => state.messages = messages,
}

export const actions = {

  async SEND_MESSAGE ({ commit, getters, state, rootState, dispatch }) {

    if (getters.MSG_TRIM) {

      const msg = {
        message: state.message.replace(/\n/g, '<br />'),
        target: state.curUser.login,
      }
      const res = await this.$axios.$post('/send-message', msg)

      if (res.type === 'ok') {
        commit('SET_MSG', '')
        commit('PUSH_MESSAGE', {
          ...msg,
          our: true,
          created: new Date,
        })
      }

    }

  },

  async GET_MESSAGES ({ commit, state, rootState, dispatch }) {

    const res = await this.$axios.$post(`get-messages`, {
      target: state.curUser.login,
    })

    if (res.type === 'ok') {
      commit('SET_MESSAGES', res.data)
    }

    return res

  },

  async GET_CHAT_LIST ({ commit, dispatch, state, rootState }) {

    const { data, type } = await this.$axios.$get('chat-list')

    
    if (type === 'ok') {
      commit('SET_CUR_USER', null)
      commit('SET_MESSAGES', [])
      commit('SET_USERS', data)
    }

    return data
    
  },

}