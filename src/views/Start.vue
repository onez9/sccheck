<script setup>
import config from '../config.mjs'

</script>

<template>
  <!-- <div class="d-flex">
    <button class="btn btn-warning m-3" @click="testGet">Тест GET запроса</button>
    <button class="btn btn-danger m-3" @click="testPost">Тест POST запроса</button>
  </div> -->

  <h3>{{ description }}</h3>
  <p>Добро пожаловать!</p>
  <ul>
    <li>Простое и удобное создание курсов</li>
    <li>Ведение статистики</li>
  </ul>
  <!-- <div v-for="(cource, index) in cources">
    <label class="form-control bt-1 be-1 mb-1">{{ cource.name }}</label>
  </div> -->
<!-- 
  <div class="d-grid gap-2 col-6 mx-auto">
    <button class="btn btn-primary" type="button">Кнопка</button>
    <button class="btn btn-primary" type="button">Кнопка</button>
  </div>
 -->

</template>

<script>
// const url=`http://${config.host}:${config.port}`
export default {
  data() {
    return {
      cources: [],
      my_name: "",
      property: "Blank"
    }
  },
  beforeCreate() {
    console.log("Выполняется при инициализации компонента");
    console.log("Данные ещё не стали реактивными, а события не настроены.")
  },
  created() {

  },
  props: {
    url: String,
    description: String,
  },
  async mounted() {
    // await this.testGet()
    this.my_name = window.localStorage.getItem('user')
  },
  methods: {

  }
}
</script>
