<template>
    <b-navbar class="has-background-light">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/e-commerce.png"
                    alt="e-commerce"
                >
            </b-navbar-item>
        </template>
        <template slot="start">

        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                     <b-button type="is-primary" v-if="!loggedIn" @click.prevent="showlogin" inverted>Log in</b-button>
                    <b-button type="is-primary" v-if="!loggedIn" @click.prevent="showregister" inverted><strong>Register</strong></b-button>
                     <b-button type="is-primary" v-if="loggedIn" inverted><p class="is-size-5 has-text-dark">{{accName}}</p></b-button>
                     <b-button type="is-primary" v-if="loggedIn" @click.prevent="showcart" inverted><p class="is-size-4 has-text-dark has-text-weight-semibold"><b-icon
                icon="cart-outline"
                size="is-medium"
                type="is-dark">
            </b-icon> {{numberCart}}</p></b-button>
                    <b-button type="is-primary" v-if="loggedIn" @click.prevent="logout" inverted><b-icon icon="door-open" type="is-dark" size="is-medium"></b-icon><strong class="is-size-6 has-text-dark">Log Out</strong></b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {

    }
  },
  methods: {
    logout () {
      localStorage.clear()
      // this.$store.state.loggedIn = false
      this.$store.commit('SET_LOGIN', false)
      this.$router.push('/')
    },
    showlogin () {
      // console.log('text')
      this.$store.state.isLoginRegister = true
      this.$store.commit('SET_ACTIVETAB', 0)
      // this.$store.state.activeTab = 0
    },
    showregister () {
      // console.log('text')
      this.$store.state.isLoginRegister = true
      this.$store.commit('SET_ACTIVETAB', 1)
      // this.$store.state.activeTab = 1
    },
    showcart () {
      this.$store.dispatch('loadCheckout')
      this.$router.push('/cart')
    }
  },
  computed: {
    isLoginRegister () {
      return this.$store.getters.isLoginRegister
    },
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    accName () {
      return localStorage.accountName
    },
    numberCart () {
      return this.$store.getters.numbercart
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('SET_LOGIN', true)
      this.$store.dispatch('calculateNumberCart')
      this.$store.dispatch('loadCheckout')
      this.loggedIn()
      // accName = localStorage.accountName
      // this.accName= localStorage.accountName
    }
  }
}
</script>

<style>

</style>
