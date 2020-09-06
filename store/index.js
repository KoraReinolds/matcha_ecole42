import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  mobile: false,
})
export const getters = {
  IS_MOBILE: (state) => state.mobile,
}
export const mutations = {
  RESIZE: (state) => state.mobile = window.innerWidth <= 576,
}
export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    if (req.headers.cookie) {
      let cookie = req.headers.cookie.split("; ").reduce((obj, el) => {
        let [key, val] = el.split("=");
        obj[key] = val;
        return obj;
      }, {})
      commit('auth/SET_TOKEN', cookie.token);
      if (cookie.token) {
        const res = await this.$axios.$post('profile-get', {
          activationCode: cookie.token,
        })
        if (res.type === 'ok') {
          dispatch('auth/SET_USER', res.data, { root: true });
          if (this.$router.currentRoute.name === 'main') {
            dispatch('users/GET_USERS', null, { root: true });
          }
        }
        if (res.message) {
          dispatch('history/PUSH_POP_WINDOW', {
            action: res.type,
            visible: true,
            msg: res.message,
          }, { root: true });
        }
      }

    }
  },
}