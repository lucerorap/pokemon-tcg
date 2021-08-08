<template>
    <b-container>
        <Filters @change-view="changePokemonView" />
        <!-- <div class="pokemon-list-wrapper">
            <div class="card-wrapper" v-if="list !== null">
                <div v-for="card in list.data" :key="card.id" >
                    <h3>{{ card.name }}</h3>
                    <section  class="demo">
                        <div class="card" :style="{ 'background-image': 'url('+card.images.small+')' }"></div>
                    </section>
                </div>
            </div>
            <section class="cards">
                <div class="card charizard"></div>
                <div class="card pika"></div>
                <div class="card mew"></div>
            </section>
        </div> -->
        <!-- <b-row class="demo" v-if="list !== null">
            <b-col cols="12" sm="3" class="my-1" v-for="card in list.data" :key="card.id">
                <div class="card-poke" :style="{ 'background-image': 'url('+card.images.small+')' }"></div>
            </b-col>
        </b-row> -->
        <PokemonListView v-if="pokemonview === 'List'" :fields="fields" :list="list" />
        <PokemonGridView v-if="pokemonview === 'Grid'" :list="list" />
        <Pagination :list="list" />
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Filters from '../components/Filters.vue'
import Pagination from '../components/Pagination.vue'
import PokemonGridView from '../components/PokemonGridView.vue'
import PokemonListView from '../components/PokemonListView.vue'

export default {
  name: 'PokemonList',
  components: {
    Filters,
    Pagination,
    PokemonGridView,
    PokemonListView
  },
  data () {
    return {
      pokemonview: 'List',
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'subtype'
        },
        {
          key: 'hp',
          sortable: true
        },
        {
          key: 'types'
        //   formatter: (value, key, item) => {
        //     return value ? value.join(',') : ''
        //   }
        },
        {
          key: 'level',
          sortable: true
        },
        'actions'
      ]
    }
  },
  methods: {
    changePokemonView (event) {
      console.log('pokelistevent', event)
      this.pokemonview = event
    }
  },
  computed: {
    ...mapGetters({ list: 'pokemontcg/list' })
  },
  created () {
    this.$store.dispatch('pokemontcg/resetFilterParams', {
      search: '',
      types: '',
      rarities: '',
      sets: ''
    })
    this.$store.dispatch('pokemontcg/getList')
  }
}
</script>

<style scoped>

</style>
