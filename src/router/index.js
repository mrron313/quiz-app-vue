import Vue from 'vue'
import Router from 'vue-router'
import { homedir } from 'os';
import Home from '@/components/Home';
import Login from '@/components/Login';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
