<template>
  <nav-component></nav-component>
  <h2>Users</h2>
  <br>
  <div class="search_container">
    <input type="text" id="search_input" placeholder="Search for events...">
    <button id="search_button" v-on:click="search()">Search</button>
  </div>
  <h3>Users:</h3>
  <article class="event_preview" v-for="(e,index) in listed_users" v-bind:key="e">
    <div class="div_img" >
      <img class="ep" :src="e.image" alt="Event preview image" @error="errorImage(index)">
      <h4>{{e.name}} {{e.last_name}}</h4>
    </div>
    <div class="button_div">
      <button class="show_more" v-on:click="showUser(index)">Show Profile</button>
    </div>
  </article>
  <footer-component></footer-component>
</template>

<script>
import NavComponent from "@/components/NavComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  name: "UsersView",
  components: {FooterComponent, NavComponent},
  data(){
    return {
      users: [],
      listed_users: [],
    }
  },
  methods:{
    getUsers(){
      fetch("http://puigmal.salle.url.edu/api/v2/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.users = data;
        this.listed_users = this.users;
        //console.log(this.users);
      })
    },
    errorImage(index){
      console.log("Error loading image");
      document.getElementsByClassName("ep")[index].src = "https://www.w3schools.com/howto/img_avatar.png";
    },
    search(){
      this.listed_users = this.users.filter(u => {
        let fullname = u.name + " " + u.last_name;
        return fullname.toLowerCase().includes(document.getElementById("search_input").value.toLowerCase())
      });
      if(document.getElementById("search_input").value === "") {
        this.listed_users = this.users;
      }
    },
    showUser(index){
      this.$router.push({
        path: '/userviewer',
        name: 'userviewer',
        params: {
          type: "user",
          id: this.listed_users[index].id
        }
      });
    }
  },
  beforeMount() {
    this.getUsers();
  }
}
</script>

<style scoped>
.div_img{
  height: 180px;
}
.event_preview{
  display: inline-grid;
  width: 150px;
  height: 250px;
  margin-bottom: 50px;
}
.ep{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
}
.button_div{

  position: relative;
  bottom: 0;
}
.show_more{
  align-self: end;
  background-color: #00bcd4;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  cursor: pointer;
}
</style>