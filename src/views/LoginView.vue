<!--Vista de login-->
<template>
<!--  Contenidor amb un component propi Login Component-->
  <div class="home">
    <LoginComponent></LoginComponent>
  </div>
</template>

<!--Part de JavaScript-->
<script>
//Importacio de components propis
import LoginComponent from "@/components/LoginComponent";

//Exportació de LoginView
export default {
  name: 'LoginView',
  components: {
    LoginComponent
  }
}
</script>

<style scoped>
</style>