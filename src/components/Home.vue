<template>
    <div>

        <v-container grid-list-md text-center>
            <v-layout wrap>
                <bar-loader 
                    class="custom-class" 
                    :color="spinnerColor" 
                    v-if="loading == false" 
                    :size="size" 
                    :sizeUnit="sizeUnit">
                </bar-loader>
                
                <v-flex v-for="quiz in quizData" :key="quiz.title" xs3>
                    <v-hover v-slot:default="{ hover }">
                        <v-card
                            :elevation="hover ? 12 : 2"
                            class="mx-auto"
                            max-width="350"
                            dark
                        >
                            <v-card-title> 
                                <h3>{{ quiz.title }}</h3>
                            </v-card-title>

                            <v-card-text> 
                                <p>{{ quiz.description }}</p>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                                <v-btn flat :to="{ name: 'single-quiz', params: { id: quiz.id } }" class="btn-primary">See Details</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>

<script>

import {mapActions} from 'vuex'

export default {

    data() {
        return {
            quizData: [],
            loading: false,
            spinnerColor: '#bada55',
            sizeUnit: 'px',
            size: 130
        }
    },
  
    created() {
        this.fetchQuizFromState()
    },

    methods:{
        ...mapActions('quiz', {
            fetchAllQuizes: 'fetchAllQuizes'
        }),

        fetchQuizFromState() {
            
            this.fetchAllQuizes().then(response => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        this.quizData = this.$store.state.quiz.allQuizes
                        this.loading = true
                        resolve()
                    }, 1000)
                })
            })
        },

        pageRefresh(){
            location.reload()
        },
    }
}

</script>

<style scoped>

.button{
  margin-left: 0px  
}

.v-card__actions{
    padding-bottom: 10px
}

</style>
