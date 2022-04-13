import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default new Vuex.Store({
  state: {
    user: null,
    atualRoom: JSON.parse(localStorage.getItem('atualRoom'))
  },

  mutations: {
    setUserData (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },

    clearUserData () {
      localStorage.removeItem('user')
      location.reload()
    },

    inGaming (state, atualRoom) {
      state.atualRoom = atualRoom;
      localStorage.setItem('atualRoom', JSON.stringify(atualRoom));
    },
    
    outinGame () {
      localStorage.removeItem('atualRoom');
      this.state.atualRoom = null;
    }
  },

  actions: {
    login ({ commit }, credentials) {
      return axios
        .post('/users/login', credentials)
        .then(({ data }) => {
          commit('setUserData', data)
        })
    },

    logout ({ commit }) {
      commit('clearUserData')
    },

    gaming ({ commit }, room) {
      commit('inGaming', room)
    },

    gameout ({ commit }) {
      commit('outinGame')
    }
  },

  getters : {
    isLogged: state => !!state.user,
  }
})
