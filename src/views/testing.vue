<script setup>
</script>

<template>
	<div class="container ">
		<div class="row">
			<div v-if="!show_start_test_mode" class="col-5" >
        <h5>Мои курсы:</h5>
        <div v-for="(cource, key) in cources" :key="key">
          <div class="d-flex">
            <!-- {{cource}} -->

            <div class="input-group">
              <label class="form-control mt-1 mb-1">{{cource.name}}</label>
              <button @click="run_the_cource(cource)" class="btn btn-warning mt-1 mb-1">Пройти</button>
              <button @click="delete_the_cource(cource)" class="btn btn-danger mt-1 mb-1 me-1"><i class="bi-x-square"></i></button>
            </div>
          </div>
        </div>


			</div>
      
      
      <!-- <div id="app">
        <component-a>123</component-a>
        <component-b>123</component-b>
        <component-c>123</component-c>
        
      </div> -->

      <div class="col-7" v-if="show_task_test_mode">
        <h5>Список задач для прохождения:</h5>
        <div class="input-group">
          <!-- {{activeItem}} -->
          <label class="form-control mt-1 mb-1">{{activeItem.name}}</label>
          <button v-if="!show_start_test_mode" @click="start_test" class="btn btn-success mt-1 mb-1">Начать выполнение</button>
        </div>
        <label>Время на выполнение курса: {{activeItem.runtime}} мин.</label>
        
        <div v-for="(task, index) in tasks" :key="index">
          {{task}}
          <div class="border border-success rounded p-1 mb-1">
            <label class="mt-1 mb-1 me-1">Название задачи: {{task.ntask}}</label><br>
            <label class="mt-1 mb-1 me-1">Описание задачи: {{task.dtask}}</label><br>
            <label for="an_ta">Введите ответ на задачу:</label>
            <input v-model="task.answer_user_task" type="text" id="an_ta" class="form-control" :disabled="!show_start_test_mode">
            <!-- <label class="form-control mt-1 mb-1 me-1">Ответ на задачу: {{task.answer_task}}</label> -->
            <!-- <label class="mt-1 mb-1 me-1">Время на выполнение задания: {{task.runtime}} {{tick}} (мин)</label> -->
          </div>
        </div>
        <div class="flex-grow-1 mb-3"></div>
        <!-- <div v-for="(task, index) in tasks">
          {{task.answer_user_task}}
        </div> -->
        <div class="d-flex justify-content-end">
          <!-- {{tasks}} -->
          <button v-if="show_start_test_mode" @click="send_data" class="btn btn-danger"><i class="bi-send"></i>Завершить выполнение</button>
          
        </div>
        <label v-if="show_grade" class="form-control">Ваша оценка за тест (Приемлемо 80%):{{grade.grade}}, {{tasks.length}} {{grade.grade / tasks.length * 100}}%</label>
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
// const url='http://192.168.149.184:3000'
const url='http://192.168.0.105:3000'
export default {
	data() {
		return {
      code_input: "",
      cources: [],
      activeItem: "",
      tasks: [],
      tick: 100,
      show_start_test_mode: false,
      show_task_test_mode: false,
      answers: [],
      grade: 0,
      show_grade: false
		}
	},
	computed: {

	},
	async mounted() {
    await this.testGet() // делает сложный sql запрос с left join-ми
    // await this.test()
	},
	methods: {

    async start_test() {
      this.show_start_test_mode=true

    },
    async send_data() { // заполнениее таблицы answers
      this.show_start_test_mode=false // скрыть что-либо/показать
      this.show_grade = true
      let answers = []
      for (let item of this.tasks) {
        answers.push({
          answer_of_user: item.answer_user_task,
          answer: item.answer_task,
          user_id: 22,
          task_id: item.id,
        })
        // console.log(item.answer_user_task)
      }
      const response = await fetch(`${url}/answer/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cource_id: this.activeItem.cource_id,
          answers: answers
        })

      })

      
      
      this.grade = await response.json()
      // console.log(this.cources)

    },
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
    async run_the_cource(cource) {
      this.activeItem = cource
      this.grade = 0
      this.show_task_test_mode = true // когда нажали на кнопку пройти происходит показ таблицы задач // запрос этих задач курса
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

    },
    async delete_the_cource(cource) {
      this.tasks = []
      const response = await fetch(`${url}/cource/del`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: cource.user_id,
          cource_id: cource.cource_id
        })
        // 'Access-Control-Allow-Origin': '*'
      });
      // console.log(await response.json())
      this.cources = await response.json()
    }


  }
}
</script>
