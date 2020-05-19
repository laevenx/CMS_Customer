import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginRegister: false,
    loggedIn: false,
    activeTab: 0,
    carts: [],
    Products: []
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.loggedIn = payload
    },
    SET_ACTIVETAB (state, payload) {
      state.activeTab = payload
    }
  },
  actions: {
    login ({ commit, state }, payload) {
      console.log(payload)
      return server.post('/login', {
        email: payload.email,
        password: payload.password

      })
    },
    register ({ commit, state }, payload) {
      console.log(payload)
      return server.post('/register', {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password,
        roles: payload.roles
      })
    }
  },
  modules: {
  },
  getters: {
    loggedIn: state => state.loggedIn,
    isLoginRegister: state => state.isLoginRegister,
    activeTab: state => state.activeTab
  }
})
