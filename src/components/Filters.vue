<template>
    <div style="text-align: center !important">
        <div class="filters">
            Search by Name: <input @keyup="searchTimeOut($event, 'search')" type="text" name="search" v-model="filters.search" />
        </div>
        <div class="filters">
            Types:
            <select @change="filter($event, 'types')" v-model="filters.types">
                <option value='allTypes'>All</option>
                <option  v-for="type in types" :key="type">{{ type }}</option>
            </select>
        </div>
        <div class="filters">
            Rarity:
            <select @change="filter($event, 'rarities')" v-model="filters.rarities">
                <option value='allRarities'>All</option>
                <option v-for="rarity in rarities" :key="rarity">{{ rarity }}</option>
            </select>
        </div>
        <div class="filters">
            Sets:
            <select @change="filter($event, 'sets')" v-model="filters.sets">
                <option value='allSets'>All</option>
                <option v-for="set in sets" :key="set.id">{{ set.name }}</option>
            </select>
        </div>
        <div class="filters">
            <b-button @click="resetFilters">Reset</b-button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Filters',
  data () {
    return {
      timer: null,
      filters: {
        search: '',
        types: 'allTypes',
        rarities: 'allRarities',
        sets: 'allSets'
      }
    }
  },
  methods: {
    ...mapActions({
      getList: 'pokemontcg/getList',
      setFilterParam: 'pokemontcg/setFilterParam',
      resetFilterParams: 'pokemontcg/resetFilterParams'
    }),
    filter (e, type) {
      const searchParamData = {
        data: e.target.value,
        type
      }

      this.setFilterParam(searchParamData).then(() => {
        this.getList()
      })
    },
    resetFilters () {
      this.filters = {
        search: '',
        types: 'allTypes',
        rarities: 'allRarities',
        sets: 'allSets'
      }
      this.resetFilterParams({
        search: '',
        types: '',
        rarities: '',
        sets: ''
      }).then(() => {
        this.getList()
      })
    },
    searchTimeOut (e, type) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        console.log('value => ', e.target.value)
        this.filter(e, type)
      }, 800)
    }
  },
  computed: {
    ...mapGetters({
      types: 'pokemontcg/types',
      rarities: 'pokemontcg/rarities',
      sets: 'pokemontcg/sets'
    })
  },
  created () {
    this.filters = {
      search: '',
      types: 'allTypes',
      rarities: 'allRarities',
      sets: 'allSets'
    }
    this.$store.dispatch('pokemontcg/getTypes')
    this.$store.dispatch('pokemontcg/getRarities')
    this.$store.dispatch('pokemontcg/getSets')
  }
}
</script>

<style scoped>
select, input {
    margin-top: 20px;
    padding: 6px;
    border: #41b883 1px solid;
}
.filters {
    padding: 20px;
    display: inline;
}
</style>
