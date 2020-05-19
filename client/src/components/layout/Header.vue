<template>
    <b-navbar class="has-background-light">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="./">
                Home
            </b-navbar-item>
            <b-navbar-item @click.prevent="$router.push('/item')">
                Items
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                     <b-button type="is-primary" v-if="!loggedIn" @click.prevent="showlogin" inverted>Log in</b-button>
                    <b-button type="is-primary" v-if="!loggedIn" @click.prevent="showregister" inverted><strong>Register</strong></b-button>
                     <b-button type="is-primary" v-if="loggedIn" inverted>{{accName}}</b-button>
                     <b-button type="is-primary" v-if="loggedIn" inverted>Cart</b-button>
                    <b-button type="is-primary" v-if="loggedIn" @click.prevent="logout" inverted><strong>Log Out</strong></b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  data(){
      return{
          accName : localStorage.accountName
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
    }
  },
  computed: {
    isLoginRegister () {
      return this.$store.getters.isLoginRegister
    },
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('SET_LOGIN', true)
      this.loggedIn()
    }
  }
}
</script>

<style>

</style>
