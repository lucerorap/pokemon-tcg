import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import pokemontcg from './pokemontcg'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    pokemontcg
  }
})
