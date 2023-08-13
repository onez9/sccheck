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
          <!-- {{ cource }} -->
          <div class="border border-1 border-primary rounded p-1 mb-1">



            <div v-if="!cource.show_more" class="input-group">
              <label class="form-control me-auto">{{cource.name}}</label>
              <button @click="show_more(cource)" class="btn btn-info"><i class="bi bi-three-dots"></i></button>
 
            </div>
            <table class="table table-sm table-bordered " v-if="cource.show_more">
              <tbody>
                <tr><td>Название курса:</td> <td>{{cource.name}}</td></tr>
                <tr><td>Отлично:</td> <td>{{cource.runtime}} мин.</td></tr>
                <tr><td>Ваше время:</td> <td>{{cource.transit_time}} мин.</td></tr>
                <tr><td>Оценка выполнения:</td> <td>{{cource.grade}}%</td></tr>
              </tbody>
            </table>
            <div v-if="cource.show_more" class="input-group">
              <button v-if="!cource.show_button" @click="show_answers_cource(cource)" class="btn btn-warning me-auto"><i class="bi bi-eye"></i> Показать ответы</button>
              <button v-if="cource.show_button" @click="hide_answers(cource)" class="btn btn-danger me-auto"><i class="bi bi-eye"></i> Cкрыть ответы</button>
              <button v-if="cource.show_more" @click="hide_more(cource)" class="btn btn-danger"><i class="bi bi-eye"></i> Cкрыть подробности</button>
              
            </div>
            
            <!-- <label class=""> </label><br>
            <label class=""> </label><br>
            <label class=""> </label><br>
            <label class=""> </label><br>
            <button v-if="!cource.show_button" @click="show_answers_cource(cource)" class="btn btn-warning"><i class="bi bi-eye"></i> Показать ответы</button>
            <button v-if="cource.show_button" @click="hide_answers(cource)" class="btn btn-danger"><i class="bi bi-eye"></i> Cкрыть ответы</button> -->
          </div>
        </div>


			</div>
      
      
      <!-- <div id="app">
        <component-a>123</component-a>
        <component-b>123</component-b>
        <component-c>123</component-c>
        
      </div> -->

      <div class="col-sm-7" v-if="show_answer_mode">
        <h5>Ответы на курс "{{ cource_selected }}":</h5>
        <table class="table table-bordered border border-primary">
          <thead>
            <tr>
              <td class="col-6">Описание</td> 
              <td>Ответ</td>
            </tr>
          </thead>
        </table>

        <table v-for="(element, index) in answers_tasks" :key="index" class="table-bordered border border-primary rounded p-1 mb-3 w-100">
          <!-- {{ element }} -->
          <tbody>
            <tr>
              <th class="col-6">Номер задачи:</th><th>{{index+1}}</th>
            </tr>
            <tr>
              <td class="col-6">Название задачи:</td><td>{{element.ntask}}</td>
            </tr>
            <tr>
              <td>Описание задачи:</td><td>{{element.dtask}}</td>
            </tr>
            <tr>
              <td>Ваш ответ на задачу:</td><td>{{element.answer}}</td>
            </tr>
            
          </tbody>

        </table>

      </div>
      <div class="col-sm-7" v-if="show_task_test_mode">
        <h5>Список задач для прохождения:</h5>
        <div class="input-group">
          <!-- {{activeItem}} -->
          <label class="form-control mt-1 mb-1">{{activeItem.name}}</label>
          <button v-if="!show_start_test_mode" @click="start_test" class="btn btn-success mt-1 mb-1">Начать выполнение</button>
        </div>
        <label>Время на выполнение курса: {{ activeItem.runtime }} мин. </label><br>
        <label>Времени прошло: {{ timer_label }}</label>
        
        <div v-for="(task, index) in tasks" :key="index">
          <!-- {{task}} -->
          <div class="border border-success rounded p-1 mb-1">
            <label class="mt-1 mb-1 me-1">Название задачи: {{ task.ntask }}</label><br>
            <label class="mt-1 mb-1 me-1">Описание задачи: {{ task.dtask }}</label><br>
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
      </div>
		</div>
	</div>
 
</template>

<script>
// const url='http://192.168.149.184:3000'
// const url=`http://${config.host}:${config.port}`
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
      show_answer_mode: false,
      answers_tasks: [],
      cource_selected: "",
      // show_button_is: true,
      timer_label: "",
      si1: "",
		}
	},
  props: {
    url: String,
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
      const response = await fetch(`${this.url}/answer/get_my_ended_cources`, {
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
    async show_more(cource) {
      cource.show_more=true
    },
    async hide_more(cource) {
      cource.show_more=false
    },
    async hide_answers(cource) {
      cource.show_button=false
      this.show_task_test_mode=false
      this.show_answer_mode=false
    },
    async show_answers_cource(cource) {
      this.show_task_test_mode=false
      this.show_answer_mode=true
      // console.log(cource.name)
      this.cource_selected = cource.name

      cource.show_button = true // скрыть кнопку показать ответы
      // тут мы запрашиваем задачи для пройденного курса
      console.log('courcid: ', cource.cource_id)
      const response = await fetch(`${this.url}/task/get_task_answer_cource`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt'),

        },
        body: JSON.stringify({
          cource_id: cource.cource_id,
          user_id: cource.uid,
        })
        // 'Access-Control-Allow-Origin': '*'
      });
      this.answers_tasks = await response.json()
      console.log('тут должен быть ответ задач для показа ответа пройденных курсов:', this.tasks)



    },
    async start_test() {
      this.show_start_test_mode=true
      this.timer_label = "00:00:00"
      let seconds=0
      let minuts=0
      let hours=0

      this.si1 = setInterval(() => {
        seconds++
        if (seconds % 60 == 0) { 
          minuts++ 
          seconds=0

          if (minuts % 60 == 0) {
            hours++
            minuts=0
          }

        }

        let s_hour=hours.toString()
        let s_min=minuts.toString()
        let s_sec=seconds.toString()
        s_hour = (s_hour.length==1)? '0'+s_hour:s_hour
        s_min = (s_min.length==1)? '0'+s_min:s_min
        s_sec = (s_sec.length==1)? '0'+s_sec:s_sec
        let s_time = `${s_hour}:${s_min}:${s_sec}`
        console.log(s_time)
        this.timer_label = s_time

      }, 1000)



      const response = await fetch(`${this.url}/cource_time`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt')

        },
        body: JSON.stringify({
          cource_id: this.activeItem.cource_id,
        })

      })
      // тут получили ответ
      console.log(await response.json());




    },
    async send_data() { // заполнениее таблицы answers
      
      clearInterval(this.si1)
      
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
      const response = await fetch(`${this.url}/answer/add`, {
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
      const response = await fetch(`${this.url}/cource/get_my_subscribe_cource`, {
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
      const response = await fetch(`${this.url}/task/get_task_cource`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',

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
      const response = await fetch(`${this.url}/cource/del`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          user_id: cource.user_id,
          cource_id: cource.cource_id
        })
        // 'Access-Control-Allow-Origin': '*'
      });
      
      this.cources = await response.json()
      console.log('bibibibibbiibbibi: ', this.cources)
    }


  }
}
</script>
