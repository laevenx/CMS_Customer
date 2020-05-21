<template>
    <div>
        <Banner />
        <h1 class="is-size-4">welcome, {{accName}}</h1>
        <section class="section" style="">
        <div class="columns">
            <div class="column "  @click.prevent="">
                <div class="box" width="200" height="200" @click.prevent="test">
                    asdasdasdasd<br>
                    <img src="https://images-na.ssl-images-amazon.com/images/I/412jWjEIzKL._AC_SX425_.jpg"><br>
                    price:12000<br>
                    stock:12
                </div>

            </div>
            <div class="column ">
                <div class="box" width="200" height="200">
                     asdasdasdasd<br>
                    <img src="https://images-na.ssl-images-amazon.com/images/I/412jWjEIzKL._AC_SX425_.jpg"><br>
                    price:12000<br>
                    stock:12
                </div>
            </div>
            <div class="column ">
                <div class="box" width="200" height="200">
                     asdasdasd<br>
                    <img src="https://images-na.ssl-images-amazon.com/images/I/412jWjEIzKL._AC_SX425_.jpg"><br>
                    price:12000<br>
                    stock:12
                </div>
            </div>
            <div class="column ">
                <div class="box" width="200" height="200">
                     asdasdasdasdasd<br>
                    <img src="https://images-na.ssl-images-amazon.com/images/I/412jWjEIzKL._AC_SX425_.jpg"><br>
                    price:12000<br>
                    stock:12
                </div>
            </div>
            <div class="column ">
                <div class="box" width="200" height="200">
                     "asdasdasdas"<br>
                    <img src="https://images-na.ssl-images-amazon.com/images/I/412jWjEIzKL._AC_SX425_.jpg"><br>
                    price:12000<br>
                    stock:12
                </div>
            </div>
        </div>
        </section>

    </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      accName: localStorage.accountName
    }
  },
  components: {
    Banner: () => import('../components/Banner.vue')
  },
  methods: {
    test () {
      console.log('test')
    }
  }
}
</script>
