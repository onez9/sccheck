<script setup>
import config from '../config.mjs'
</script>

<template>
  <div class="container" id="elements">
    <!-- <p>Список товаров</p> -->
    <!-- adsfsfa: {{is_admin}} -->
    <div class="row">
      <!-- {{is_admin}} -->
      <div v-if="is_admin==1" class="col-5 border border-5 border-danger rounded p-1">
        <div v-if="new_mode_cource==true" class="border border-5 border-success rounded p-1">
          <h5>Новый курс</h5>

          <label for="name_cource">Название</label>
          <input v-model="name_cource" type="text" class="form-control" id="name_cource">
          <label for="theme_cource">Тема</label>
          <input v-model="theme_cource" type="text" class="form-control" id="theme">
          <label for="description_cource">Описание курса</label>
          <textarea v-model="description_cource" type="text" class="form-control" id="description_cource"></textarea>
          <label for="avatar_cource">Аватар</label>
          <input type="file" class="form-control" id="avatar_cource">
          <label>Время прохождения курса:</label>
          <input placeholder="Время прохождения курса" type="text" class="form-control mt-1 me-1 mb-1" v-model="runtime_cource">

          <!-- 
          <label class="mt-3" for="description_task">Описание задачи </label>
          <textarea v-model="description_task" class="form-control" name="text" id="description_cource" rows="10"></textarea>

          <button @click="addTask(description_task)" class="btn btn-dark mt-1 mb-1 me-1">Добавить задачу</button> -->


        </div>

        <button v-if="new_mode_cource==true " @click="create_cource" class="btn btn-info mt-1 mb-1 me-1">Создать</button>
        <button v-if="new_mode_cource==true" @click="clear_input_for_cource" class="btn btn-success m-1">Закрыть</button>
        <button v-if="new_mode_cource==false" @click="new_mode_cource=true" class="btn border border-primary mt-1 mb-1 me-1"><i class="bi bi-plus-square"></i></button>
        

      </div>
      <div v-if="is_admin==1" class="col-7"></div>
      <!-- <div class="col-2"></div> -->
      <div v-if="is_admin==1 && !new_mode_cource" class="col-12 border border-5 border-warning rounded p-1 mt-1">
        <h5>Мои курсы</h5>
        <div @click="activeElem = element" v-for="(element, index) in own_usr_cources" :key="index">
          <div class="border-warning border border-5 rounded p-1 mb-2">
            <!-- {{ element.id }} -->
            <div class="d-flex">
              <label v-if="!element.editmode" class="form-control mt-1 mb-1 me-1">{{element.name_cource}}</label>
              <div v-if="element.editmode" class="d-flex flex-column w-100">
                <!-- <input v-ifplaceholder="Название курса" type="text" class="form-control  mt-1 me-1 mb-1" v-model="element.name"> -->
                <!-- <button @click="element.editmode=true" v-if="element.editmode" class="btn btn-danger"><i class="bi-x-square"></i></button>-->
                <label>Название курса:</label>
                <!-- <button @click="element.editmode=true" v-if="!element.editmode" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-gear"></i></button> -->
                <input placeholder="Название курса" type="text" class="form-control mt-1 me-1 mb-1" v-model="element.name_cource">
                <!-- <button @click="element.editmode=true" v-if="element.editmode" class="btn btn-danger"><i class="bi-x-square"></i></button> -->
                <label>Тема курса:</label>
                <!-- <button @click="element.editmode=true" v-if="!element.editmode" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-gear"></i></button> -->
                <input placeholder="Тема курса" type="text" class="form-control mt-1 me-1 mb-1" v-model="element.theme_cource">
                <!-- <button @click="element.editmode=true" v-if="element.editmode" class="btn btn-danger"><i class="bi-x-square"></i></button> -->
                <label>Описание курса:</label>
                <input placeholder="Описание курса" type="text" class="form-control mt-1 me-1 mb-1" v-model="element.description_cource">
                <label>Время прохождения курса:</label>
                <input placeholder="Время прохождения курса" type="text" class="form-control mt-1 me-1 mb-1" v-model="element.runtime_cource">

                <div class="flex-grow-1 mb-3 bg-dark"></div>
                <div class="d-flex justify-content-end">

                  <div>
                    <button v-if="element.editmode" @click="closeEditMode(element)" class="btn btn-danger mt-1 me-1 mb-1"><i class="bi bi-x-square"></i> Закрыть</button>
                    <button v-if="element.editmode" @click="update_cource(element)" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi bi-check-square"></i> Применить</button>
                  </div>
                  <div>
                    <button v-if="element.show_tasks" @click="element.show_tasks=false" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi bi-list-columns"></i></button>
                    <button v-if="!element.show_tasks" @click="show_tasks1(element)" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi bi-list-columns"></i> Показать список задач</button>
                  </div>
                  <div>
                    <button v-if="element.create_task" @click="element.create_task=false" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi bi-plus-square"></i> Скрыть</button>
                    <button v-if="!element.create_task" @click="element.create_task=true" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi bi-plus-square"></i> Добавить задачу</button>
                  </div>
                
                  
                  
                
                </div>
              </div>
              <button v-if="!element.editmode" @click="editmode(element)" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-gear"></i></button>
            </div>

            <div v-if="element.create_task" class="border border-primary rounded p-1">
              
              <label v-if="element.editmode"> Задач в этом курсе:<br> </label>
              <label class="form-control bg-light" v-if="element.editmode">{{ element.list_tasks.length }}</label>
                <!-- тут кнокпи для добавления задач -->
              <div class="d-flex">
              
              </div>
              <div class="flex-grow-1 mb-1 mt-1 me-1"></div>
              <div v-if="element.editmode" >
                <label for="ntask">Название задачи</label>
                <input placeholder="Название задачи" v-model="element.ntask" class="form-control" name="ntask" id="ntask">
                <label for="dtask">Описание задачи</label>
                <textarea placeholder="Описание задачи" v-model="element.dtask" class="form-control" name="dtask" id="dtask" rows="3"></textarea>
                <label for="answer_task">Результат выполнения программы</label>
                <textarea placeholder="Вывод программы" v-model="element.answer_task" class="form-control" name="answer_task" id="answer_task" rows="3"></textarea>
                <!-- number is: {{number}} -->
                <!-- <label for="number">Укажите рекоммендуемое время для прохождения задачи (мин):</label>
                <input v-model="element.runtime" type="number" id="number" class="form-control"> -->
                <div class="d-flex">
                  <button @click="addTask(element)" class="btn btn-info mt-1 mb-1 me-1"><i class="bi-check-square"></i></button>
                  <button @click="clear_different(element)" class="btn btn-warning mt-1 mb-1 me-1"><i class="bi-x-square"></i></button>
                  
                </div>
              </div>
            </div>
            <!-- {{element.show_task}} -->

            <!-- {{element}} -->
            <div class="d-flex" v-if="element.show_tasks" v-for="(task, index) in element.list_tasks" :key="index">
              <div class="form-control border ronded border-success p-1 mb-1">
                <!-- {{element}} -->

                <label class="bg-warning form-control mb-1 mt-1 me-1">Номер задачи: {{index}}</label>

                <label class="">Название задачи:</label>
                <div class="d-flex">
                  <label v-if="!task.edit_ntask" class="form-control mb-1 mt-1 me-1">{{ task.ntask }}</label>
                  <input v-if="task.edit_ntask" placeholder="Название задачи" v-model="task.ntask" class="form-control mt-1 mb-1 me-1" name="ntask" id="ntask">
                  <button v-if="!task.edit_ntask" @click="task.edit_ntask=true" class="btn btn-warning mt-1 mb-1"><i class="bi-pen"></i></button>
                  <button v-if="task.edit_ntask" @click="edit_task(task, 1)" class="btn btn-success mt-1 mb-1">ok</button>
                </div>
                <label class="">Описание задачи:</label>
                <div class="d-flex">
                  <label v-if="!task.edit_dtask" class="form-control mb-1 mt-1 me-1">{{ task.dtask }}</label>
                  <input v-if="task.edit_dtask" placeholder="Описание задачи" v-model="task.dtask" class="form-control mt-1 mb-1 me-1" name="ntask" id="ntask">
                  <button v-if="!task.edit_dtask" @click="task.edit_dtask=true" class="btn btn-warning mt-1 mb-1"><i class="bi-pen"></i></button>
                  <button v-if="task.edit_dtask" @click="edit_task(task, 2)" class="btn btn-success mt-1 mb-1">ok</button>
                </div>
                <label class="">Вывод программы (Ответ который должен получиться):</label>
                <div class="d-flex">
                  <label v-if="!task.edit_answer_task" class="form-control mb-1 mt-1 me-1">{{ task.answer_task }}</label>
                  <input v-if="task.edit_answer_task" placeholder="Вывод программы:" v-model="task.answer_task" class="form-control mt-1 mb-1 me-1" name="ntask" id="ntask">
                  <button v-if="!task.edit_answer_task" @click="task.edit_answer_task=true" class="btn btn-warning mt-1 mb-1"><i class="bi-pen"></i></button>
                  <button v-if="task.edit_answer_task" @click="edit_task(task, 3)" class="btn btn-success mt-1 mb-1">ok</button>
                </div>
              </div>
            </div>

          </div>
      
          <!-- {{element}} -->
        </div>
      </div>

      <div v-if="!new_mode_cource" class="col-12 border border-warning border-5 rounded p-1 mt-3">
        <h5>Все курсы</h5>

        <div @click="activeElem = element" v-for="(element, index) in full_list_cources" :key="index">
          <div class="border-warning border border-5 rounded p-1 mb-2">
            <!-- {{ element.id }} -->
            <div class="d-flex">
              <div v-if="element.showmode" class="d-flex flex-column w-100">
                <!-- <input v-ifplaceholder="Название курса" type="text" class="form-control  mt-1 me-1 mb-1" v-model="element.name"> -->
                <!-- <button @click="element.editmode=true" v-if="element.editmode" class="btn btn-danger"><i class="bi-x-square"></i></button>-->
                <!-- <div class="d-flex justify-content-end"> -->
                
        
                <!-- </div> -->
                <img v-bind:src="element.imgpath" class="">
                <table class="table table-sm table-bordered rounded">

                  
                  <tbody>
                    <tr><th>Название курса:</th><td> {{element.name_cource}}</td></tr>
                    <!-- <button @click="element.editmode=true" v-if="!element.editmode" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-gear"></i></button> -->
                    <!-- <label class="form-control mt-1 me-1 mb-1"> -->
                    <!-- <button @click="element.editmode=true" v-if="element.editmode" class="btn btn-danger"><i class="bi-x-square"></i></button> -->
                    <tr><th>Тема курса:</th><td> {{element.theme_cource}}</td></tr>
                    <!-- <button @click="element.editmode=true" v-if="!element.editmode" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-gear"></i></button> -->
                    <!-- <label class="form-control mt-1 me-1 mb-1">{{element.theme_cource}}</label> -->
                    <!-- <button @click="element.editmode=true" v-if="element.editmode" class="btn btn-danger"><i class="bi-x-square"></i></button> -->
                    <tr><th>Описание курса:</th><td>{{element.description_cource}}</td></tr>
                    
                    <tr><th>Автор курса:</th><td>{{element.author_cource}}</td></tr>
                    <tr><th>Время прохождения курса:</th><td> {{element.runtime_cource}}</td></tr>
                  </tbody>
                </table>
                <div class="d-flex justify-content-end"><button @click="closeShowMode(element)" v-if="element.showmode" class="btn btn-dark mt-1 mb-1"><i class="bi-x-square"></i> Закрыть</button></div>
                <!-- <div class="flex-grow-1 mb-3 bg-dark"></div>
                <div class="d-flex justify-content-end">
                  <button @click="closeEditMode(element)" v-if="element.editmode" class="btn btn-dark mt-1 me-1 mb-1"><i class="bi-x-square"></i></button>
        
                </div> -->
              </div>
              <div class="input-group" v-if="!element.showmode">
                <label class="form-control">{{element.name_cource}}</label>
                <button @click="showelement(element)" class="btn btn-info"><i class="bi bi-eye"></i></button>
                <button @click="add_subscribe_on_cource(element) " class="btn btn-danger"><i class="bi bi-link"></i></button>
              </div>
            </div>

            <!-- {{element.show_task}} -->

            <!-- {{element}} -->
            <div class="d-flex" v-if="element.show_tasks" v-for="(task, index) in element.list_tasks" :key="index">
              <div class="form-control border ronded border-success p-1 mb-1">
                <!-- {{element}} -->

                <label class="bg-warning form-control mb-1 mt-1 me-1">Номер задачи: {{index}}</label>

                <label class="">Название задачи:</label>
                <div class="d-flex">
                  <label v-if="!task.edit_ntask" class="form-control mb-1 mt-1 me-1">{{ task.ntask }}</label>
                  <input v-if="task.edit_ntask" placeholder="Название задачи" v-model="task.ntask" class="form-control mt-1 mb-1 me-1" name="ntask" id="ntask">
                  <button v-if="!task.edit_ntask" @click="task.edit_ntask=true" class="btn btn-warning mt-1 mb-1"><i class="bi-pen"></i></button>
                  <button v-if="task.edit_ntask" @click="edit_task(task, 1)" class="btn btn-success mt-1 mb-1">ok</button>
                </div>
                <label class="">Описание задачи:</label>
                <div class="d-flex">
                  <label v-if="!task.edit_dtask" class="form-control mb-1 mt-1 me-1">{{ task.dtask }}</label>
                  <input v-if="task.edit_dtask" placeholder="Описание задачи" v-model="task.dtask" class="form-control mt-1 mb-1 me-1" name="ntask" id="ntask">
                  <button v-if="!task.edit_dtask" @click="task.edit_dtask=true" class="btn btn-warning mt-1 mb-1"><i class="bi-pen"></i></button>
                  <button v-if="task.edit_dtask" @click="edit_task(task, 2)" class="btn btn-success mt-1 mb-1">ok</button>
                </div>
                <label class="">Вывод программы (Ответ который должен получиться):</label>
                <div class="d-flex">
                  <label v-if="!task.edit_answer_task" class="form-control mb-1 mt-1 me-1">{{ task.answer_task }}</label>
                  <input v-if="task.edit_answer_task" placeholder="Вывод программы:" v-model="task.answer_task" class="form-control mt-1 mb-1 me-1" name="ntask" id="ntask">
                  <button v-if="!task.edit_answer_task" @click="task.edit_answer_task=true" class="btn btn-warning mt-1 mb-1"><i class="bi-pen"></i></button>
                  <button v-if="task.edit_answer_task" @click="edit_task(task, 3)" class="btn btn-success mt-1 mb-1">ok</button>
                </div>
              </div>
            </div>

          </div>
      
          <!-- {{element}} -->
        </div>
      </div>


    </div>
  </div>


