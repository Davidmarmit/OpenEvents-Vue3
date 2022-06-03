<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/events">Events</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <div class="about">
    <h1>This is an about page</h1>
    <HelloWorld msg="This is a message from the about page"/>
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'HomeView',
    components: {
      HelloWorld
    }
  }

</script>
