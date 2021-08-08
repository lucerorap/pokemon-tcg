<template>
    <b-container>
        <Filters />
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
        <b-row class="demo" v-if="list !== null">
            <b-col cols="12" sm="3" class="my-1" v-for="card in list.data" :key="card.id">
                <div class="card-poke" :style="{ 'background-image': 'url('+card.images.small+')' }"></div>
            </b-col>
        </b-row>
        <Pagination :list="list" />
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Filters from '../components/Filters.vue'
import Pagination from '../components/Pagination.vue'

export default {
  name: 'PokemonList',
  components: {
    Filters,
    Pagination
  },
  methods: {
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
/* https://codepen.io/simeydotme/pen/PrQKgo <------- CSS Source code for Poke Cards */
.pokemon-list-wrapper {
    margin: 10px;
}
@media (max-width: 500px) {
    .card-wrapper {
        grid-template-columns: 1fr
    }
}
.card-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
}
.card-poke {
    --color1: #00e7ff;
    --color2: #ff00e7;
    width: 18.25vw;
    height: 25.20vw;
    background-color: #211799;
    /* background-image: url(https://images.pokemontcg.io/swsh3/19_hires.png); */
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5% / 3.5%;
    box-shadow: -13px -13px 13px -15px var(--color1), 13px 13px 13px -15px var(--color2), 0 0 4px 2px rgba(255, 255, 255, 0.5), 0 35px 25px -15px rgba(0, 0, 0, 0.3);
    /* position: relative; */
    overflow: hidden;
    /* display: block; */
    /* display: inline-block; */
    /* vertical-align: middle; */
    margin: 20px 10px;
    animation: holoCard 15s ease infinite;
    /* transform-origin: center; */
    z-index: 10;
    overflow: hidden;
    transform: translate3d(0, 0, -1px);
}
 .card-poke.charizard {
    --color1: #ff9436;
    --color2: #ff5a90;
}
 .card-poke.pika {
    --color1: #ffdf35;
    --color2: #65f0ff;
    background-image: url(https://images.pokemontcg.io/swshp/SWSH063_hires.png);
}
 .card-poke.mew {
    --color1: #eb8bff;
    --color2: #7eeefa;
    background-image: url(https://images.pokemontcg.io/swsh3/69_hires.png);
}
 .card-poke > span {
    position: relative;
    top: 45%;
}
 .card-poke:before, .card:after {
    content: "";
    opacity: 0.5;
    mix-blend-mode: screen;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-repeat: no-repeat;
}
 .card-poke:before {
    background-position: 50% 50%;
    background-size: 300% 300%;
    animation: holoGradient 15s ease infinite both;
    background-image: linear-gradient(115deg, transparent 0%, var(--color1) 30%, transparent 47.5%, transparent 52.5%, var(--color2) 70%, transparent 100%);
    mix-blend-mode: color-dodge;
    opacity: 0.8;
    filter: brightness(0.75) contrast(1.5);
}
 .card-poke:after {
    opacity: 1;
    background-image: url("https://assets.codepen.io/13471/sparkles.gif");
    background-position: center;
    background-size: 160%;
    z-index: 2;
    animation: holoSparkle 15s ease infinite both;
    filter: brightness(2.25);
    transition: filter 0.5s ease;
    mix-blend-mode: screen;
}
 .card-poke.active {
    animation: none;
}
 .card-poke.active:before {
    opacity: 1;
    animation: none;
    transition: none;
    background-image: linear-gradient(115deg, transparent 15%, var(--color1) 46%, var(--color2) 54%, transparent 85%);
    opacity: 0.8;
    filter: brightness(0.75) contrast(1.5);
}
 .card-poke.active:before, .card-poke.active:after {
    animation: none;
}
 .card-poke.active:after {
    filter: brightness(1.2);
}
 .demo .card-poke:nth-of-type(1), .demo .card-poke:nth-of-type(2), .demo .card-poke:nth-of-type(3) {
    /* width: 10vw;
    height: 13.8vw; */
    box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.4), 0 25px 15px -10px rgba(0, 0, 0, 0.5);
    animation: none;
}
 .demo .card-poke:nth-of-type(1):before, .demo .card-poke:nth-of-type(2):before, .demo .card-poke:nth-of-type(3):before, .demo .card-poke:nth-of-type(1):after, .demo .card-poke:nth-of-type(2):after, .demo .card-poke:nth-of-type(3):after {
    animation: none;
    opacity: 1;
}
 .demo .card-poke:nth-of-type(1):before, .demo .card-poke:nth-of-type(1):after {
    display: none;
}
 .demo .card-poke:nth-of-type(2) {
    background: none;
}
 .demo .card-poke:nth-of-type(2):before {
    display: none;
}
 .demo .card-poke:nth-of-type(3) {
    background: none;
}
 .demo .card-poke:nth-of-type(3):before {
    background-position: center;
}
 .demo .card-poke:nth-of-type(3):after {
    display: none;
}
 .operator {
    display: inline-block;
    vertical-align: middle;
    font-size: 45px;
}
 @keyframes holoSparkle {
    0%, 5%, 100% {
        opacity: 0.2;
        background-position: 50% 50%;
    }
    33% {
        opacity: 1;
        background-position: 40% 40%;
        filter: brightness(1);
    }
    45% {
        opacity: 0.4;
    }
    66% {
        opacity: 1;
        background-position: 60% 60%;
        filter: brightness(1);
    }
}
 @keyframes holoGradient {
    0%, 100% {
        opacity: 0.1;
        background-position: 50% 50%;
    }
    33% {
        background-position: 100% 100%;
        opacity: 0.88;
    }
    66% {
        background-position: 0% 0%;
        opacity: 0.88;
    }
}
 @keyframes holoCard {
    0%, 100% {
        transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
    }
    33% {
        transform: rotateZ(-10deg) rotateX(20deg) rotateY(-12deg);
    }
    66% {
        transform: rotateZ(10deg) rotateX(-20deg) rotateY(12deg);
    }
}
 .demo, .cards {
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
    perspective: 2000px;
    /* position: relative; */
    z-index: 1;
    transform: translate3d(0.1px, 0.1px, 0.1px);
}
 .cards .card-poke:nth-child(2), .cards .card-poke:nth-child(2):before, .cards .card-poke:nth-child(2):after {
    animation-delay: 0.2s;
}
.cards .card-poke:nth-child(3), .cards .card-poke:nth-child(3):before, .cards .card-poke:nth-child(3):after {
    animation-delay: 0.4s;
}
</style>
