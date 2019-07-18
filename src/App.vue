<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>Quiz App</v-toolbar-title>
      <v-spacer></v-spacer>
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
export default {
  name: 'app',
};

</script>

<style>

</style>
