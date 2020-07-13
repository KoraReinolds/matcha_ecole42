import API from '~/api';

export const state = () => ({
})
export const getters = {
}
export const mutations = {
}
export const actions = {
  async LOGIN ({ commit }, data) {
    data.location =
      await API.getLocationByGPS().catch((e) => {}) ||
      await API.getLocationByIP().catch((e) => {}) ||
      { x: 1, y: 2 };
    await API.login(data)
      .then(({ type, message, token }) => {
        if (type === 'ok') {
          localStorage.setItem('user', token);
          this.$router.push({ path: '/settings' });
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  }
}