<script setup>
</script>

<template>
	<div class="container ">
		<div class="row">
			<div class="col-3" >
        <div v-for="(item, key) in cources" :key="key">
          <label class="form-control m-1">{{item}}</label>
        </div>


			</div>
      
      
      <!-- <div id="app">
        <component-a>123</component-a>
        <component-b>123</component-b>
        <component-c>123</component-c>
        
      </div> -->


      <div class="col-9" >
        <textarea v-model="code_input" class="form-control mt-1" name="code_input" id="code_input" rows="10"></textarea>
        <textarea class="form-control mt-1 mb-1" name="code_input" id="code_input" rows="10" disabled>{{code_input}}</textarea>
        <div class="d-flex">
          <input type="file" class="form-control me-1">
          <button class="btn btn-warning me-1">Проверить</button>
          <button @click="getcources" class="btn btn-danger">Отправить</button>
        </div>
      </div>
		</div>
	</div>
 
</template>

<script>
export default {
	data() {
		return {
      code_input: "",
      cources: [],

		}
	},
	computed: {

	},
	async mounted() {
    await this.getcources()
	},
	methods: {
    async getcources() {
      const response = await fetch('http://localhost:3000/cource/get', {
        method: 'POST'
      })
      
      this.cources = await response.json()
      console.log(this.cources)
    }


  }
}
</script>
