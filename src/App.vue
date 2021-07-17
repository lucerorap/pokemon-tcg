<template>
  <div id="app">
    <Header v-if="authenticated" />
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
