<script setup>
import config from '../config.mjs'
// import sha256 from 'sha256'
</script>

<template>
  <!-- <div class="d-flex">
    <button class="btn btn-warning m-3" @click="testGet">Тест GET запроса</button>
    <button class="btn btn-danger m-3" @click="testPost">Тест POST запроса</button>
  </div> -->

  <h1>Страница регистрации</h1>
  <main>
    <div class="container">
      <div class="row">
        <!-- <div class="col-sm-12 d-flex align-items-center flex-column">
          <buntton class="btn btn-success tt1 mb-2">Преподаватель</buntton>
          <buntton class="btn btn-success tt1 mb-2">Студент</buntton>
        </div> -->

        <!-- <div class="d-grid gap-2"> -->
        <div class="col-sm-12 d-flex align-items-center flex-column">
          <router-link @click="logout" customv-slot="{ navigate }" to="/reg_prep">
            <button class="btn btn-primary" @click="navigate" role="link">
              <i class="bi-box-arrow-in-right"></i> Преподаватель
            </button>
          </router-link>
          
          <router-link @click="logout" customv-slot="{ navigate }" to="/reg_stud">
            <button class="btn btn-primary" @click="navigate" role="link">
              <i class="bi-box-arrow-in-right"></i> Студент
            </button>
          </router-link>
        </div>


        <div class="col-sm-4">



          <form v-if="false" action="/addUser" method="post" enctype="multipart/form-data">
            <label for="firstname">Имя:</label>
            <input name="firstname" type="text" id="firstname" class="form-control" required>
            <label for="lastname">Фамилия:</label>
            <input name="lastname" type="text" id="lastname" class="form-control" required>
            <label for="email">Email:</label>
            <input name="email" type="email" id="email" class="form-control" required>
            <label for="pass1">Введите пароль: {{pass1}}</label>
            <input v-model="pass1" name="password1" type="password" id="pass1" class="form-control" required>
            <label for="pass2">Повторите пароль: {{pass2}}</label>
            <input v-model="pass2" name="password2" type="password" id="pass2" class="form-control" required>
            <button :class="{'btn btn-success mt-1 me-1': true, 'disabled': (pass1!=pass2)}" type="submit"><i class="bi-person-plus"></i> Создать</button>
            
            
            
            <router-link to="/auth" customv-slot="{ navigate }">
              <button class="btn btn-success mt-1" @click="navigate" role="link">
                <i class="bi-box-arrow-in-left"></i> Авторизация
              </button>
            </router-link>
          </form>

        </div>
      </div>
    </div>
  </main>


</template>

<script>

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      pass1: "",
      pass2: "",
      my_name: "",
    }
  },
  props: {
    url: String,
  },
  async mounted() {
    this.my_name = window.localStorage.getItem('user')
  },
  methods: {

    async addUser(firstname,lastname,email,password) {
      // Отправляем запрос типа POST


      // const sha256 = crypto.createHash('sha256');
      // const hash = sha256.update(password).digest('base64');


      const response = await fetch('/addUser', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }) 
      });

      const jsonResult = await response.json();

      console.log(jsonResult);
    },


  }
}
</script>

<style>
.tt1 {
  width: 200px;
}
</style>
