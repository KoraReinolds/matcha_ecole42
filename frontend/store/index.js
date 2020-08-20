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
  RESIZE: (state) => state.mobile = window.innerWidth <= 480,
}
export const actions = {
  nuxtServerInit ({ commit, dispatch }, { req }) {
    if (req.headers.cookie) {
      let cookie = req.headers.cookie.split("; ").reduce((obj, el) => {
        let [key, val] = el.split("=");
        obj[key] = val;
        return obj;
      }, {})
      commit('auth/SET_TOKEN', cookie.token);
    }
  },
}