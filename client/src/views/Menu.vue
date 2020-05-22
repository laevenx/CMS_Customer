<template>
    <div>
        <Banner />
        <h1 class="is-size-4">welcome, {{accName}}</h1>
        <section class="section" style="">
        <div class="columns" style="padding:2%;">
            <div class="column is-1"></div>
            <div class="column is-2" v-for="(product,i) in products.slice(0,5)" :key="i">
            <a   @click.prevent="showItemDetail(product.id)" >
                <div   class="box" width="200" height="200">
                    {{product.name}}<br>
                    <img v-bind:src="product.image_url" width="128" height="128"><br>
                    price:{{product.price}}<br>
                    stock:{{product.stock}}
                </div>
            </a>
            </div>
            </div>
        <div v-for="x in maxRow" class="columns" style="padding:2%;">
            <div class="column is-1"></div>
            <div class="column is-2" v-for="(product,i) in products.slice((x*5),((x*5)+5))" :key="i">
            <a   @click.prevent="showItemDetail(product.id)" >
                <div   class="box" width="200" height="200">
                    {{product.name}}<br>
                    <img v-bind:src="product.image_url" width="128" height="128"><br>
                    price:{{product.price}}<br>
                    stock:{{product.stock}}
                </div>
            </a>
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
    showItemDetail (id) {
      this.$store.dispatch('loadItem', id)
      this.$router.push('/item')
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('loadCheckout')
    // this.$store.dispatch('fetchCategory')
  },
  computed: {
    products () {
      return this.$store.getters.products
    },
    maxRow () {
      const products = this.$store.getters.products
      // console.log(products.length/5)
      return Math.ceil(products.length / 5)
    }
  }
}
</script>
