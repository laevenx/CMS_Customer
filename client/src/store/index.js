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
    products: [],
    banners: []
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.loggedIn = payload
    },
    SET_ACTIVETAB (state, payload) {
      state.activeTab = payload
    },
    SET_PRODUCTS (state,payload){
      state.products = payload
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
        roles: 'costumer'
      })
    },
    fetchProducts ({ commit }) {
      return server.get('/products/list', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('products', data.data)
          commit('SET_PRODUCTS', data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchCart ({ commit, state }) {
      return server.get('/cart/list', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('cart', data.data)
          commit('SET_CARTS', data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchBanners ({ commit, state }) {
      return server.get('/banner/list', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('banners', data.data)
          commit('SET_BANNERS', data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  modules: {
  },
  getters: {
    loggedIn: state => state.loggedIn,
    isLoginRegister: state => state.isLoginRegister,
    activeTab: state => state.activeTab,
    products: state => state.products,
    carts: state => state.carts,
    banners: state => state.banners
  }
})
