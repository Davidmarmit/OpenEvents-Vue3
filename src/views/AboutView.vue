<template>
  <nav-component></nav-component>
  <div class="about">
    <h1>This is an about page</h1>
    <HelloWorld msg="This is a message from the about page"/>
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'
  import NavComponent from "@/components/NavComponent";

  export default {
    name: 'HomeView',
    components: {
      NavComponent,
      HelloWorld
    }
  }

</script>
