<template>
  <div id="app">
    <v-card id="navbackg" v-if="$route.name=='Home'">

        <nav class="nav justify-content-center">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/Userenv" v-if="isLogged">Ambiente</router-link>
          <router-link class="nav-link" to="/login" v-else>Login</router-link>
          <a class="nav-link active" v-if="isLogged" @click="logout()" >
            Logout
          </a>
        </nav>
    </v-card>
    
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
 

export default {
  
  computed: {
    ...mapGetters([
      'isLogged'
    ])
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },

  name: 'App'

}


</script>

<style>
  
  .nav-link{
    color:#263a35;
    font-weight: 500;
  }

  .nav-link:hover{
    color:#e6fef8;
    cursor: pointer;
  }

  #navbackg{
    background-color: #57e2c0;
  }

  html{
    overflow-y: hidden!important;
  }
  
</style>
