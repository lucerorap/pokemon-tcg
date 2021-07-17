<template>
    <div>
        <div class="filters">
            Search by Name: <input @keyup="searchTimeOut($event, 'search')" type="text" name="search" v-model="search" />
        </div>
        <div class="filters">
            Types:
            <select @change="filter($event, 'types')">
                <option value='allTypes'>Select a type</option>
                <option  v-for="type in types" :key="type">{{ type }}</option>
            </select>
        </div>
        <div class="filters">
            Rarity:
            <select @change="filter($event, 'rarities')">
                <option value='allRarities'>Select a Rarity</option>
                <option v-for="rarity in rarities" :key="rarity">{{ rarity }}</option>
            </select>
        </div>
        <div class="filters">
            Sets:
            <select @change="filter($event, 'sets')">
                <option value='allSets'>Select a Set</option>
                <option v-for="set in sets" :key="set.id">{{ set.name }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Filters',
  data () {
    return {
      search: '',
      timer: null
    }
  },
  methods: {
    ...mapActions({
      getList: 'pokemontcg/getList',
      setSearchParam: 'pokemontcg/setSearchParam'
    }),
    filter (e, type) {
      const searchParamData = {
        data: e.target.value,
        type
      }

      this.setSearchParam(searchParamData).then(() => {
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
