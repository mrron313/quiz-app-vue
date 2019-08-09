import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import user from '@/store/user'
import quiz from '@/store/quiz'

const store = new Vuex.Store({
    state: {
        
    },

    modules: {
        user,
        quiz
    },

    plugins: [createPersistedState()],
});

export default store