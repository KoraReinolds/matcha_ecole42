export const state = () => ({
  history: [],
  notifications: [],
  popWindows: [],
  notificationsChecked: 0,
})
export const getters = {
  POP_WINDOWS: (state) => state.popWindows,
  HISTORY: (state) => state.history,
  NOTIFICATIONS: (state) => state.notifications,
  NOTIFICATION_COUNT: (state) => state.notifications.length - state.notificationsChecked,
}
export const mutations = {
  CLOSE_MSG: (state, index) => {
    state.notifications[index].visible = false;
  },
  SET_HISTORY: (state, list) => state.history = list.reverse(),
  SET_NOTIFICATIONS: (state, list) => {
    state.notifications = list.reverse();
    state.notificationsChecked = list.length;
  },
  SET_ALL_NOTIF_AS_CHECKED: (state) => {
    state.notificationsChecked = state.notifications.length;
  },
  PUSH_NOTIFICATION: (state, notif) => {
    state.notifications.unshift(notif);
  },
  PUSH_POP_WINDOW: (state, msg) => {
    state.popWindows.push(msg);
  },
  HIDE_MSG: (state, notif) => {
    const index = state.popWindows.findIndex(
      mess => {
        return notif === mess
      }
    );
    state.popWindows[index].visible = false;
    state.popWindows = [...state.popWindows];
  }
}
export const actions = {

  PUSH_POP_WINDOW ({ commit, state, rootState }, res) {
    if (res.message) {
      const msg= {
        action: res.type,
        visible: true,
        msg: res.message,
      };
      commit('PUSH_POP_WINDOW', msg);
      setTimeout(function() {
        commit('HIDE_MSG', msg);
      }.bind(this), 3000)
    }
  },

  async GET_NOTIFICATIONS ({ commit, state, rootState, dispatch }) {
    const res = await this.$axios.$post('notifications', {
      activationCode: rootState.auth.token,
    })
    if (res.type === 'ok') {
      commit('SET_NOTIFICATIONS', res.data);
    }
    if (res.message) {
      dispatch('history/PUSH_POP_WINDOW', {
        action: res.type,
        visible: true,
        msg: res.message,
      }, { root: true });
    }
  },

  async GET_HISTORY ({ commit, state, rootState, dispatch }) {
    const res = await this.$axios.$post('history', {
      activationCode: rootState.auth.token,
    })
    if (res.type === 'ok') {
      commit('SET_HISTORY', res.data);
    }
    if (res.message) {
      dispatch('history/PUSH_POP_WINDOW', {
        action: res.type,
        visible: true,
        msg: res.message,
      }, { root: true });
    }
  },

}
