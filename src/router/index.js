import Vue from 'vue'
import Router from 'vue-router'
import { homedir } from 'os'
import Home from '@/components/Home'
import About from '@/components/About'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Admin from '@/components/Admin'
import store from '@/store'

Vue.use(Router)

const router = new Router({
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
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        role: true
      }      
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.state.user.loggedIn
  const u_id = store.state.user.user.u_id
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const roleAdmin = to.matched.some(record => record.meta.role)

  // console.log(u_id);
  // console.log(roleAdmin);
  // console.log(loggedIn);
  
  if(requiresAuth && !loggedIn) next('login')
  else if(roleAdmin && requiresAuth && u_id != "yLwaDzm9B0awHZDZITE0XIEYVqp2") next('/')
  else if(!requiresAuth && loggedIn) next(['/', '/about'])
  else next()
})

export default router
