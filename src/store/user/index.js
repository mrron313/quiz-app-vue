
import firebase from '@/firebase'

const state = {
    user: 'Arif Ul Islam'
}

const getters = {

}

const mutations = {

}

const actions = {
    async login({commit}) {
        firebase.auth().signInWithEmailAndPassword("arifulislam@bs-23.net", "Bs23Bs23Arif313").then(
          function (user){
            alert("user signed in");
          },
          function (err){
            alert('Opps' + err.message);
          }
        );
      },

      async signup({commit}) {
        firebase.auth().createUserWithEmailAndPassword("arifulislam@bs-23.net", "Bs23Bs23Arif313").then(
          function (user){
            alert("user created");
          },
          function (err){
            alert(err.message);
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