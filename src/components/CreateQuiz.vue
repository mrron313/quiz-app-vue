
<template>

    <div>
        <v-container grid-list-md>
            <v-layout wrap>

                 <v-flex xs8>
                    <v-card
                        max-width="1020"
                        class="mx-auto"
                    >
                        <v-card-title>
                            <h2>Create Quiz</h2>
                        </v-card-title>

                        <v-card-text>

                            <v-text-field
                                v-model="quizTitle"
                                label="Quiz Title"
                                required
                            ></v-text-field>

                            <v-btn @click="addNewQuestion = true">Add New Question</v-btn>

                            <v-select
                                v-if="addNewQuestion == true" v-model="selectedQuestionType"
                                :items="questionTypesDropdown"
                                item-value="value" item-text="text"
                                label="Choose one type"
                                outlined
                            >
                            </v-select>

                            <div v-if="addNewQuestion == true" class="card-body">
                                <v-form 
                                    v-on:submit.prevent="addQuestion"
                                >

                                    <v-text-field
                                        v-model="question.type"
                                        label="Type"
                                        required
                                        disabled
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="question.text"
                                        label="Question"
                                        required
                                    ></v-text-field>

                                    <v-text-field
                                        v-if="selectedQuestionType == 'mc'"
                                        v-model="question.answers"
                                        label="Answers"
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="question.answer"
                                        label="Answer"
                                    ></v-text-field>
                                    
                                    <v-btn type="submit">Add</v-btn>

                                </v-form>
                            </div> 
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex xs4>
                    <v-form 
                        v-if="newQuestionAdded == true"
                        v-on:submit.prevent="addQuiz"
                    >
                        <v-card v-for="qs in questions" :key="qs.text">

                            <v-card-title>
                                <h2>{{ qs.text }}</h2>
                            </v-card-title>
                            
                            <v-card-text>
                                
                                Answers:
                                <div v-if="qs.type == 'mc'" >
                                    {{ qs.answers }}
                                </div>

                                <div v-else>
                                    True, False
                                </div>

                                Answer:
                                <div>
                                    {{ qs.answer }}
                                </div>

                            </v-card-text>

                        </v-card>

                        <v-card>
                            <v-card-title>
                                <v-btn
                                    type="submit"
                                >
                                    Submit Quiz
                                </v-btn>
                            </v-card-title>
                        </v-card>
                        
                    </v-form>

                    <div v-else>
                        <v-card>
                            <v-card-title>
                                No Question Created!
                            </v-card-title>
                        </v-card>
                    </div>    
                </v-flex>

            </v-layout>
        </v-container>
    </div>

</template>

<script>

import db from '@/db'

export default {
  components: {
      name: 'CreateQuiz'
  },

  data () {
    return {
        questionTypesDropdown: [
        {
            text: "True/False",
            value: "tf"
        },
        {
            text: "MCQ",
            value: "mc"
        }
        ],
        addNewQuestion: false,

        selectedQuestionType: 'tf',

        newQuestionAdded: false,

        quizTitle: '',

        questions: [],

        question: {
            text: '',
            type: 'tf',
            answers: '',
            answer: ''
        }
    }
  },

  watch: {
        'selectedQuestionType': function(newVal, oldVal) {
            this.question.type = newVal
        }
  },

  methods: {
        async addQuiz() {

            await db.collection("quizes").add({

                title: this.quizTitle,
                questions: this.questions,
                created: Date.now()
            })
        },

        addQuestion(){
            
            this.question.answers = this.question.answers.split(",") // Converting strings to array of string
            this.questions.push( Object.assign({}, this.question) )
            this.newQuestionAdded = true

            // Resetting input fields
            this.question.text = ''
            this.question.answers = ''
            this.question.answer = ''
        }
    }
}
</script>

<style scoped>
    .v-btn{
        margin-left: 0px
    }

    .v-select{
        margin-top: 10px
    }

    .v-card__text{
        padding-top: 0px
    }

    .v-card {
        margin-top: 10px
    }

</style>
