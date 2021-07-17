import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BoostrapVue from 'bootstrap-vue'

require('@/store/subscriber')

Vue.config.productionTip = false

Vue.use(BoostrapVue)

store.dispatch('auth/attempt', { token: localStorage.getItem('token'), user: JSON.parse(localStorage.getItem('user')) }).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
