<template>
    <div>
    <div class="columns is-mobile is-centered">
      <div class="column is-half ">
        <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>asdasdasd</strong>
          <br>
          stock: 12<br>
          price: 12000
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left"></div>
        <div class="level-right">
          <a class="level-item" aria-label="like" @click.prevent="showdelete(id)">
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

    </div>
</template>

<script>
import server from '@/api'

export default {
  name: 'Cart',
  data(){
    return {
      data: []
    }
  },
  methods: {
    showdelete (id) {
      server.delete(`/cart/delete/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
    }
  },
  created() {
    server.get('/cart/checkout',{
      headers: {
        token: localStorage.token
      }
    })
    .then(({data}) => {
      console.log(data)
        this.check = data
    })
    .catch(err => {
      console.log(err.response.data.error)
    })
  },
  computed: {

  },
}
</script>

<style>
</style>
