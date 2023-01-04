<script setup>
</script>

<template>
  <div class="container" id="elements">
    <!-- <p>Список товаров</p> -->
  
    <div class="row">
      <div class="col-7 border border-success rounded p-1">
        <div v-if="new_mode_cource==true" class="border border-success rounded p-1">
          <h5>Новый курс</h5>

          <label for="name_cource">Название</label>
          <input v-model="name_cource" type="text" class="form-control" id="name_cource">
          <label for="theme_cource">Тема</label>
          <input v-model="theme_cource" type="text" class="form-control" id="theme">
          <label for="description_cource">Описание курса</label>
          <textarea v-model="description_cource" type="text" class="form-control" id="description_cource"></textarea>
          <label for="avatar_cource">Аватар</label>
          <input type="file" class="form-control" id="avatar_cource">


          <!-- 
          <label class="mt-3" for="description_task">Описание задачи </label>
          <textarea v-model="description_task" class="form-control" name="text" id="description_cource" rows="10"></textarea>

          <button @click="addTask(description_task)" class="btn btn-dark mt-1 mb-1 me-1">Добавить задачу</button> -->


        </div>

        <button v-if="new_mode_cource==true " @click="addCource" class="btn btn-info mt-1 mb-1 me-1">Создать</button>
        <button v-if="new_mode_cource==true" @click="clear_input_for_cource" class="btn btn-success m-1">Закрыть</button>
        <button v-if="new_mode_cource==false" @click="new_mode_cource=true" class="btn border border-primary form-control mt-1 mb-1 me-1">Новый Курс</button>
        

      </div>
    </div>
    <div class="row">    
      <!-- <div class="col-2"></div> -->
      <div class="col-7 border border-primary rounded p-1 mt-1">
        <h5>Мои курсы</h5>

        <div @click="activeElem = element" v-for="(element, index) in list_cources" :key="index">
          <div class="border-primary border rounded p-1 mb-2">
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

                <div class="flex-grow-1 mb-3 bg-dark"></div>
                <div class="d-flex justify-content-end">
                  
                  <button @click="closeEditMode(element)" v-if="element.editmode" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-x-square"></i></button>
                  <button v-if="element.editmode" @click="update_cource(element)" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-check-square"></i></button>
                  <button v-if="!element.show_tasks" @click="show_tasks1(element)" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-list-columns"></i></button>
                  <button v-if="element.show_tasks" @click="element.show_tasks=false" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-list-columns"></i></button>
                  <button v-if="!element.create_task" @click="element.create_task=true" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-plus-square"></i></button>
                  <button v-if="element.create_task" @click="element.create_task=false" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-plus-square"></i></button>
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
                <label for="number">Укажите рекоммендуемое время для прохождения задачи (мин):</label>
                <input v-model="element.runtime" type="number" id="number" class="form-control">
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
                <label class="">Время на выполнение задачи:</label>
                <div class="d-flex">
                  <label v-if="!task.edit_runtime" class="form-control mb-1 mt-1 me-1">{{ task.runtime }}</label>
                  <input v-if="task.edit_runtime" placeholder="Время на выполнение задачи:" v-model="task.runtime" class="form-control mt-1 mb-1 me-1" name="ntask" id="ntask">
                  <button v-if="!task.edit_runtime" @click="task.edit_runtime=true" class="btn btn-warning mt-1 mb-1"><i class="bi-pen"></i></button>
                  <button v-if="task.edit_runtime" @click="edit_task(task, 4)" class="btn btn-success mt-1 mb-1">ok</button>
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
export default {
	data() {
		return {
      task_text: "",
      list_cources: [],
      list_tasks: [],
			name_cource: "",
			theme_cource: "",
			description_cource: "",
			runtime: "",
			new_mode_cource: false,
      show_create_button: false
      
		}
	},
	computed: {

	},
	async mounted() {
    await this.getcources()
	},
	methods: {
    async edit_task(task, number) {
      
      console.log('start show task method')
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
        case 4:
          task.edit_runtime=false
          json_pack = {id: task.id, runtime: task.runtime, number: 4}
          break;
        default:
          break;
      }

      const response = await fetch('http://localhost:3000/task/upd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json_pack)
      }) 
      let answer = await response.json()


    },
    async update_cource(element) {
      const response = await fetch('http://localhost:3000/cource/upd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: element.name_cource,
          theme: element.theme_cource,
          description: element.description_cource,
          id: element.id
        })
      })
      console.log(await response.json())
    },
    async editmode(element) {
      element.editmode=true
      //const response = await fetch('http://localhost:3000/cource/get')
    },
    async show_tasks1(element) {
      console.log('start show task method')
      element.show_tasks=true
      element.create_task=false
      const response = await fetch('http://localhost:3000/task/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: element.id})
      }) 
      let answer = await response.json()
      console.log('answer', answer)
      element.list_tasks = answer
      
    },
    async closeEditMode(element) {
      element.editmode=false
      element.show_tasks=false
      element.create_task=false
      element.dtask=""
      element.ntask=""
      element.answer_task=""
      element.runtime=10

    },

    async addTask(element) {
      
      let task = {
        dtask: element.dtask,
        ntask: element.ntask,
        answer_task: element.answer_task,
        runtime: element.runtime,
        id: element.id
      }
      element.list_tasks.push(task)


      console.log(task)
      const response = await fetch('http://localhost:3000/task/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
      element.runtime=10
    },


    async clear_different(element) {
      this.task_text=""
    },


		async clear_input_for_cource() {
			this.name_cource = ""
			this.theme_cource = ""
			this.description_cource = ""
			this.new_mode_cource = false
		},

    async getcources() {
      const myid={id: 22}
      const response = await fetch('http://localhost:3000/cource/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myid)
      })
      // console.log(await response.json())
      let result = await response.json()
      console.log('answer: ', result)

      for (let i=0;i<result.length;i++) {
        result[i].list_tasks=[]
      }
      console.log(result)
      this.list_cources = result
    },

		async addCource() {
      let formData = new FormData()
      let input = document.querySelector('input[type="file"]')

      formData.append('file', input.files[0])
      formData.append('name', this.name_cource)
      formData.append('theme', this.theme_cource)
      formData.append('description', this.description_cource)
      formData.append('lecturer_id', 22)
    
      console.log(input.files[0])
      console.log(this.name_cource)
      console.log(this.theme_cource)
      console.log(this.description_cource)
      console.log(22)
      // formData={1:1,2:2}

      const response = await fetch('http://localhost:3000/cource/add', {
        method: 'POST',
        body: formData

      })
      // console.log(await response.json())
      let result = await response.json()
      console.log(result)

      this.list_cources = result // загружаем курсы с сервера
      for (let i=0;i<this.list_cources.length;i++) {
        this.list_cources[i].list_tasks =[]
      }




      


      // this.list_cources.push(pack)
      document.querySelector('input[type=file]').value = "";
      this.name_cource = ""
			this.theme_cource = ""
			this.description_cource = ""
		}
	}
}

















