<template>
  <NavComponent></NavComponent>

  <UserComponent :user="user"></UserComponent>
  <div class="buttons">
    <button class="friend_request" @click="deleteToken">Logout</button>
    <button class="delete" @click="deleteAccount">Delete Account</button>
  </div>

  <footer-component>

  </footer-component>
</template>

<script>
import NavComponent from "@/components/NavComponent";
import FooterComponent from "@/components/FooterComponent";
import UserComponent from "@/components/UserComponent";
export default {
  name: "ProfileView",
  components: {NavComponent, FooterComponent, UserComponent},
  data(){
    return {
      user: {
        id: "",
        name: "",
        last_name: "",
        email: "",
        password: "",
        image: ""
      },
      img_error: false
    }
  },
  methods: {
    getUser(){
      fetch("http://puigmal.salle.url.edu/api/v2/users/" + localStorage.getItem("userid"), {
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
      })
    },
    deleteToken() {
      localStorage.clear()
      this.$router.push('/');
    },
    deleteAccount() {

       if (confirm("Press a button!") === true) {
        fetch("http://puigmal.salle.url.edu/api/v2/users/" + localStorage.getItem("userid"), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.deleteToken();
            } else {
              console.log("Error deleting user. Request status: " + response.status);
            }
          })
       }
    }
  },
  beforeMount() {
    this.getUser();
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
  .delete:hover{
    cursor: pointer;
  }
  .delete{
    background-color: #F44336;
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
</style>