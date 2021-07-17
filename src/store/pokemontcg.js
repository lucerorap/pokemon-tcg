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
    pagination: {
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
    },
    setFilterParam (state, response) {
      state.filter_params = response
    },
    setPaginationPage (state, response) {
      state.pagination.page = response
    }
  },
  actions: {
    async getList ({ commit, state }) {
      const params = {
        q:
            (state.filter_params.search !== '' ? state.filter_params.search + ' ' : '') + // Filter by name
            (state.filter_params.types !== null ? state.filter_params.types + ' ' : '') + // Filter by type
            (state.filter_params.rarities !== '' ? state.filter_params.rarities + ' ' : '') + // Filter by rarity
            (state.filter_params.sets), // Filter by set
        page: state.pagination.page,
        pageSize: state.pagination.pageSize
      }
      const response = await axios.get('https://api.pokemontcg.io/v2/cards/', { params })

      console.log('cards', response)
      commit('setList', response.data)
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
    },
    setFilterParam ({ commit }, searchParamData) {
      commit('setPaginationPage', 1) // Set to page 1 when filtering
      switch (searchParamData.type) {
        case 'search': {
          if (searchParamData.data === '' || searchParamData.data === null) {
            commit('setFilterParamSearch', '')
          } else {
            commit('setFilterParamSearch', 'name:"' + searchParamData.data + '*"')
          }
          break
        }
        case 'types': {
          if (searchParamData.data === 'allTypes') {
            return commit('setFilterParamTypes', '')
          } else {
            return commit('setFilterParamTypes', 'types:' + searchParamData.data)
          }
        }
        case 'rarities': {
          if (searchParamData.data === 'allRarities') {
            return commit('setFilterParamRarities', '')
          } else {
            return commit('setFilterParamRarities', 'rarity:' + searchParamData.data)
          }
        }
        case 'sets': {
          if (searchParamData.data === 'allSets') {
            return commit('setFilterParamSets', '')
          } else {
            return commit('setFilterParamSets', 'set.name:' + searchParamData.data)
          }
        }
      }
    },
    setPaginationPage ({ commit }, page) {
      return commit('setPaginationPage', page)
    },
    resetFilterParams ({ commit }, filtersParams) {
      return commit('setFilterParam', filtersParams)
    }
  }
}
