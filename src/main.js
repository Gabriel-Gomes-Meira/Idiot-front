import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
// //import Echo from 'laravel-echo';




Vue.config.productionTip = false
// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.VUE_APP_WEBSOCKETS_KEY,
//     wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
//     wsPort: 6001,
//     forceTLS: false,
//     disableStats: true
// });

new Vue({
  render: h => h(App),
  router, //pelo amor, salve router com esse nome
  store, 
  vuetify,
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
