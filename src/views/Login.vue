<script setup>
import config from '../config.mjs'

</script>

<template>
  <h1>Страница авторизации</h1>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-sm-5">
          <form method="POST" target="_top">
            <label for="email">Email:</label>
            <input v-model="login" name="email" type="email" id="email" class="form-control" placeholder="Введите email" required>
            <label for="pass">Пароль:</label>
            <input v-model="password" name="password" type="password" id="pass" class="form-control" placeholder="Введите пароль" required>
            
            <button @click="authentication(login, password)" type="button" class="btn btn-success mt-1 me-1"><i class="bi-box-arrow-in-left"></i> Войти</button>

            <router-link to="/reg" customv-slot="{ navigate }">
              <button class="btn btn-success mt-1" @click="navigate" role="link">
                <i class="bi-person-plus"></i> Регистрация
              </button>
            </router-link>
            <!-- <button class="btn btn-success mt-1">Регистрация</button> -->
          </form>

        </div>
      </div>
    </div>
  </main>

</template>

<script>
const url=`http://${config.host}:${config.port}`
export default {
  data() {
    return {
      login: "",
      password: "",
      my_name: "",
    }
  },
  async mounted() {
    this.my_name=window.localStorage.getItem('user')
  },
  methods: {
    async authentication(login, password) {
      console.log('это localStorage в Login.vue: ', localStorage, sessionStorage)
      // Отправляем запрос типа POST
      const response = await fetch(`${url}/login`, {
        method: 'POST', 
        credentials: 'include', // для того чтобы сессия сохранялась между различными хостами
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000/',

        },
        body: JSON.stringify({
          email: login,
          password: password
        }) 
      });

      const result = await response.json();
      console.log(result['user']['email'])
      // console.log('это то т самый токен дададададааааадч',result['token'])
      // let str1 = 'se234'
      window.localStorage.setItem('user', result['user']['email']);
      window.localStorage.setItem('jwt', result['token']);
      console.log('login this htis: ', result['user']['is_admin'])
      window.localStorage.setItem('is_admin', result['user']['is_admin'])
      console.log('result: ', result);
      document.location.href = '/start'
    },

  }
}
</script>
