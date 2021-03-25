import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('Token'),
  },
  mutations: {
    saveToken (state, token) {
      localStorage.setItem('Token', token)
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
