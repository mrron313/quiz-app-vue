<template>

    <div>
        <h2>Leader Board</h2>
        <br>

        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-data-table
        :headers="headers"
        :items="scores"
        :search="search"
        class="elevation-1"
        >
        <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.u_id }}</td>
            <td class="text-xs-left">{{ props.item.score }}</td>
        </template>
        </v-data-table>
    </div>

</template>

<script>
import {mapActions} from 'vuex'

export default {
    data () {
        return {
            search: '',
            headers: [
                {
                    text: 'User ID',
                    align: 'left',
                    sortable: false,
                    value: 'u_id'
                },
                { 
                    text: 'Score', 
                    value: 'score', 
                    align: 'left', 
                },
            ],
            scores: []
        }
    },

    methods:{
        ...mapActions('quiz', {
            fetchAllScores: 'fetchAllScores'
        }),

        fetchScores(){
            this.fetchAllScores().then(response => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        this.scores = this.$store.state.quiz.quizScores
                        resolve()
                    }, 1000)
                })
            })
        }
    },
    
    mounted(){
        this.fetchScores()    
    }
}

</script>