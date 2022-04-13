import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import vuetify from './plugins/vuetify';
import store from './plugins/store'
import axios from 'axios'


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router, //pelo amor, salve router com esse nome
  vuetify,
  store,
  created () {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      this.$store.commit('setUserData', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      })
    } //função created para armazenar autenticação e manusear não autenticação do usuário!
}).$mount('#app')


