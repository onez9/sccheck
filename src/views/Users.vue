<script setup>
import config from '../config.mjs'
</script>

<template>
	<div class="container ">
		<div class="row">
			<div class="col-sm-8">
				<div v-for="(user, index) in users" v-bind:key="index">
					<label class="form-control mb-1 me-1 mt-1">{{user.firstname}} {{user.secondname}} {{user.lastname}}</label>
				</div>
				
				



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
// const url='http://192.168.149.184:3000'
const url=`http://${config.host}:${config.port}`
export default {
	data() {
		return {
			users: [],
			my_name: "",
		}
	},
	computed: {

	},
	async mounted() {
		await this.getusers()
		this.my_name = window.localStorage.getItem('user')
	},
	methods: {

		async getusers() {
			const response = await fetch(`${url}/user`, {
				method: "POST"
			})
			this.users = await response.json()
		}
	}
}
</script>
