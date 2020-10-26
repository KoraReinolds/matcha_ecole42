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
}