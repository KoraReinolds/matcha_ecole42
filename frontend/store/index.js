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
  nuxtServerInit ({ commit }, { req }) {
    if (req.headers.cookie) {
      commit('auth/SET_TOKEN', req.headers.cookie.match(/user=(.+)/)[1]);
    }
  },
}