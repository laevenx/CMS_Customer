<template>
  <div class="home">
    <Banner />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <LoginRegister />
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    HelloWorld: () => import('@/components/HelloWorld.vue'),
    Banner: () => import('@/components/Banner.vue'),
    LoginRegister: () => import('@/components/LoginRegister.vue')
  },
  created() {
    if(localStorage.token){
      this.$router.push('/menu')
    }
  },
}
</script>
