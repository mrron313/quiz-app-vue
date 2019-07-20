<template>
    <div>
        <v-layout align-center justify-center column fill-height>
            <v-img width="15%" :src="require('@/assets/logo.png')"></v-img>

            <v-text-field
                v-model="email"
                label="E-mail"
                required
            ></v-text-field>  
            <v-text-field
                v-model="password"
                label="Password"
                required
            ></v-text-field>  
            <v-btn @click="submitRegister">Register</v-btn>
            
        </v-layout>   
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'register',
    data() {
        return{
            password: '',
            email: ''
        }
    },  
    methods: {
        ...mapActions('user', {
            resgister: 'resgister'
        }),

        submitRegister(){
            this.resgister({
                email: this.email,
                password: this.password
            })
            .then(response => {
                if( this.$store.state.user.loggedIn ){
                    this.$router.replace('/')   
                    location.reload()       
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
