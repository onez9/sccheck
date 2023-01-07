import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/Users.vue'
import CourcesView from '../views/Cources.vue'
import MyCourcesView from '../views/testing.vue'
import StartView from '../views/Start.vue'
import RegView from '../views/Reg.vue'
// import RegPrepView from '../views/RegPrep.vue'
import LoginView from '../views/Login.vue'
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
      path: '/login',
      name: 'login',
      component: LoginView,
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




// Глобальные навигационные хуки вызываются в порядке их создания при каждом навигационном переходе.
router.beforeEach((to, from, next) => {
  console.log('to: ',to.matched)
  console.log('from: ',from)
  console.log('next: ',next)
  console.log('это localStorage: ', localStorage)
  let res = to.matched.some(record => {
    console.log('какое-то рекорд: ', record)
    console.log('это тру или фолсу: ', record.meta.requiresAuth)
    return record.meta.requiresAuth
  })
  if(res) { // есить ли те у кого требуется права админа т.е. такие маршруты есть для которых требуется авторризация
    if (localStorage.getItem('jwt') == null) { // если jwt равен нуля или undefined - на логин панель
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      console.log('get localStorage: ', localStorage.getItem('user'))
      let user = localStorage.getItem('user')
      // let user = JSON.parse(localStorage.getItem('user'))
      console.log('это user: ', user) // тут мы авторизовались
      // if(to.matched.some(record => record.meta.is_admin)) { // есть ли маршруты, к которым имеют доступ только админы?
      //   if(user.is_admin == 1){ // у нас таких маршрутов нет, поэтому  переходим к части else - "мы обычный пользователь"
      //     alert('мы здесь боги')
      //     next()
      //   } else {
      //     alert('мы здесь не админы')
      //     next({ name: 'start'})
      //   }
      // } else {
      console.log('мы обычный пользователь')
      next()
      // }
    }
  } else if (to.matched.some(record => record.meta.guest)) { // есть ли маршруты для которых нужен доступ гостя
    if(localStorage.getItem('jwt') == null){ // jwt token == null
      alert('ok jwt == null - маршрут требует права гостя')
      next()
    }
    else{ // jwt есть - авторизации нет
      next({ name: 'start'})
    }
  } else { // нет авторизации
    alert('ok нет авторизции')
    next() 
  }
})


export default router