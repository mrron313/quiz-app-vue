<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>Quiz App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="signup">Sign Up</v-btn>
      <v-btn @click="login">Login</v-btn>
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

import { mapActions } from 'vuex';
export default {
  name: 'app',
  methods: {
    ...mapActions('user', {
      signup: 'signup',
      login: 'login'
    })
  }
};

</script>

<style>

</style>
