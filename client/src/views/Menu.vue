<template>
    <div>
        <Banner />

        <h1 class="is-size-4">welcome, {{accName}}</h1>
        <hr>
        <div class="columns">
          <div class="column is-half is-offset-3">
          <b-field>
            <b-input placeholder="Search..."
                type="search"
                icon="magnify"
                v-model="search"
                >
            </b-input>
        </b-field>

          </div>

        </div>
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
        <div v-for="x in maxRow" v-bind:key="x" class="columns" style="padding:2%;">
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
import { debounce } from 'lodash'
export default {
  name: 'Menu',
  data () {
    return {
      accName: localStorage.accountName,
      search: '',
      presearch: 0,
      products: []
    }
  },
  components: {
    Banner: () => import('../components/Banner.vue')
  },
  created () {

  },
  mounted () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('loadCheckout')
    // this.$store.dispatch('fetchCategory')
    this.products = this.$store.getters.products
  },
  watch: {
    search: {
      handler (search) {
        this.debounced(search)
      },
      immediate: true
    }
  },
  methods: {
    showItemDetail (id) {
      localStorage.setItem('itemId', id)
      this.$store.dispatch('loadItem', id)
      this.$router.push('/item')
    },
    debounced: debounce(function (search) {
      console.log(this.products)
      // if(this.presearch > search){
      this.products = this.$store.getters.products
      // }
      // this.presearch = search

      this.products = this.products.filter(product => {
        return product.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }, 2000)
  },

  computed: {
    // products () {
    //   return this.$store.getters.products
    // },
    maxRow () {
      const products = this.$store.getters.products
      // console.log(products.length/5)
      return Math.ceil(products.length / 5)
    }
  }
}
</script>
