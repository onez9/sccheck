<script setup>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
</script>

<template class="d-flex flex-column min-vh-100">
  <header>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi-diagram-3-fill"></i>
          Stepic
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
              <router-link class="nav-link" to="/raiting"><i class="bi-star"></i> Рейтинг</router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="about.html"><i class="bi-file-earmark-person"></i> О нас</a> -->
              <router-link class="nav-link" to="/users"><i class="bi-person-circle"></i> Участники</router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="about.html"><i class="bi-file-earmark-person"></i> О нас</a> -->
              <router-link class="nav-link" to="/cources"><i class="bi-bag-heart"></i> Курсы</router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="about.html"><i class="bi-file-earmark-person"></i> О нас</a> -->
              <router-link class="nav-link" to="/mycources"><i class="bi-journal-text"></i> Тестирование</router-link>
            </li>





            <!-- <li class="nav-item dropdown">

              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi-journals"></i>
                Курсы
              </a>
              <ul class="dropdown-menu">
                
                <li><router-link class="nav-link dropdown-item" to="/cources"><i class="bi-plus"></i> Новый курс</router-link></li>
                <li><router-link class="nav-link dropdown-item" to="#"> Мои курсы</router-link></li>
                <li><router-link class="nav-link dropdown-item" to="#"> Все курсы</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#"></a></li>
              </ul>
            </li> -->



          </ul>

          <div class="d-flex">
            <!-- <div>
              <a class="nav-link" href="about.html"><i class="bi-file-earmark-person"></i> О нас</a> 
              <router-link class="nav-link" to="/auth"><i class="bi-box-arrow-in-left"></i> Войти</router-link>
            </div> -->
            <span class="navbar-text">
              {{ my_name }}
            </span>
            <div v-if="my_name!=''"> 
              <router-link @click="logout" class="nav-link" to="/auth"><i class="bi-box-arrow-in-right"></i> Выйти</router-link>
            </div>
            <div v-else> 
              <router-link @click="logout" class="nav-link" to="/auth"><i class="bi-box-arrow-in-right"></i> Войти</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav> 

  </header>
  <main class="container">
    <RouterView /> <!--Именно в этом месте vue-router будет загружать компоненты в соответствие с навигацией-->
  </main>


  <div class="wrapper flex-grow-1 mb-3"></div>

      
  <footer class="mt-auto border-top">
      
      
    <div class="container">
      <div class="row">
        
        <div class="col-6 col-md-2">
          <h5>тестирование онлайн</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Домашняя</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Вакансии</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Вопросы и ответы</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">О нас</a></li>
          </ul>
        </div>



        <!-- <div class="col-md-5 offset-md-1 mb-3">
          <form>
            <h5>Подпишитесь на рассылку писем введя туда свой email</h5>
            <div class="d-flex flex-column flex-sm-row w-100 gap-2">
              <label for="newsletter1" class="visually-hidden">Адрес электронной почты</label>
              <input id="newsletter1" type="text" class="form-control" placeholder="Email address">
              <button class="btn btn-primary" type="button">Subscribe</button>
            </div>
          </form> 
        
        </div> -->
      </div>
  
      <!-- <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>&copy; 2022 Company, Inc. All rights reserved.</p>
        <ul class="list-unstyled d-flex">
          <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"/></svg></a></li>
          <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"/></svg></a></li>
          <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"/></svg></a></li>
        </ul>
      </div> -->
    </div>
  </footer>



</template>


<script>

// const app = Vue.createApp({})
// app.component('component-a', {})
// app.component('component-b', {})
// app.component('component-c', {})
// app.mount('#app')


export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      pass1: "",
      pass2: "",
      elements: "Песонажи",
      my_name: "",
    }
  },
  async mounted() {
  },
  methods: {

  }
}


</script>
<style scoped>
</style>














