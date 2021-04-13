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

    // if (notif.type === 'SEND_MESSAGE') {
      // dispatch('chat/GET_MESSAGES', rootState.chat.curUser, {root: true})
      // commit('chat/PUSH_MESSAGE', {
      //   message: "message.replace(/\n/g, '<br />')",
      //   toLogin: rootState.auth.login,
      //   time: new Date,
      //   read: false,
      //   // fromLogin: rootState.auth.login,
      // }, { root: true })
    // }
    commit('PUSH_NOTIFICATION', notif)
    commit('SET_UNREADED_NOTIFICATIONS', state.unreadedNotifications + 1)
    
  },

  async GET_NOTIFICATIONS ({ commit, state, rootState, dispatch }) {
    const res = await this.$axios.$post('notifications')
    if (res.type === 'ok') {
      commit('SET_NOTIFICATIONS', res.data)
      commit('SET_UNREADED_NOTIFICATIONS', 0)
    }
    if (res.message) {
      dispatch('windows/PUSH_POP_WINDOW', {
        action: res.type,
        visible: true,
        msg: res.message,
      }, { root: true })
    }
  },

  async GET_UNREADED_NOTIFICATIONS ({ commit }) {
    const res = await this.$axios.$post('/new-notifications')
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
      dispatch('windows/PUSH_POP_WINDOW', {
        action: res.type,
        visible: true,
        msg: res.message,
      }, { root: true })
    }
  },

}
