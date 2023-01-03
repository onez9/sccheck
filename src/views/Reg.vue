<script setup>

// import sha256 from 'sha256'
</script>

<template>
  <!-- <div class="d-flex">
    <button class="btn btn-warning m-3" @click="testGet">Тест GET запроса</button>
    <button class="btn btn-danger m-3" @click="testPost">Тест POST запроса</button>
  </div> -->


  <main>
    <div class="container">
      <div class="row">
        <!-- <div class="col-sm-12 d-flex align-items-center flex-column"> -->
        <!-- <div class="col-sm-3"></div> -->
        <div class="col-sm-5 d-flex d-column flex-column">
          <h1>Зарегистрироваться как:</h1>
          <button @click="reg_prep=true;reg_stud=false" class="btn btn-success tt1 mb-2">Преподаватель</button>
          <button @click="reg_stud=true;reg_prep=false" class="btn btn-success tt1 mb-2">Студент</button>



          <form v-if="reg_prep==true">
            <label for="firstname">Имя:</label>
            <input name="firstname" type="text" id="firstname" class="form-control" required>
            <label for="lastname">Фамилия:</label>
            <input name="lastname" type="text" id="lastname" class="form-control" required>
            <label for="secondname">Отчество:</label>
            <input name="secondname" type="text" id="secondname" class="form-control" required>
            <label for="email">Email:</label>
            <input name="email" type="email" id="email" class="form-control" required>
            <label for="phone">Номер телефона:</label>
            <input name="phone" type="text" id="phone" class="form-control" required>
            <label for="position">Должность:</label>
            <input name="position" type="text" id="position" class="form-control" required>
            <label for="age">Возраст:</label>
            <input name="age" type="number" id="age" min=18 max=100 class="form-control" required>
            <!-- <label for="pulpit">Кафедра:</label>
            <input name="pulpit" type="text" id="pulpit" min=18 max=100 class="form-control" required> -->
            
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle form-control mt-2 mb-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Кафедра
              </button>
              <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown" href="#">Кафедра 1</a></li>
                <li><a class="dropdown" href="#">Кафедра 2</a></li>
                <li><a class="dropdown" href="#">Кафедра 3</a></li>
              </ul>
            </div>


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

          <form v-if="reg_stud==true" method="POST" action="http://localhost:3000/register">
            <label for="firstname">Имя:</label>
            <input name="firstname" type="text" id="firstname" class="form-control" required>
            <label for="lastname">Фамилия:</label>
            <input name="lastname" type="text" id="lastname" class="form-control" required>
            <label for="secondname">Отчество:</label>
            <input name="secondname" type="text" id="secondname" class="form-control" required>
            <label for="email">Email:</label>
            <input name="email" type="email" id="email" class="form-control" required>
            <label for="email">Группа:</label>
            <input name="group" type="text" id="group" class="form-control" required>



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
        <!-- <div class="col-sm-3"></div> -->
       
        <!-- <div class="d-grid gap-2"> -->
        <!-- <div class="col-sm-12 d-flex align-items-center flex-column">
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
        </div> -->


        <div class="col-sm-4">





        </div>
      </div>
    </div>
  </main>


</template>

<script>
// import { crypto } from 'crypto'
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      pass1: "",
      pass2: "",
      is_admin: "",

      reg_prep: false,
      reg_stud: false,
    }
  },
  methods: {

    async addUser(firstname,lastname,email,password) {
      // Отправляем запрос типа POST


      // const sha256 = crypto.createHash('sha256');
      // const hash = sha256.update(password).digest('base64');

      console.log(123)
      const response = await fetch('http://localhost:3000/adduser', {
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

      // const jsonResult = await response.json();

      // console.log(jsonResult);
    },
    async testPost() {
      // Отправляем запрос типа POST
      const response = await fetch('/testpost', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: "Иван"
        }) 
      });

      const jsonResult = await response.json();

      console.log(jsonResult);
    },
    async testGet() {
      // Отправляем запрос типа GET
      const response = await fetch('/testget', {
        method: 'GET',
        // 'Access-Control-Allow-Origin': '*'
      });

      const textResult = await response.text();

      console.log(textResult);
    }
  }
}
</script>

<!-- <style>
.tt1 {
  width: 200px;
}
</style> -->
