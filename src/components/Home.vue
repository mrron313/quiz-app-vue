<template>
    <div>
        <v-responsive v-if="introStage">
            <v-container fill-height>
                <v-layout align-center>

                    <v-flex v-if="introStage">
                        <h3 class="display-3">{{ title }}</h3>
                        <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
                        <v-divider class="my-3"></v-divider>  
                        <v-btn class="button" color="info" @click="startQuiz">START!</v-btn>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-responsive>

        <v-container>
            <v-layout align-center>

                <v-flex v-if="questionStage">
                    <question 
                        :question="questions[currentQuestion]"
                        v-on:answer="handleAnswer"
                        :question-number="currentQuestion+1"
                    ></question>
                </v-flex>

                <v-flex v-if="resultsStage">
                    <v-alert
                        type="success"
                        :value="true"
                    >
                        You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
                    </v-alert>

                    <v-btn class="button" color="primary" @click="pageRefresh">Back to home</v-btn>
                </v-flex>

                <v-flex v-if="introStage">
                    <scores-datatable />
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>

import {mapActions} from 'vuex'
const quizData = 'https://api.myjson.com/bins/vxe9l';

export default {

    data() {
        return {
            introStage:false,
            questionStage:false,
            resultsStage:false,
            title:'',
            questions:[],
            currentQuestion:0,
            answers:[],
            correct:0,
            perc:null,
        }
    },
  
    created() {
        fetch(quizData)
            .then(res => res.json())
            .then(res => {
                this.title = res.title;
                this.questions = res.questions;
                this.introStage = true;
            })

    },

    methods:{
        ...mapActions('quiz', {
            saveScore: 'saveScore'
        }),

        startQuiz() {
            this.introStage = false;
            this.questionStage = true;
            console.log('test'+JSON.stringify(this.questions[this.currentQuestion]));
        },

        handleAnswer(e) {           
            console.log('answer event ftw',e);
            this.answers[this.currentQuestion]=e.answer;
            if((this.currentQuestion+1) === this.questions.length) {
                this.handleResults();
                this.questionStage = false;
                this.resultsStage = true;
            } else {
                this.currentQuestion++;
            }                       
        },

        handleResults() {
            console.log('handle results');
            this.questions.forEach((a, index) => {
                if(this.answers[index] === a.answer) this.correct++;        
            });
            this.perc = ((this.correct / this.questions.length)*100).toFixed(2);
            
            this.saveScore({
                u_id: this.$store.state.user.user.u_id,
                score: this.correct
            })
            .then(response => {
                console.log('saved to db')
            })

            console.log(this.correct+' '+this.perc);
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

</style>
