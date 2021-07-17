import axios from 'axios'

export default {
  namespaced: true,
  state: {
    list: null,
    types: null,
    rarities: null,
    sets: null,
    filter_params: {
      search: '',
      types: '',
      rarities: '',
      sets: ''
    },
    query_params: {
      page: 1,
      pageSize: 20
    }
  },
  getters: {
    list (state) {
      return state.list
    },
    types (state) {
      return state.types
    },
    rarities (state) {
      return state.rarities
    },
    sets (state) {
      return state.sets
    }
  },
  mutations: {
    setList (state, response) {
      state.list = response
    },
    setTypes (state, response) {
      state.types = response
    },
    setRarities (state, response) {
      state.rarities = response
    },
    setSets (state, response) {
      state.sets = response
    },
    setSearch (state, response) {
      state.query_params.q = response
    },
    setFilterParamSearch (state, response) {
      state.filter_params.search = response
    },
    setFilterParamTypes (state, response) {
      state.filter_params.types = response
    },
    setFilterParamRarities (state, response) {
      state.filter_params.rarities = response
    },
    setFilterParamSets (state, response) {
      state.filter_params.sets = response
    }
  },
  actions: {
    async getList ({ commit, state }) {
      const params = {
        q: state.filter_params.search + ' ' + state.filter_params.types + ' ' + state.filter_params.rarities + ' ' + state.filter_params.sets,
        page: state.query_params.page,
        pageSize: state.query_params.pageSize
      }
      const response = await axios.get('https://api.pokemontcg.io/v2/cards/', { params })

      console.log('cards', response)
      commit('setList', response.data)
    },
    setSearchParam ({ commit, state }, searchParamData) {
      let searchData = searchParamData.data
      switch (searchParamData.type) {
        case 'search': {
          commit('setFilterParamSearch', 'name:' + searchData)
          break
        }
        case 'types': {
          if (searchParamData.data === 'allTypes') {
            searchData = ''
          }
          commit('setFilterParamTypes', 'types:' + searchData)
          break
        }
        case 'rarities': {
          if (searchParamData.data === 'allRarities') {
            searchData = ''
          }
          commit('setFilterParamRarities', 'rarity:' + searchData)
          break
        }
        case 'sets': {
          if (searchParamData.data === 'allSets') {
            searchData = ''
          }
          return commit('setFilterParamSets', 'set.name:' + searchData)
        }
      }
    },
    async getTypes ({ commit }) {
      const response = await axios.get('https://api.pokemontcg.io/v2/types')

      console.log('types', response)
      commit('setTypes', response.data.data)
    },
    async getRarities ({ commit }) {
      const response = await axios.get('https://api.pokemontcg.io/v2/rarities')

      commit('setRarities', response.data.data)
    },
    async getSets ({ commit }) {
      const response = await axios.get('https://api.pokemontcg.io/v2/sets')

      console.log('sets', response.data.data)
      commit('setSets', response.data.data)
    }
  }
}
