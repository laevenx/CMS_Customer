<template>
  <div class="home">
    <Banner />
    <LoginRegister />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Banner: () => import('@/components/Banner.vue'),
    LoginRegister: () => import('@/components/LoginRegister.vue')
  },
  created () {
    if (localStorage.token) {
      this.$router.push('/menu')
    }
  }
}
</script>
