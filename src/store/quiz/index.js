import firebase from '@/firebase'
import db from '@/db'


const state = {
    quizScores: {}
}

const getters = {

}

const mutations = {
    async fetchQuizScores(state){
        const snapshot = await firebase.firestore().collection('quizes').get()
        state.quizScores = snapshot.docs.map(doc => doc.data())
    }
}

const actions = {
    async fetchAllScores({commit}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              commit('fetchQuizScores')
              resolve()
            }, 1000)
        })        
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}