<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>Quiz App</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="loggedIn==true" flat to="/">Home</v-btn>
        <v-btn v-if="loggedIn==true" flat to="/about">About</v-btn>
        <v-btn v-if="loggedIn==true" flat @click="submitLogout">Logout</v-btn>
        <v-btn v-if="loggedIn==false" flat>Login</v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'app',
  data:{
    return(){
      loggedIn: false
    }
  },

  methods:{
    ...mapActions('user', {
        logout: 'logout'
    }),

    submitLogout(){
      this.logout().then(response => {
        this.$router.replace('login') 
        location.reload()       
      })
    },

    loginCheck(){
      this.loggedIn = this.$store.state.user.loggedIn
    }
  },

  created(){
    this.loginCheck()
  }
};

</script>

<style>

</style>
