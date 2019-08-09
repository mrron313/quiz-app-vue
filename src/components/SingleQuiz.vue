<template>
    <div>
        <v-responsive v-if="introStage">
            <v-container fill-height>
                <v-layout align-center>

                    <v-flex v-if="introStage">
                        <h3 class="display-3">{{ title }}</h3>
                        <span class="subheading">{{ description }}</span>
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
                    <scores-datatable :quizId="quizId" />
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
            introStage:false,
            questionStage:false,
            resultsStage:false,
            quizId: '',
            allQuizes: [],
            singleQuizDetails: {},
            title:'',
            description: '',
            questions:[],
            currentQuestion:0,
            answers:[],
            correct:0,
            perc:null,
        }
    },
  
    created() {

        this.getSingleQuiz()
    },

    methods:{
        ...mapActions('quiz', {
            saveScore: 'saveScore'
        }),

        getSingleQuiz(){
            this.quizId = this.$route.params.id,
            this.allQuizes = this.$store.state.quiz.allQuizes

            for (var i=0; i<this.allQuizes.length; i++) {
                if (this.allQuizes[i].id == this.quizId) {
                    this.singleQuizDetails = this.allQuizes[i];
                }
            }

            this.title = this.singleQuizDetails.title
            this.description = this.singleQuizDetails.description
            this.questions = this.singleQuizDetails.questions
            this.introStage = true;
        },

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
            
            console.log(this.$route.params.id)
            this.saveScore({
                quiz_id: this.$route.params.id,
                u_id: this.$store.state.user.user.u_id,
                u_email: this.$store.state.user.user.u_email,
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
