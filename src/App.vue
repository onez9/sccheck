<script setup>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
import config from './config.mjs'
</script>

<template class="d-flex flex-column min-vh-100">
  <header>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi-diagram-3-fill"></i>
          {{ sitename }}
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2mb-lg-0">
            <li class="nav-item">
              <!-- <a class="nav-link active" aria-current="page" href="index.html"><i class="bi-house"></i> Главная</a> -->
              <router-link class="nav-link" to="/"><i class="bi-house"></i> Главная</router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="products.html"><i class="bi-bag-check"></i> Товары</a> -->
              <!-- <router-link class="nav-link" to="/raiting"><i class="bi-star"></i> Рейтинг</router-link> -->
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="about.html"><i class="bi-file-earmark-person"></i> О нас</a> -->
              <router-link class="nav-link" to="/users"><i class="bi-star"></i> Рейтинг</router-link>
              <!-- <router-link class="nav-link" to="/users"><i class="bi-person-circle"></i> Участники</router-link> -->
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="about.html"><i class="bi-file-earmark-person"></i> О нас</a> -->
              <router-link class="nav-link" to="/cources"><i class="bi-bag-heart"></i> Курсы</router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="about.html"><i class="bi-file-earmark-person"></i> О нас</a> -->
              <router-link class="nav-link" to="/mycources"><i class="bi-journal-text"></i> Тестирование</router-link>
            </li>







          </ul>

          <div class="d-flex">

            <div class="me-2">
              <span class="navbar-text">
                {{ my_name }}
              </span>
            </div>
            <div v-if="my_name" >
              <router-link @click="logout" class="nav-link" to="/login"><i class="bi-box-arrow-in-right"></i> Выйти</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav> 

  </header>
  <main class="container">
    <RouterView 
    :url="url"
    :description="description"
    /> <!--Именно в этом месте vue-router будет загружать компоненты в соответствие с навигацией-->
  </main>


  <div class="wrapper flex-grow-1 mb-3"></div>

      
  <footer class="mt-auto border-top">
      
      
    <div class="container">
      <div class="row">
        
        <div class="col-6">
          <h5>Todo</h5>
          <ul class="nav flex-column">
            <!-- <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Домашняя</a></li> -->
            <!-- <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Вакансии</a></li> -->
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Вопросы и ответы</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">О нас</a></li>
          </ul>
        </div>


      </div>
  
    </div>
  </footer>



</template>


<script>

// const app = Vue.createApp({})
// app.component('component-a', {})
// app.component('component-b', {})
// app.component('component-c', {})
// app.mount('#app')
console.log(config.host)

export default {
  data() {
    return {
      sitename: "Тестирование онлайн",
      description: "Сайт для проведения тестирования онлайн",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      pass1: "",
      pass2: "",
      elements: "Песонажи",
      my_name: "",
      url: `http://${config.host}:${config.port}`,
    }
  },
  async mounted() {
    this.my_name = window.localStorage.getItem('user')
  },
  methods: {
    async logout() {
      console.log('Включение метода logout...')
      this.my_name=""
      window.localStorage.clear()
      // const response = await fetch(`${this.url}/logout`)
      const response = await fetch(`/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({123:123})
      })
      console.log(`response: ${await response.json()}`)
    },
    async login() {
      this.my_name = window.localStorage.getItem('user')
    }
  }
}


</script>
<style scoped>
</style>














