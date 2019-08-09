import firebase from '@/firebase'
import db from '@/db'

const state = {
    allQuizes: {},
    quizScores: {}
}

const getters = {

}

const mutations = {
    
    async fetchAllQuizes(state){
        const snapshot = await firebase.firestore().collection('quizes').get()
        state.allQuizes = snapshot.docs.map(doc => doc.data())
    },

    async fetchQuizScores(state){
        const snapshot = await firebase.firestore().collection('scores').get()
        state.quizScores = snapshot.docs.map(doc => doc.data())
    }

}

const actions = {
    async fetchAllQuizes({commit}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              commit('fetchAllQuizes')
              resolve()
            }, 2000)
        })        
    },

    async fetchAllScores({commit}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              commit('fetchQuizScores')
              resolve()
            }, 2000)
        })        
    },
    
    async saveScore({commit}, results){
        console.log(results)
        await db.collection("scores").add({
          quiz_id: results.quiz_id,
          u_id: results.u_id, 
          u_email: results.u_email, 
          score: results.score,
          created: Date.now()
        })
        .then(function() {
            console.log("Score Saved!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}