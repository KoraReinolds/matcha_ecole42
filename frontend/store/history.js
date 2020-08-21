import API from '~/api';

export const state = () => ({
  history: [],
  notifications: [],
  notificationsChecked: 0,
})
export const getters = {
  HISTORY: (state) => state.history,
  NOTIFICATIONS: (state) => state.notifications,
  NOTIFICATION_COUNT: (state) => state.notifications.length - state.notificationsChecked,
}
export const mutations = {
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
  }
}
export const actions = {

  GET_NOTIFICATIONS ({ commit, state, rootState }) {
    API.getNotifications({
      activationCode: rootState.auth.token,
    })
      .then((res) => {
        if (res.type === 'ok') {
          commit('SET_NOTIFICATIONS', res.data);
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  },

  GET_HISTORY ({ commit, state, rootState }) {
    API.getHistory({
      activationCode: rootState.auth.token,
    })
      .then((res) => {
        if (res.type === 'ok') {
          commit('SET_HISTORY', res.data);
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  },

}