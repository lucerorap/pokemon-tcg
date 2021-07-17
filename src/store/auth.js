export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  getters: {
    authenticated (state) {
      return state.token && state.user
    },

    user (state) {
      return state.user
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    signIn ({ dispatch }, credentials) {
      // Generate random token
      const allowedcharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
      const temp = []
      const length = 300
      for (let i = 0; i < length; i++) {
        const j = (Math.random() * (allowedcharacters.length - 1)).toFixed(0)
        temp[i] = allowedcharacters[j]
      }

      const data = {
        token: temp.join(''),
        user: credentials
      }

      return dispatch('attempt', data)
    },

    // this action will check if the token is correct and will return the user details from the /me endpoint
    attempt ({ commit }, data) {
      if (data.token) {
        commit('SET_TOKEN', data.token)
        commit('SET_USER', data.user)
        console.log('data', data)
      } else {
        console.log('no token!')
      }
    },

    signOut ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  }
}
