<template>
    <div>
       <div class="login">
            <input type="text" placeholder="Email">   
            <input type="password" placeholder="Password">
            <v-btn @click="login">Login</v-btn>   
        </div> 
    </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    name: 'login',
    data() {
        return{

        }
    },  
    methods: {
        ...mapActions('user', {
        login: 'login'
        })
    }
}
</script>