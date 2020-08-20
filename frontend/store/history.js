import API from '~/api';

export const state = () => ({
  history: [],
  notifications: [],
})
export const getters = {
  HISTORY: (state) => state.history,
  NOTIFICATIONS: (state) => state.notifications,
}
export const mutations = {
  SET_HISTORY: (state, list) => state.history = list.reverse(),
  SET_NOTIFICATIONS: (state, list) => state.notifications = list.reverse(),
  PUSH_NOTIFICATION: (state, notif) => state.notifications.unshift(notif),
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