import Vue from 'vue'
import Router from 'vue-router'
import { homedir } from 'os';
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: homedir,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
