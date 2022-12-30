import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/Users.vue'
import CourcesView from '../views/Cources.vue'
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
      component: StartView
    },
    {
      path: '/cources', 
      name: 'cources',
      component: CourcesView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    // {
    //   path: '/reg_stud',
    //   name: 'reg_stud',
    //   component: RegStudView
    // },
    {
      path: '/reg',
      name: 'reg',
      component: RegView
    },
    {
      path: '/raiting',
      name: 'raiting',
      component: RaitingView
    }
  ]
})

export default router