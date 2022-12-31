<script setup>
</script>

<template>
  <div class="container" id="elements">
    <!-- <p>Список товаров</p> -->
  
    <div class="row">
      <div class="col-7">
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

        <button v-if="new_mode_cource==true" @click="addCource" class="btn btn-info mt-1 mb-1 me-1">Создать</button>
        <button v-if="new_mode_cource==true" @click="clear_input_for_cource" class="btn btn-success m-1">Закрыть</button>
        <button v-if="new_mode_cource==false" @click="new_mode_cource=true" class="btn border border-primary form-control mt-1 mb-1 me-1">Новый Курс</button>
        

      </div>
    </div>
    <div class="row">    
      <!-- <div class="col-2"></div> -->
      <div class="col-7">
        <h5>Мои курсы</h5>

        <div @click="activeElem = element" v-for="(element, index) in list_cources" :key="index">
          <div class="border-primary border rounded p-1 mb-2">
            <label v-if="element.editmode">Название курса:</label>
            <div class="d-flex">
              <input v-if="element.editmode" placeholder="Название курса" type="text" class="form-control  mt-1 me-1 mb-1" v-model="element.name">

              <!-- <button @click="element.editmode=true" v-if="element.editmode" class="btn btn-warning"><i class="bi-save"></i></button>
              <button @click="element.editmode=true" v-if="element.editmode" class="btn btn-danger"><i class="bi-x-square"></i></button>-->
              <label v-if="!element.editmode" class="form-control bg-light mt-1 me-1 mb-1">{{ element.name }}</label>
              <button @click="element.editmode=true" v-if="!element.editmode" class="btn btn-warning mt-1 me-1 mb-1"><i class="bi-gear"></i></button>
              
              
              <!-- <button @click="element.show_task=true" v-if="element.editmode" class="btn btn-success mt-1 me-1 mb-1"><i class="bi-list-task"> </i></button> -->
              <!-- <button @click="element.show_task=false" v-if="element.show_task" class="btn btn-info mt-1 me-1 mb-1"><i class="bi-x"></i></button> -->
              <!-- <button @click="element.show_task=true" v-if="element.editmode && !element.edit_task" class="btn btn-info mt-1 me-1 mb-1"><i class="bi-plus"></i></button> -->
              <!-- <div class="form-check form-switch">
                <input v-model="checked" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"><i class="bi-list-task"></i>
                <label class="form-check-label" for="flexSwitchCheckDefault">{{checked}}</label>
              </div> -->
            </div>

            <label v-if="element.editmode"> Задач в этом курсе:<br> </label>
            <label class="form-control" v-if="element.editmode">{{ element.list_tasks.length }}</label>
              <!-- тут кнокпи для добавления задач -->
            <div class="d-flex">
              
            </div>
            <div class="flex-grow-1 mb-1 mt-1 me-1"></div>
            <div v-if="element.editmode" >
              <label for="ntask">Название задача</label>
              <textarea placeholder="Название задачи" v-model="element.ntask" class="form-control" name="ntask" id="ntask" rows="10"></textarea>
              <label for="dtask">Описание задача</label>
              <input placeholder="Описание задачи" v-model="element.dtask" class="form-control" name="dtask" id="dtask" rows="10">
              <!-- number is: {{number}} -->
              <label for="number">Укажите рекоммендуемое время для прохождения задачи (мин):</label>
              <input v-model="element.time" type="number" id="number" class="form-control">
              <div class="d-flex">
                <button @click="addTask(element)" class="btn btn-info mt-1 mb-1 me-1">Добавить</button>
                <button @click="clear_different(element)" class="btn btn-warning mt-1 mb-1 me-1">Отмена</button>
                <button @click="element.show_task=true" v-if="element.editmode && !element.show_task" class="btn btn-success mt-1 me-auto mb-1">Показать задачи</button>
                <button @click="element.show_task=false" v-if="element.editmode && element.show_task" class="btn btn-success mt-1 me-auto mb-1">Скрыть</button>
                <button @click="closeEditMode(element)" v-if="element.editmode" class="btn btn-danger mt-1 me-1 mb-1"><i class="bi-x-square"></i></button>
              </div>
            </div>
            <!-- {{element.show_task}} -->

            <!-- {{element}} -->
            <div class="d-flex" v-if="element.show_task" v-for="(task, index) in element.list_tasks" :key="index">
              <div class="form-control border ronded border-primary p-1 mb-1">
                <!-- {{element}} -->
                <label class="bg-light form-control mb-1 mt-1 me-1">Номер задачи:<br> {{index}}</label>
                <label class="form-control mb-1 mt-1 me-1">Название задачи:<br>{{ task.name }}</label>
                <label class="form-control mb-1 mt-1 me-1">Описание задачи:<br>{{ task.dtask }}</label>
                <label class="form-control mb-1 mt-1">Время на выполнение задачи<br>{{ task.time }}</label>
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
			time: "",
			new_mode_cource: false
		}
	},
	computed: {

	},
	async mounted() {

	},
	methods: {
    async closeEditMode(element) {
      element.editmode=false
      element.show_task=false

    },
    async addTask(cource_element) {
      cource_element.list_tasks.push({
        dtask: cource_element.task_text,
        time: cource_element.time
      })
      cource_element.task_text=""
      cource_element.time=10
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
		async addCource() {

      this.list_cources.push({
        name: this.name_cource,
        theme: this.theme_cource,
        description: this.description_cource,
        list_tasks: []
      })

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
