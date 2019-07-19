
import firebase from '@/firebase'
import { longStackSupport } from 'q';

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
      state.user.email = user.email
      state.loggedIn = true
    }
  },

  logoutUser(state){
    state.user = {}
    state.loggedIn = false
  }
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
      }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}