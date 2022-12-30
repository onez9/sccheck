<script setup>
</script>

<template>
  <div class="container" id="elements">
    <!-- <p>Список товаров</p> -->
  
    <div class="row">
      <div class="col-5">
        <div v-if="new_mode_cource==true">
          <h5>Новый курс</h5>
          <label for="name_cource">Название</label>
          <input v-model="name_cource" type="text" class="form-control" id="name_cource">
          <label for="theme_cource">Тема</label>
          <input v-model="theme" type="text" class="form-control" id="theme">
          <label for="description_cource">Описание</label>
          <input v-model="description_cource" type="text" class="form-control" id="description_cource">
          <label for="avatar_cource">Аватар</label>
          <input type="file" class="form-control" id="avatar_cource">
        </div>
        <button v-if="new_mode_cource==true" @click="addCource" class="btn btn-success mt-1 mb-5 me-1">Добавить</button>
        <button v-if="new_mode_cource==true" @click="addCourceCancel" class="btn btn-success mt-1 mb-5">Отмена</button>
        <button v-if="new_mode_cource==false" @click="new_mode_cource=true ; new_mode_user=false" class="btn btn-success mt-1 mb-5 me-1">Новый Курс</button>
      </div>
      <div class="col-2"></div>
      <div class="col-5">
        <h5>Мои курсы</h5>
      </div>
      
    </div>


  </div>


</template>

<script>
export default {
	data() {
		return {
			firstname: "",
			lastname: "",
			secondname: "",
			email: "",
			pass1: "",
			pass2: "",
			new_mode_user: false,


			name_cource: "",
			theme_cource: "",
			description_cource: "",
			
			new_mode_cource: false
		}
	},
	computed: {

	},
	async mounted() {

	},
	methods: {

		async addCourceCancel() {
			this.name_cource = ""
			this.theme_cource = ""
			this.description_cource = ""

			this.new_mode_cource = false
		},
		async addCource() {
			const response = await fetch("/newcource", {
				method: "POST"
			})

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