// const productsPerPage = 3
// // document.getElementById("b1").addEventListener('click', () => alert("Товар добавлен в корзину"), false)
// // document.getElementById("b2").addEventListener('click', () => alert("Товар добавлен в корзину"), false)
// // document.getElementById("b3").addEventListener('click', () => alert("Товар добавлен в корзину"), false)
// export default {
//   el: '#elements',
//   data() {
//     return {
//       currentRating: 0,
//       totalpages: 0,
//       elements: [],
//       currentPage: 0,
//       hide: false,
//       name_product: "",
//       price_product: 0,
//       description_product: "",
//       file: "",
//       temp: "Степень ахуенности",
//       new_element: "Создать персонажа",
//       my_name: "",
//       access: false,
//     }
//   },
//   computed: { 
//   },
//   async mounted() {
//     // await this.getProducts()
//     // await this.getProductsCount()
//     // await this.whoami()
//     // await this.is_access()
//     // console.log('Компонент примонтирован!');
//   },
//   methods: {
//     async t1() {
//       alert('Товар добавлен в корзину')
//     },
//     async uploadFile(e) {
//       const files = e.target.files
//       const data = new FormData()
//       data.append('file', files[0])
    
//       const response = await fetch('/t2', {
//         method: 'POST',
//         body: data
//       })


//       // .then(response => response.json())
//       // .then(data => {
//       //   console.log(data)
//       // })
//       // .catch(error => {
//       //   console.error(error)
//       // })
//       console.log(response.json())


//     },
//     async addProduct(name, description, price) {
//       // alert(name + description)
//       const response = await fetch('/sendProduct', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: name,
//           description: description ,
//           price: price
//         }) 

