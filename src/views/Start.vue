<script setup>
import config from '../config.mjs'

</script>

<template>
  <!-- <div class="d-flex">
    <button class="btn btn-warning m-3" @click="testGet">Тест GET запроса</button>
    <button class="btn btn-danger m-3" @click="testPost">Тест POST запроса</button>
  </div> -->

  <h3>Сайт для тестирования навыков программирования</h3>
  <p>Добро пожаловать!<br>Большое количество качественных и бесплатных курсов от настоящих профи</p>
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
const url=`http://${config.host}:${config.port}`
export default {
  data() {
    return {
      cources: []
    }
  },
  async mounted() {
    // await this.testGet()
  },
  methods: {

  }
}
</script>
