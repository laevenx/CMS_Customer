<template>
    <div>
      <div class="hero">
        <div class="hero-body">
          <h1 class="is-size-2">Checkout</h1>
        </div>
      </div>

    <div class="columns is-mobile is-centered" v-for="(check,i) in checks" :key="i">
      <div class="column is-half ">
        <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img v-bind:src="check.Product.image_url" height="128" width="128" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{check.Product.name}}</strong>
          <br>
          stock: {{check.quantity}}<br>
          total price: {{check.quantity * check.Product.price}}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left"></div>
        <div class="level-right">
          <a class="level-item" aria-label="like" @click.prevent="showdelete(check.id,check.Product.name)">
            <span class="icon is-medium">
              <b-icon
                icon="delete"
                size="is-medium">
            </b-icon>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>
      </div>
    </div>
    <div class="column" style="margin: 15px;">
              <b-button size="is-large" @click.prevent="showcheckout"><b-icon
                icon="cart"
                size="is-medium"></b-icon>Checkout<b-icon
                icon="cart"
                size="is-medium"></b-icon></b-button>
    </div>
    <b-modal :active.sync="isCardModalActive" :width="320" scroll="keep">
            <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Delete {{deleteItem}}?</p>
                    </header>
                    <section class="modal-card-body">
                        Are You Sure Want to Delete {{deleteItem}}
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-primary" @click.prevent="deleteconfirm(selectId)"><b-icon
                icon="delete"
                size="is-small">
            </b-icon><span>Delete</span></button>
                    </footer>
                </div>

        </b-modal>

        <b-modal :active.sync="isCheckoutModalActive" :width="320" scroll="keep">
            <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Confirm Checkout</p>
                    </header>
                    <section class="modal-card-body">
                        Are You Sure Checkout ?
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-primary" @click.prevent="checkoutconfirm"><b-icon
                icon="cart"
                size="is-small">
            </b-icon><span>Checkout</span></button>
                    </footer>
                </div>

        </b-modal>
    </div>
</template>

<script>
import server from '@/api'

export default {
  name: 'Cart',
  data () {
    return {
      isCardModalActive: false,
      isCheckoutModalActive: false,
      deleteItem: '',
      selectId: 0
    }
  },
  methods: {
    showdelete (id, name) {
      this.isCardModalActive = true
      this.deleteItem = name
      this.selectId = id
    },
    deleteconfirm (id) {
      console.log('deleted')
      server.delete(`/cart/delete/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('loadCheckout')
          this.$buefy.toast.open('delete completed')
          this.isCardModalActive = false
        })
        .catch(err => {
          this.$buefy.toast.open(err.response.data.error)
        })
    },
    showcheckout () {
      this.isCheckoutModalActive = true
    },
    checkoutconfirm () {
      
      const data = this.$store.getters.checkout
      const promises = []
      const id = 0
      for (let i = 0; i < data.length; i++) {
        promises.push(
          server.put(`/cart/confirm/${data[i].id}`,null, {
            headers: {
              token: localStorage.token
            },
            params: {
              id: data[i].id
            }
          })
        )
      }
      console.log(promises)

      Promise.all(promises)
      .then(data => {
            this.$buefy.toast.open('checkout completed, thank you for purchase')
            this.isCheckoutModalActive = false
            this.$store.dispatch('loadCheckout')
          })

      // for (let i = 0; i < promises.length; i++) {
      //     await fetchItem(promises[i])
      // }

      // Promise.all(promises.reduce((p, fn) => p.then(fn), Promise.resolve()))
      //   .then(data => {
      //     this.$buefy.toast.open('checkout completed, thank you for purchase')
      //     this.isCheckoutModalActive = false
      //     this.$store.dispatch('loadCheckout')
      //   })
      // console.log(localStorage.token)
      // server.put('/cart/confirm/10', null,{
      //   headers: {
      //     token: localStorage.token
      //   }
      // })
      //   .then(data => {
      //       this.$buefy.toast.open('checkout completed, thank you for purchase')
      //       this.isCheckoutModalActive = false
      //       this.$store.dispatch('loadCheckout')
      //     })
      //   .catch(err => {
      //     this.$buefy.toast.open(err.response.data)
      //   })
    }
  },
  created () {
    this.$store.dispatch('loadCheckout')
  },
  computed: {
    checks () {
      return this.$store.getters.checkout
    }
  }
}
</script>

<style>
</style>