//       })
//       this.price_product=100
//       this.name_product=""
//       this.description_product=""

//       this.elements = await response.json();
//       await this.getProducts()
//       await this.getProductsCount()

//     },
//     async sendProduct() {

//       let formData = new FormData()

//       // const files = e.target.files // работает с @change=""
//       // const data = new FormData()
//       let input = document.querySelector('input[type="file"]')
//       formData.append('file', input.files[0])
//       // this.file = this.$refs.file.files[0]
//       // formData.append('file', this.file)
//       // formData.append('file', files[0])
      
//       formData.append('name', this.name_product)
//       formData.append('description', this.description_product)
//       formData.append('price', this.price_product)


//       // const data = new URLSearchParams();
//       // for (const pair of formData) {
//       //     data.append(pair[0], pair[1]);
          
//       // }
      
      
//       const response = await fetch(`/sendProduct?p=${this.currentPage}&limit=${productsPerPage}`, {
//         method: 'POST',
//         // headers: {
//         //   'Content-Type': 'application/x-www-form-urlencoded'
//         // },
//         body: formData

//       })
//       // let product = document.getElementsByName("name").text
//       // let description = document.getElementsByName("description").Values
//       // let price = document.getElementsByName("price").Value

//       this.elements = await response.json();
//       await this.getProductsCount()


//       // this.price_product=100
//       // this.name_product=""
//       // this.description_product=""
//       // document.querySelector('input[type=file]').value = '';
//       await this.canceling()

//       // await this.getProducts()
//       // await this.getProductsCount()
//       // console.log(product)
//       // console.log(description)
//       // console.log(price)
//     },
//     async updateProduct(element) {
//       element.editmode=false
//       const response = await fetch('/updaterec', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           id: element.id,
//           name: element.name,
//           description: element.description,
//           price: element.price
//         })

//       })
      
//     },
//     async delProduct(element) {
//       this.elements.splice(this.elements.indexOf(element), 1)
//       // alert(this.elements.indexOf(element))
//       const response = await fetch(`/delrec?name=${element.name}&p=${this.currentPage}&limit=${productsPerPage}`, {
//         method: 'POST',

//       })
//       this.elements = await response.json();
//       await this.getProductsCount()
//     },
//     async addToCart(element) {
//       const response = await fetch("/addtocart", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           product_id: element.id
//         })
//       })
//       this.t1()
//       console.log(await response.json())
//     },
//     async changePage(page) {
//       this.currentPage = page
//       await this.getProducts()
//     },
//     async testPost() {
//       // Отправляем запрос типа POST
//       const response = await fetch('/testpost', {
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: "Иван"
//         }) 
//       });

//       const jsonResult = await response.json();

//       console.log(jsonResult);
//     },
//     async testGet() {
//       // Отправляем запрос типа GET
//       const response = await fetch(`/testget?name=Василий`, {
//         method: 'GET',      
//       });

//       this.elements = await response.text();

//       console.log(elements);
//     },
//     async getProductsCount() {
//       const response = await fetch('getproductscount', {
//         method: 'GET'
//       })
//       const productscount = parseInt(await response.text(), 10)
//       this.totalpages = Math.ceil(productscount / productsPerPage)

//     },
//     async getProducts() {
//       const response = await fetch(`/getproducts?p=${this.currentPage}&limit=${productsPerPage}`, {
//         method: 'GET'
//       })

//       this.elements = await response.json();
//       // console.log(elements);
//     },
//     async ending() {
//       this.price_product=100
//       this.name_product=""
//       this.description_product=""
//       document.querySelector('input[type=file]').value = "";
//       this.hide=false
//     },
//     async canceling(){
//       this.price_product=100
//       this.name_product=""
//       this.description_product=""
//       document.querySelector('input[type=file]').value = "";
//     },
//     async whoami() {
//       const response = await fetch("/whoami", {
//         method: "GET"
//       })

//       this.my_name = await response.json()
//     },
//     async is_access() {
//       const response = await fetch("/is_access", {
//         method: "POST"
//       })

//       this.access = await response.json()
//     },
//     async enableEditMode(element) {
//       element.editmode=true
//       element.name_back=element.name
//       element.description_back=element.description
//       element.price_back=element.price
//     },
//     async disableEditMode(element) {
//       element.editmode=false
//       element.name=element.name_back
//       element.description=element.description_back
//       element.price=element.price_back
//     }
//   }

// }
// </script>
