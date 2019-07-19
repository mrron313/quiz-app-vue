
import firebase from '@/firebase'
import db from '@/db'

const state = {
    user: {},
    loggedIn: false
}

const getters = {

}

const mutations = {
  authenticatedUser (state) {
    var user = firebase.auth().currentUser

    if (user != null) {
      state.user.u_id = user.uid
      state.user.email = user.email
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
        await firebase.auth().signInWithEmailAndPassword(credientials.email, credientials.password).then(
          function (user){
            commit('authenticatedUser')
          },
          function (err){
            console.log(err);
          }
        );
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

      async signup({commit}, credientials) {
        await firebase.auth().createUserWithEmailAndPassword(credientials.email, credientials.password).then(
          function (user){
            return user
          },
          function (err){
            return err;
          }
        );
      },

      async saveScore({commit}, results){
        await db.collection("quizes").add({
          u_id: results.u_id, 
          score: results.score,
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