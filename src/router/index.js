import Vue from 'vue'
import Router from 'vue-router'
import { homedir } from 'os'
import Home from '@/components/Home'
import About from '@/components/About'
import Login from '@/components/Login'
import Register from '@/components/Register'
import CreateQuiz from '@/components/CreateQuiz'
import SingleQuiz from '@/components/SingleQuiz'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        requiresAuth: true
      }      
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/create-quiz',
      name: 'create-quiz',
      component: CreateQuiz,
      meta: {
        requiresAuth: true
      }  
    },
    {
      path: '/quiz/:id',
      name: 'single-quiz',
      component: SingleQuiz,
      meta: {
        requiresAuth: true
      }  
    }
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.state.user.loggedIn
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if(requiresAuth && !loggedIn) next('login')
  else if(!requiresAuth && loggedIn) next(['/', 'about'])
  else next()
})

export default router
