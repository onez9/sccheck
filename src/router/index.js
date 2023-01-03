import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/Users.vue'
import CourcesView from '../views/Cources.vue'
import MyCourcesView from '../views/testing.vue'
import StartView from '../views/Start.vue'
import RegView from '../views/Reg.vue'
// import RegPrepView from '../views/RegPrep.vue'
import AuthView from '../views/Auth.vue'
import RaitingView from '../views/Raiting.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/cources', 
      name: 'cources',
      component: CourcesView,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/mycources', 
      name: 'mycources',
      component: MyCourcesView,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { 
        guest: true
      }
    },
    {
      path: '/reg',
      name: 'reg',
      component: RegView,
      meta: { 
        guest: true
      }
    },
    {
      path: '/raiting',
      name: 'raiting',
      component: RaitingView,
      meta: { 
        requiresAuth: true
      }
    }
  ]
})



/*
// Глобальные навигационные хуки вызываются в порядке их создания при каждом навигационном переходе.
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if(to.matched.some(record => record.meta.is_admin)) {
        if(user.is_admin == 1){
          alert('ok 222')
          next()
        }
        else{
          alert(4333)
          next({ name: 'start'})
        }
      }else {
        next()
      }
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(localStorage.getItem('jwt') == null){
      alert('ok')
      next()
    }
    else{
      next({ name: 'start'})
    }
  }else {
    alert('ok')
    next() 
  }
})
*/

export default router