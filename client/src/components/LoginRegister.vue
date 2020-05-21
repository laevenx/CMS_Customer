<template>
  <section>
<b-modal :active.sync="isLoginRegister"
                 has-modal-card
                 trap-focus
                 :destroy-on-hide="false"
                 aria-role="dialog"
                 aria-modal
                 :on-cancel="closemodal"
                  >

             <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login/Register</p>
                    </header>
                    <section class="modal-card-body">
                      <b-tabs v-model="activeTab">
            <b-tab-item label="Login">
               <b-field label="Email">
                            <b-input
                                type="email"
                                :value="email"
                                v-model="loginemail"
                                placeholder="Your email"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                :value="password"
                                v-model="loginpassword"
                                password-reveal
                                placeholder="Your password"
                                required>
                            </b-input>
                        </b-field>
                        <br>
                        <button class="button is-primary" @click.prevent="login">Login</button>
            </b-tab-item>
            <b-tab-item label="Register">
                <b-field label="First Name">
            <b-input v-model="first_name"></b-input>
        </b-field>

        <b-field label="Last Name">
            <b-input v-model="last_name"></b-input>
        </b-field>

        <b-field label="Email">
            <b-input v-model="email"
                type="email"
                value="john@">
            </b-input>
        </b-field>

        <b-field label="Password">
            <b-input v-model="password" type="password"
                password-reveal>
            </b-input>
        </b-field>
   <button class="button is-primary"  @click.prevent="register">Register</button>
            </b-tab-item>
            </b-tabs>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="closemodal">Close</button>

                    </footer>
                </div>
            </form>
        </b-modal>

    </section>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'LoginRegister',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      // console.log('test')

      let data = {
        email: this.loginemail,
        password: this.loginpassword
      }

      // if (this.email === '') {
      //   this.$buefy.snackbar.open({
      //     duration: 5000,
      //     message: 'login completed',
      //     type: 'is-danger',
      //     position: 'is-top',
      //     queue: false
      //   })
      // }
      console.log(data)
      this.$store.dispatch('login', data)
        .then(({ data }) => {
          console.log(data)
          if (data.roles === 'costumer') {
            console.log('masuk')
            
            let token = data.token
            // token = 'asdweaf3q4trqefearf'
            let accountname = `${data.first_name} ${data.last_name}`
            // accountname = 'sleeep asd'
            localStorage.setItem('token', token)
            localStorage.setItem('accountName', accountname)
            this.$store.commit('SET_LOGIN', true)
            this.$store.state.isLoginRegister = false
            this.$router.push('/menu')
            console.log('asdasd loggedIn', this.$store.state.loggedIn)
          } else {
            console.log('login must with costumer account only')
            this.$buefy.snackbar.open({
            duration: 5000,
            message: 'login must with costumer account only',
            type: 'is-primary',
            position: 'is-top',
            queue: true
          })
          }

          // this.$store.state.loggedIn = true
          
        })
        .catch(err => {
          console.log(err.response.data)
          this.$buefy.snackbar.open({
            duration: 5000,
            message: err.response.data.error,
            type: 'is-primary',
            position: 'is-top',
            queue: true
          })
        })
    },
    register () {
      const newUser = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        roles: 'costumer'
      }

      this.$store.dispatch('register', newUser)
        .then(({ data }) => {
          this.$store.state.activeTab = 0
        })
        .catch(err => {
          console.log(err.response.data)
          this.$buefy.snackbar.open({
            duration: 5000,
            message: err.response.data.error[0],
            type: 'is-primary',
            position: 'is-top',
            queue: true
          })
        })
    },
    closemodal () {
      console.log(this.activeTab)
      this.$store.state.isLoginRegister = false
    },
    loginTab () {
      this.$store.state.activeTab = this.$route.activeTab
    },
    registerTab () {
      console.log('text')
      this.$store.state.activeTab = 1
    }
  },
  created () {
    this.loggedIn()
    this.isLoginRegister()
    this.activeTab()
  },
  computed: {
    isLoginRegister () {
      return this.$store.getters.isLoginRegister
    },
    activeTab () {
      return this.$store.getters.activeTab
    }
  }
}
</script>

<style>

</style>
