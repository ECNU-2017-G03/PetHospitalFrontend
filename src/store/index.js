import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('Token'),
    actor: localStorage.getItem('Actor'),
  },
  mutations: {
    saveToken (state, token) {
      localStorage.setItem('Token', token)
      state.token = token
    },
    saveActor (state, actor) {
      localStorage.setItem('Actor', actor)
      state.actor = actor
    }
  },
  actions: {
  },
  modules: {
  }
})