</template>

<script>
// const this.url='http://192.168.149.184:3000'
//const this.url=`http://${config.host}:${config.port}`
export default {
	data() {
		return {
      task_text: "",
      own_usr_cources: [],
      full_list_cources: [],
      runtime_cource: 0,
      list_tasks: [],
			name_cource: "",
			theme_cource: "",
			description_cource: "",
			runtime: "",
      is_admin: 0,
			new_mode_cource: false,
      show_create_button: false,
      my_name: "",
      active: "",
      activeElem: "",
      inactive: "",
      inactive_for_my_cources: "",
		}
	},
  props: {
    url: String,
  },
	computed: {

	},

	async mounted() {
    this.my_name = window.localStorage.getItem('user')
    await this.get_own_usr_cources()
    await this.getcourcesall() // все все курсы которые есть
    this.is_admin = parseInt(window.localStorage.getItem('is_admin'))
    
	},
  
	methods: {
    async edit_task(task, number) {
      
      console.log('Редактирование задачи!')
      let json_pack
      switch (number) {
        case 1:
          task.edit_ntask=false
          json_pack = {id: task.id, ntask: task.ntask, number: 1}
          break;
        case 2:
          task.edit_dtask=false
          json_pack = {id: task.id, dtask: task.dtask, number: 2}
          break;
        case 3:
          task.edit_answer_task=false
          json_pack = {id: task.id, answer_task: task.answer_task, number: 3}
          break;
        default:
          break;
      }

      const response = await fetch(`${this.url}/task/upd`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(json_pack)
      }) 
      let answer = await response.json()


    },
    async update_cource(element) {
      let pack={
        name: element.name_cource,
        theme: element.theme_cource,
        description: element.description_cource,
        runtime: element.runtime_cource,
        id: element.id
      }
      console.log('this is pack: ', pack)
      const response = await fetch(`${this.url}/cource/upd`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(pack)
      })
      console.log(await response.json())
    },
    async editmode(element) {
      element.editmode=true // показываем элемент
      this.activeElem=element
      if (this.inactive_for_my_cources!="" && this.activeElem!=this.inactive_for_my_cources) this.inactive_for_my_cources.editmode=false
      this.inactive_for_my_cources=this.activeElem



    },
    async showelement(element) {
      element.showmode=true // показываем элемент
      this.active=element // записываем элемент

      if (this.inactive != "" && this.active!=this.inactive) this.inactive.showmode=false
      this.inactive=this.active
      console.log('this.active: ', this.active)
      //this.active.editmode = false
      //const response = await fetch('http://localhost:3000/cource/get')
    },
    async show_tasks1(element) {
      console.log('start show task method')
      element.show_tasks=true
      element.create_task=false
      const response = await fetch(`${this.url}/task/get`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt')
        },
        body: JSON.stringify({id: element.id})
      }) 
      let answer = await response.json()
      console.log('answer', answer)
      element.list_tasks = answer
      
    },
    async closeShowMode(element) {
      element.showmode=false
      element.show_tasks=false
      element.create_task=false
      element.dtask=""
      element.ntask=""
      element.answer_task=""
      // element.runtime=10

    },
    async closeEditMode(element) {
      element.editmode=false
      element.show_tasks=false
      element.create_task=false
      element.dtask=""
      element.ntask=""
      element.answer_task=""
    },

    async addTask(element) {
      
      let task = {
        dtask: element.dtask,
        ntask: element.ntask,
        answer_task: element.answer_task,
        id: element.id
      }
      element.list_tasks.push(task)


      console.log(task)
      const response = await fetch(`${this.url}/task/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt')
        },
        body: JSON.stringify(task)
      })
      console.log(await response.json())
      // let result = await response.json(
      // console.log(result)

      // this.list_tasks = result

      element.ntask=""
      element.dtask=""
      element.answer_task=""
      // element.runtime=10
    },


    async clear_different(element) {
      this.task_text=""
    },


		async clear_input_for_cource() {
			this.name_cource = ""
			this.theme_cource = ""
			this.description_cource = ""
      this.runtime_cource=10
			this.new_mode_cource = false
		},

    async get_own_usr_cources() {
      // const myid={id: 22}
      // получение пользоваателем только тех которые он создал
      const response = await fetch(`${this.url}/cource/get_own_cource`, {
        method: 'POST',
        credentials: 'include',

        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt')


        },
        // body: JSON.stringify(myid)
      })
      // console.log(await response.json())
      let result = await response.json()
      console.log('answer: ', result)

      for (let i=0;i<result.length;i++) {
        result[i].list_tasks=[]
      }
      console.log(result)
      this.own_usr_cources = result
    },

    async add_subscribe_on_cource(cource) {
      await fetch(`${this.url}/cource/add_subscribe_on_cource`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt'),

        },
        body: JSON.stringify({
          cource_id: cource.id
        })
      })
      
      // this.cources = await response.json()
    },



    // все-все курсы для возврата
    async getcourcesall() {
      const response = await fetch(`${this.url}/cource/getall`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('jwt')
        },
      })
      // console.log(await response.json())
      let result = await response.json()
      console.log('answer: ', result)

      for (let i=0;i<result.length;i++) {
        result[i].list_tasks=[]
      }
      console.log(result)
      this.full_list_cources = result
    },
		async create_cource() {
      let formData = new FormData()
      let input = document.querySelector('input[type="file"]')

      formData.append('file', input.files[0])
      formData.append('name', this.name_cource)
      formData.append('theme', this.theme_cource)
      formData.append('runtime', this.runtime_cource)
      formData.append('description', this.description_cource)
      // formData.append('email', window.localStorage.getItem('user'))
    
      console.log(input.files[0])
      console.log(this.name_cource)
      console.log(this.theme_cource)
      console.log(this.runtime_cource)
      console.log(this.description_cource)
      // console.log(window.localStorage.getItem('user'))
      // formData={1:1,2:2}

      const response = await fetch(`${this.url}/cource/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'authorization': window.localStorage.getItem('jwt')
        },
        body: formData

      })
      // console.log(await response.json())
      let result = await response.json()
      console.log('Тут ответ который возвращает запрос: ', result)

      // this.own_usr_cources = result // загружаем курсы с сервера
      // for (let i=0;i<this.own_usr_cources.length;i++) {
      //   this.own_usr_cources[i].list_tasks =[]
      // }



      await this.get_own_usr_cources() // получаем все курсы с мои курсы
      await this.getcourcesall() // все все курсы которые есть


      // this.list_cources.push(pack)
      document.querySelector('input[type=file]').value = "";
      this.name_cource = ""
			this.theme_cource = ""
      this.runtime_cource = 10
			this.description_cource = ""

		}
	}
}


</script>
