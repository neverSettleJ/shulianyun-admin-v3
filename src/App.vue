<template>

  <router-view />
</template>

<script>
// import { useRoute } from 'vue-router'
import { ref } from 'vue'
export default {
  name: 'App',
  // components: {
  // },

  setup() {
    const sum = ref(0)
    // const router = useRoute()
    // const linkto = () => {
    //   let result = '/login'
    //   router.replace(result)
    // }

    return {
      sum
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
