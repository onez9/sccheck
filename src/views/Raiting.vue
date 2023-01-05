<script setup>
import axios from 'axios'
</script>

<template>
  <div class="container" id="elements">
    <!-- <p>Список товаров</p> -->
    <!-- <form action="/sendProduct" method="POST" enctype="multipart/form-data"> -->
    <!-- {{currentPage}} -->
    <a href="http://localhost:3000/get_users">anime</a>
    <button class="btn btn-success" @click="anime">all ok</button>
    <table class="table table-striped table-hover">
      <tbody>
        <tr @click="activeElem = element" v-for="(element, index) in partitens" :key="index">

          {{element}}
          <!-- <div class="card shadow rounded my-1">
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <img v-bind:src="element.imgpath" class="product-image">
    
                </div>



              </div>
            </div>
          </div> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const url='http://192.168.149.184:3000'
export default {
  // el: '#elements',
  data() {
    return {
      // основные элементы корзины
      partitens: [{1:1},{2:2},{3:3},{4:4}],
      
    }
  },
  computed: { 
  },
  async mounted() {
    // await this.getItemsCart()
    // console.log('Компонент примонтирован!');
    // await anime()
  },
  methods: {
    // кнопка удалить в корзине
    async anime() {
      // console.log('123')
      // this.cart_items.splice(this.cart_items.indexOf(element), 1)
      // alert(this.elements.indexOf(element))
      const response = await fetch('http://localhost:3000/get_users', {
        method: 'GET',
      })
      this.partitens = await response.json();
      console.log(this.partitens)
    },


    async test_get() {

      axios.get(`${url}/get_users`).then(resp => {
        console.log(resp.data);
      
      });
    }

    // выполняется при загрузке страницы
  }

}
</script>
