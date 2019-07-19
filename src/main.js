// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App'
import router from './router'

import store from './store'

import('vuetify/dist/vuetify.min.css');
Vue.use(Vuetify)

/** Components */
import Question from '@/components/Question'
import ScoreDatatable from '@/components/ScoreDatatable'

Vue.component('question', Question)
Vue.component('scores-datatable', ScoreDatatable)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
