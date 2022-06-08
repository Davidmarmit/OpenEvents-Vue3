<template>
  <nav-component></nav-component>
  <UserComponent :user="user"></UserComponent>
  <div class="buttons">
    <button class="friend_request" v-on:click="friendRequest()">Send Friend Request</button>
  </div>
  <footer-component></footer-component>
</template>

<script>
import UserComponent from "@/components/UserComponent";
import NavComponent from "@/components/NavComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  name: "UserView",
  components: {UserComponent, NavComponent, FooterComponent},
  data() {
    return {
      type: this.$route.params.type,
      id: this.$route.params.id,
      user: {
        id: "",
        name: "",
        last_name: "",
        email: "",
        password: "",
        image: ""
      }
    }
  },
  methods: {
    checkInfo() {
      console.log(this.type + " with id " + this.id);
    },
    getUserInfo() {
      if (this.type !== undefined || this.id !== undefined) {
        fetch("http://puigmal.salle.url.edu/api/v2/users/" + this.id, {
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
          //console.log(data[0]);
          this.user = data[0];
          if(this.user.id == localStorage.getItem("userid")){
            document.querySelector(".friend_request").style.display = "none";
          }
        })
      }else{
        alert("You should not access this page directly.\nAfter this message, press back button.");
      }
    },
    friendRequest() {
      fetch("http://puigmal.salle.url.edu/api/v2/friends/" + this.user.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
      .then(response => {
        if(response.status == 201) {
          alert("Friend request sent!");
          return response.json()
        }
        else if(response.status == 400) {
          alert("You already sent a friend request to this user!");
        }else{
          alert("Couldn't send friend request! Try again later.");
        }
      })
    }
  },
  mounted(){
    this.checkInfo();
    this.getUserInfo();
  }
}
</script>

<style scoped>
  .friend_request{
    background-color: #04AA6D;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 12px;
  }
  .friend_request:hover{
    cursor: pointer;
  }
</style>