<template>
    <div>
    <div class="hero-body">
    <div class="columns">
        <div class="column is-3 is-offset-2">
          <figure class="image is-square">
            <img v-bind:src="item.image_url" height="480" width="480">
          </figure>
        </div>
        <div class="column is-5">
            <div class="box">
              <h1>Name : {{item.name}}</h1>
                <hr class="login-hr has-background-black">
              <h1>Price : {{item.price}}</h1>
              <h1>Stock : {{item.stock}}</h1>
              <hr class="login-hr has-background-black">
               <b-field label="Quantity">
            <b-field grouped>
              <div class="column is-2">
              </div>
               <b-numberinput
               v-model="stock"
               controls-position="compact"
                controls-rounded
                min="0"
                v-bind:max="item.stock">
            </b-numberinput>
            <p class="control">

                    <button class="button is-medium" @click.prevent="addCart(item.id)"><b-icon
                icon="cart"
                size="is-medium"></b-icon>

            <span>add Cart</span></button>
                </p>
            </b-field>
        </b-field>

            </div>

        </div>
      </div>
    </div>

    </div>
</template>

<script>
import server from '@/api'

export default {
  name: 'Item',
  methods: {
    addCart (id) {
      const newCart = {
        ProductId: id,
        quantity: this.stock
      }

      server.post('/cart/add', newCart, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('new cart added')
          this.$buefy.toast.open('new cart added')
          this.$store.dispatch('loadCheckout')
          // this.$store.commit('ADD_NUMBERCART')
        })
        .catch(err => {
          console.log(err.response.data)
          err.response.data.error = err.response.data.error.replace('notNull Violation:', '')
          this.$buefy.toast.open(err.response.data.error)
        })
    }
  },
  computed: {
    item () {
      return this.$store.getters.selectItem
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/')
    }
    this.$store.dispatch('loadItem', localStorage.itemId)
  }
}
</script>

<style>
</style>
