import API from '~/api';
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  token: null,
})
export const getters = {
  TOKEN: (state) => state.token,
}
export const mutations = {
  SET_TOKEN: (state, token) => state.token = token,
}
export const actions = {

  async REGISTRATION ({ commit }, data) {
    data.location =
      // await API.getLocationByGPS().catch((e) => {}) ||
      // await API.getLocationByIP().catch((e) => {}) ||
      { x: 1, y: 2 };
    await API.registration(data)
      .then((req) => {
        if (type === 'ok') {
          this.$router.push({ path: '/settings' });
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  },

  async LOGIN ({ commit }, data) {
    data.location =
      await API.getLocationByGPS().catch((e) => {}) ||
      await API.getLocationByIP().catch((e) => {}) ||
      { x: 1, y: 2 };
    await API.login(data)
      .then(({ type, message, token }) => {
        if (type === 'ok') {
          localStorage.setItem('user', token);
          Cookie.set('user', token);
          commit('SET_TOKEN', token);
          this.$router.push({ path: '/settings' });
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  }

}