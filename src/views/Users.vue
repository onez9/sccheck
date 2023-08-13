<script setup>
import config from '../config.mjs'
</script>

<template>
	<div class="container ">
		<div class="row">
			<div class="col-sm-8">
			<table class="table table-hover table-bordered table-primary">
				<thead>
					<tr>
						<td>ФИО</td>
						<td>Рейтинг</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(user, index) in users" v-bind:key="index">
						<td>{{user.firstname}} {{user.secondname}} {{user.lastname}}</td>
						<td>{{ user.statistics }}</td>
					</tr>
				</tbody>
			
			</table>
				



			</div>
		</div>
	</div>

</template>

<script>
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
	props: {
		url: String,
	},
	async mounted() {
		await this.getusers()
		this.my_name = window.localStorage.getItem('user')
	},
	methods: {

		async getusers() {
			const response = await fetch(`${this.url}/user`, {
				method: "POST"
			})
			this.users = await response.json()
		}
	}
}
</script>
