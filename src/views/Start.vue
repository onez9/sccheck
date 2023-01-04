<script setup>


</script>

<template>
  <!-- <div class="d-flex">
    <button class="btn btn-warning m-3" @click="testGet">Тест GET запроса</button>
    <button class="btn btn-danger m-3" @click="testPost">Тест POST запроса</button>
  </div> -->

  <h3>Сайт для тестирования навыков программирования</h3>
  <p>Добро пожаловать!<br>Большое количество качественных и бесплатных курсов от настоящих профи</p>


  <div class="d-grid gap-2 col-6 mx-auto">
    <button class="btn btn-primary" type="button">Кнопка</button>
    <button class="btn btn-primary" type="button">Кнопка</button>
  </div>


</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
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
