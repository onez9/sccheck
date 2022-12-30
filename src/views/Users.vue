<script setup>
</script>

<template>
	<div class="container ">
		<div class="row">
			<div class="col-5" >
				<button v-if="new_mode_user==false" @click="new_mode_user=true ; new_mode_cource=false" class="btn btn-success mt-1 mb-5 me-1">Новый пользователь</button>
				<button v-if="new_mode_cource==false" @click="new_mode_cource=true ; new_mode_user=false" class="btn btn-success mt-1 mb-5 me-1">Новый Курс</button>
				
				
				<div v-if="new_mode_user==true">
					<h5>Новый пользователь</h5>
					<label for="firstname">Имя</label>
					<input v-model="firstname" type="text" class="form-control" id="firstname">
					<label for="lastname">Фамилия</label>
					<input v-model="lastname" type="text" class="form-control" id="lastname">
					<label for="secondname">Отчество</label>
					<input v-model="secondname" type="text" class="form-control" id="secondname">
					<label for="email">Email</label>
					<input v-model="email" type="email" class="form-control" id="email">
					<label for="pass1">Пароль</label>
					<input v-model="pass1" type="password" class="form-control" id="pass1">
					<label for="pass2">Повторите пароль</label>
					<input v-model="pass2" type="password" class="form-control" id="pass2">
				</div>
				<button v-if="new_mode_user==true" @click="addUser" class="btn btn-success mt-1 mb-5 me-1">Добавить</button>
				<button v-if="new_mode_user==true" @click="addUserCancel" class="btn btn-success mt-1 mb-5">Отмена</button>
				
				
				
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
				


			</div>
		</div>
	</div>
  <!-- <h1>Моя компания</h1> -->
  <!-- <p>У нас самые лучшие услуги и команда в этой области!</p>
  <h1>Наша команда</h1>
	<div id="raiting">
		<div class="d-flex">
			<div v-for="(item, index) in items" :key="index">
				<button @click="game(item, index)" :class="{'btn btn-light btn-lg me-1': true, 'btn-dark': (item.active==true)}"><i class="bi-star"></i></button>
			</div>
		</div>
	</div>
  <div class="row">
	  <div class="col-md-4">
		  <div class="card shadow rounded my-3 th">
			  <div class="card-body">
				  <div><img src="assets/img/p1.jpg" class="avatar"></div>
				  <div class="avatar-post"><i class="bi bi-person"></i> Генеральный директор</div>
				  <div class="avatar-text">Самый целеустремленный человек</div>
			  </div>
		  </div>
	  </div>
	  <div class="col-md-4">
		  <div class="card shadow rounded my-3 th">
			  <div class="card-body">
				  <div><img src="assets/img/p2.jpg" class="avatar"></div>
				  <div class="avatar-post">Уборщик</div>
				  <div class="avatar-text">Моет полы</div>
			  </div>
		  </div>
	  </div>
	  <div class="col-md-4">
		  <div class="card shadow rounded my-3 th">
			  <div class="card-body">
				  <div><img src="assets/img/p3.jpg" class="avatar"></div>
				  <div class="avatar-post">Рабочий</div>
				  <div class="avatar-text">Самый главный продавец</div>
			  </div>
		  </div>
	  </div>
 </div> -->
</template>

<script>
export default {
	el: "#raiting",
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
		async addUserCancel() {
			this.firstname = ""
			this.lastname= ""
			this.secondname= ""
			this.email= ""
			this.pass1= ""
			this.pass2= ""
			this.new_mode_user=false
		},
		async addUser() {
			const response = await fetch("/newuser", {
				method: "POST"
			})

		},
		async addCourceCancel() {
			this.name_cource = ""
			this.theme_cource = ""
			this.description_cource = ""

			this.new_mode_cource = false
		},
		async addCource() {
			const response = await fetch("/newuser", {
				method: "POST"
			})

		}
	}
}
</script>
