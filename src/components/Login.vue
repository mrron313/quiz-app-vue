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
                :type="'password'"
                required
            ></v-text-field>  
            <v-btn @click="submitLogin">Login</v-btn>
            
            <div class="custom-error">
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
            </div>
        </v-layout>   
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'login',
    data() {
        return{
            errors: [],
            password: '',
            email: ''
        }
    },  
    methods: {
        ...mapActions('user', {
            login: 'login'
        }),

        submitLogin(e){
            this.errors = [];

            if (!this.email) {
                this.errors.push('Email required.');
            }
            if (!this.password) {
                this.errors.push('Password required.');
            }

            e.preventDefault();
            
            this.login({
                email: this.email,
                password: this.password
            })
            .then(response => {
                if( this.$store.state.user.loggedIn ){
                    this.$router.replace('/')   
                    location.reload()       
                }
            }, error => {
                this.errors.push(error.message);
            })
        }
    }
}
</script>

<style scoped>

    .custom-error{
        margin-top: 10px;
    }

    .custom-error p{
        color: red
    }

</style>
