<script setup>
import config from '../config.mjs'
</script>

<template>
	<div class="container ">
		<div class="row">
			<div v-if="!show_start_test_mode" class="col-sm-5" >
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
        <h5>Мои пройденные курсы:</h5>
        <div v-for="(cource, key) in end_cources" :key="key">
          <!-- console.log(cource) -->

          <div class="border border-primary rounded p-1 mb-1">
            <label class="">Название курса: {{cource.name}}</label><br>
            <label class="">Время на выполнение: {{cource.runtime}}</label><br>
            <label class="">Оценка выполнения: {{cource.grade}}%</label><br>
            <button class="btn btn-warning"><i class="bi-x-square"></i></button>
          </div>
        </div>


			</div>
      
      
      <!-- <div id="app">
        <component-a>123</component-a>
        <component-b>123</component-b>
        <component-c>123</component-c>
        
      </div> -->

      <div class="col-sm-7" v-if="show_task_test_mode">
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
        <label v-if="show_grade" class="form-control">Ваша оценка за тест (Приемлемо 80%):{{grade.grade}}%</label>
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
const url=`http://${config.host}:${config.port}`
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
      show_grade: false,
      end_cources: [],
      my_name: "",
		}
	},
	computed: {

	},
	async mounted() {
    await this.show_my_subscribe_cources() // делает сложный sql запрос с left join-ми
    await this.get_my_finish_cources()
    this.my_name = window.localStorage.getItem('user')
    // await this.show_my_subscribe_cources()
	},
	methods: {
    async get_my_finish_cources() {
      const response = await fetch(`${url}/answer/get_my_ended_cources`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt'),
        },

      })

      this.end_cources=await response.json()
      await this.show_my_subscribe_cources()
    },
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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt')

        },
        body: JSON.stringify({
          cource_id: this.activeItem.cource_id,
          answers: answers
        })

      })

      
      await this.get_my_finish_cources()
      this.grade = await response.json()
      // console.log(this.cources)

    },

    async show_my_subscribe_cources() { // показывает мои курсы с except
      // Отправляем запрос типа GET
      const response = await fetch(`${url}/cource/get_my_subscribe_cource`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt'),

        },
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
          'Content-Type': 'application/json',
          credentials: 'include'
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
          'Content-Type': 'application/json',
          credentials: 'include'
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
