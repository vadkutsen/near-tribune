<template>
  <MainLayout>
    <router-view/>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'App',
  components: {
    MainLayout
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
#app {
  font-family: 'Special Elite', cursive;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* a.router-link-active {
  border-bottom: 0.1em solid indigo;
} */
</style>
