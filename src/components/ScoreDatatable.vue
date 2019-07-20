<template>

    <div>
        <h2>Leader Board</h2>

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
        :loading="true"
        v-bind:pagination.sync="pagination"
        class="elevation-1"
        >
            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.u_id }}</td>
                <td class="text-xs-left">{{ props.item.score }}</td>
                <td class="text-xs-left">{{ props.item.created | createdtoDate }}</td>
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
                    sortable: false,
                    align: 'left', 
                },
                { 
                    text: 'Played', 
                    value: 'created',
                    sortable: false, 
                    align: 'left', 
                },
            ],
            scores: [],
            pagination: {'sortBy': 'created', 'descending': true, 'rowsPerPage': -1}

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
    },

    filters: {
        createdtoDate(value){
            var date = new Date(value)
            return date
        }
    }
}

</script>