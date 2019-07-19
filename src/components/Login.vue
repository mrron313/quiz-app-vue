<template>
    <div>
        <v-layout align-center justify-center column fill-height>
            <v-img width="15%" :src="require('@/assets/logo.png')"></v-img>

            <v-text-field
                v-model="email"
                label="E-mail"
                value="arifulislam@bs-23.net"
                required
            ></v-text-field>  
            <v-text-field
                v-model="password"
                label="Password"
                value="Bs23Bs23Arif313"
                required
            ></v-text-field>  
            <v-btn @click="submitLogin">Login</v-btn>
        </v-layout>   
    </div>
</template>

<script>

import firebase from '@/firebase'
import { mapActions } from 'vuex';

export default {
    name: 'login',
    data() {
        return{
            password: '',
            email: ''
        }
    },  
    methods: {
        ...mapActions('user', {
            login: 'login'
        }),

        submitLogin(){
            this.login({
                email: this.email,
                password: this.password
            })
            .then(response => {
                if( this.$store.state.user.loggedIn ){
                    this.$router.replace('home')   
                    location.reload()       
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
