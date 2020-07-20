import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
})
export const getters = {
}
export const mutations = {
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
      commit('auth/SET_VALUE', { key: 'login', value: cookie.login });
    }
  },
}