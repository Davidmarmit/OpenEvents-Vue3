<template>
  <nav-component></nav-component>
  <button @click="deleteToken">Logout</button>
</template>

<script>
import NavComponent from "@/components/NavComponent";
export default {
  components: {NavComponent},
  data() {
    return {
      message: "Hello from HomeView"
    }
  },
  methods: {
    deleteToken() {
      localStorage.clear()
      this.$router.push('/');
    }
  }
}


</script>
