<template>
  <div class="header">
    <div class="inner_header">
      <div v-on:click="goHome" class="logo_container">
        <h1>Open<span>Events</span></h1>
      </div>
      <div class="nav_desktop">
        <nav class="navigation_bar">
          <router-link to="/home">Home</router-link> |
          <router-link to="/users">Users</router-link> |
          <router-link to="/friends">Friends</router-link> |
          <router-link to="/profile">Profile</router-link>
        </nav>
      </div>
    <div class="nav_mobile">
      <nav class="options">
        <router-link to="/home">Home</router-link> |
        <router-link to="/friends">Friends</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/users">Users</router-link>
      </nav>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "NavComponent",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    goHome() {
      this.$router.push('/home');
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>

<style scoped>

  .nav_mobile {
    display: none;
  }

  @media (max-width: 600px) {
    .nav_desktop {
      display: none;
    }
    .nav_mobile {
      display: block;
    }
  }

  .inner_header{
    width: auto;
    height: 100%;
    display: block;
    margin: 0 auto;
  }
  .header {
    width: 100%;
    height: 80px;
    display: block;
    background-color: #111;
  }
  .logo_container{
    height: 100%;
    display: table;
    float: left;
    margin-left: 20px;
  }
  .logo_container h1{
    color: white;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    font-family: "Montserrat",serif;
    font-size: 32px;
    font-weight: 200;
  }
  .navigation_bar{
    float: right;
  }
  .navigation_bar router-link{
    height: 100%;
    display: table;
    float: left;
    padding: 0 20px;
    color: white;
  }
  .logo_container:hover{
    cursor: pointer;
  }
  router-link:hover{
    color: aqua;
  }
</style>