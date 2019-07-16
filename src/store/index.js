import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from '@/store/user'
import quiz from '@/store/quiz'

const store = new Vuex.Store({
    state: {
        awesome: true
    },

    modules: {
        user,
        quiz
    }
});

export default store