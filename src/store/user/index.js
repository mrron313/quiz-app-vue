import firebase from '@/firebase'
import db from '@/db'

const state = {
    user: {},
    loggedIn: false,
    error: ''
}

const getters = {

}

const mutations = {
  authenticatedUser (state) {
    const user = firebase.auth().currentUser

    if (user != null) {
      state.user.u_id = user.uid
      state.user.u_email = user.email
      state.loggedIn = true
    }
  },

  logoutUser(state){
    state.user = {}
    state.loggedIn = false
  },

}

const actions = {
  async login({commit}, credientials) {
    
    return new Promise((resolve, reject) => {
      
      firebase.auth().signInWithEmailAndPassword(credientials.email, credientials.password).then(
        function (user){
          commit('authenticatedUser')
          resolve(user)
        },
        function (err){
          reject(err)
        }
      );

    })

  },

  async logout({commit}){
    await firebase.auth().signOut()
    .then(function() {
        commit('logoutUser')
    })
    .catch(function(err) {
        console.log(err)
    });
  },

  async resgister({commit}, credientials) {

    return new Promise((resolve, reject) => {
      
      firebase.auth().createUserWithEmailAndPassword(credientials.email, credientials.password).then(
        function (user){
          commit('authenticatedUser')
          resolve(user)
        },
        function (err){
          reject(err)
        }
      );

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