import firebase from '@/firebase'
import db from '@/db'

const state = {
    quizScores: {}
}

const getters = {

}

const mutations = {
    async fetchQuizScores(state){
        const snapshot = await firebase.firestore().collection('scores').get()
        state.quizScores = snapshot.docs.map(doc => doc.data())
    }
}

const actions = {
    async fetchAllScores({commit}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              commit('fetchQuizScores')
              resolve()
            }, 2000)
        })        
    },
    
    async saveScore({commit}, results){
        await db.collection("scores").add({
          u_id: results.u_id, 
          score: results.score,
          created: Date.now()
        })
        .then(function() {
            console.log("Document successfully written!");
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