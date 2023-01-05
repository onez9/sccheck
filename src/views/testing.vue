<script setup>
</script>

<template>
	<div class="container ">
		<div class="row">
			<div class="col-5" >
        <h5>Мои курсы:</h5>
        <div  v-for="(cource, key) in cources" :key="key">
          <div class="d-flex">
            <!-- {{cource}} -->
            <label class="form-control mt-1 mb-1 me-1">{{cource.name}}</label>
            <button @click="run_the_courc(cource)" class="btn btn-dark mt-1 mb-1 me-1">Пройти</button>
            <button @click="" class="btn btn-dark mt-1 mb-1 me-1"><i class="bi-x-square"></i></button>
          </div>
        </div>


			</div>
      
      
      <!-- <div id="app">
        <component-a>123</component-a>
        <component-b>123</component-b>
        <component-c>123</component-c>
        
      </div> -->


      <div class="col-7" >
        <div v-for="(task, index) in tasks" :key="index">
          {{task}}
        </div>
        <!-- <textarea v-model="code_input" class="form-control mt-1" name="code_input" id="code_input" rows="10"></textarea>
        <textarea class="form-control mt-1 mb-1" name="code_input" id="code_input" rows="10" disabled>{{code_input}}</textarea>
        <div class="d-flex">
          <input type="file" class="form-control me-1">
          <button class="btn btn-warning me-1">Проверить</button>
          <button @click="" class="btn btn-danger">Отправить</button>
        </div> -->
      </div>
		</div>
	</div>
 
</template>

<script>
const url='http://192.168.149.184:3000'
export default {
	data() {
		return {
      code_input: "",
      cources: [],
      activeItem: false,
      tasks: []

		}
	},
	computed: {

	},
	async mounted() {
    await this.testGet() // делает сложный sql запрос с left join-ми
	},
	methods: {

    async getcources() {
      const response = await fetch(`${url}/cource/getall`, {
        method: 'POST'
      })
      
      this.cources = await response.json()
      console.log(this.cources)
    },
    async testGet() {
      // Отправляем запрос типа GET
      const myid = 22
      const response = await fetch(`${url}/cource/get_my_cource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: myid
        })
        // 'Access-Control-Allow-Origin': '*'
      });

      this.cources = await response.json();

      // console.log(textResult);
    },
    async run_the_courc(cource) {
      const response = await fetch(`${url}/task/get_task_cource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cource_id: cource.cource_id
        })
        // 'Access-Control-Allow-Origin': '*'
      });
      this.tasks = await response.json()

    }


  }
}
</script>
