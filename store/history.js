export const state = () => ({
  history: [],
  notifications: [],
  notificationsChecked: 0,
  unreadedNotifications: 0,
})
export const getters = {
  NOTIFICATION_COUNT: (state) => state.unreadedNotifications > 99 ? '+99' : state.unreadedNotifications,
  // NOTIFICATION_COUNT: (state) => state.notifications.length - state.notificationsChecked,
}
export const mutations = {
  SET_UNREADED_NOTIFICATIONS: (state, count) => state.unreadedNotifications = count,
  SET_HISTORY: (state, list) => state.history = list,
  SET_NOTIFICATIONS: (state, list) => {
    state.notifications = list
    state.notificationsChecked = list.length
  },
  SET_ALL_NOTIF_AS_CHECKED: (state) => state.notificationsChecked = state.notifications.length,
  PUSH_NOTIFICATION: (state, notif) => state.notifications.unshift(notif),
}
export const actions = {

  PUSH_NOTIFICATION ({ commit, state, rootState, dispatch }, notif) {

    const msgs = {
      LIKE: {
        type: 'like',
        message: `${notif.login} like you`,
      },
      PROFILE_LOAD: {
        type: 'visit',
        message: `${notif.login} visit you`,
      },
      CONNECTED: {
        type: 'connected',
        message: `${notif.login} connect with you`,
      },
      SEND_MESSAGE: {
        type: 'messages',
        message: `${notif.login} send you message`,
      },
      DISCONNECTED: {
        type: 'dislike',
        message: `${notif.login} disconect with you`,
      },
    }

    if (notif.type === 'SEND_MESSAGE') {
      // dispatch('chat/GET_MESSAGES', rootState.chat.curUser, {root: true})
      // commit('chat/PUSH_MESSAGE', {
      //   message: "message.replace(/\n/g, '<br />')",
      //   toLogin: rootState.auth.login,
      //   time: new Date,
      //   read: false,
      //   // fromLogin: rootState.auth.login,
      // }, { root: true })
    }

    commit('SET_UNREADED_NOTIFICATIONS', state.unreadedNotifications + 1)
    dispatch('PUSH_POP_WINDOW', msgs[notif.type])
    
  },

  async GET_NOTIFICATIONS ({ commit, state, rootState, dispatch }) {
    const res = await this.$axios.$post('notifications')
    if (res.type === 'ok') {
      commit('SET_NOTIFICATIONS', res.data)
    }
    if (res.message) {
      dispatch('popWindows/PUSH_POP_WINDOW', {
        action: res.type,
        visible: true,
        msg: res.message,
      }, { root: true })
    }
  },

  async GET_UNREADED_NOTIFICATIONS ({ commit }) {
    const res = await this.$axios.$get('/new-notifications')
    if (res.type === 'ok') {
      commit('SET_UNREADED_NOTIFICATIONS', res.data)
    }
  },

  async GET_HISTORY ({ commit, state, rootState, dispatch }) {
    const res = await this.$axios.$post('history')
    if (res.type === 'ok') {
      commit('SET_HISTORY', res.data)
    }
    if (res.message) {
      dispatch('popWindows/PUSH_POP_WINDOW', {
        action: res.type,
        visible: true,
        msg: res.message,
      }, { root: true })
    }
  },

}
