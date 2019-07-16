
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
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
          const result = await firebase.auth().signInWithPopup(provider);
          console.log(result);
        } catch(error) {
          console.log(error);
        }
      }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}