<template>
  <nav-component></nav-component>
  <h2>Friends</h2>
  <ul class="friends">
    <li v-for="(u,index) in users" v-bind:key="u.id">
      <div class="friend_container" v-if="u.id !== null">
        <img v-on:click="showUserInfoFriends(index)" class="pp" :src="u.image" alt="{{u.name}}'s Profile Picture" @error="setDefaultProfilePicture(index-1)">
        <div v-on:click="showUserInfoFriends(index)" class="friend_info">
          <h3>{{u.name}} {{u.last_name}}</h3>
          <br>
        </div>
        <button class="removeFriend" @click="removeFriend(u.id)">Remove Friend</button>
      </div>
    </li>
  </ul>
  <hr>
  <h2>Pending Requests</h2>
  <ul class="friend_requests_ul">
    <li v-for="(u,index) in friend_requests" v-bind:key="u.id">
      <div class="friend_container" v-if="u.id !== null">
        <img v-on:click="showUserInfoRequests(index)" class="pp" :src="u.image" alt="{{u.name}} 's Profile picture" @error="setDefaultProfilePicture(index)">
        <div v-on:click="showUserInfoRequests(index)" class="friend_info">
          <h3>{{u.name}} {{u.last_name}}</h3>
          <button class="acceptFriend" @click="acceptFriend(u.id)">Accept Friend</button>
          <button class="declineFriend" @click="declineFriend(u.id)">Decline Friend</button>
          <br>
        </div>
      </div>
    </li>
  </ul>
  <footer-component></footer-component>
</template>

<script>
import NavComponent from "@/components/NavComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  name: "FriendsView",
  components: {
    NavComponent,
    FooterComponent
  },
  data() {
    return {
      users:[],
      listedUsers: [],
      friend_requests: []
    }
  },
  methods:{
    showUserInfoFriends(index){
      this.$router.push({
        path: '/userviewer',
        name: 'userviewer',
        params: {
          type: "user",
          id: this.users[index].id
        }
      });
    },
    showUserInfoRequests(index){
      this.$router.push({
        path: '/userviewer',
        name: 'userviewer',
        params: {
          type: "user",
          id: this.friend_requests[index].id
        }
      });
    },
    setDefaultProfilePicture(index){
      //console.log(index)
      document.getElementsByClassName("pp")[index].src = "https://www.w3schools.com/howto/img_avatar.png";
    },
    getUsers(){
      fetch("http://puigmal.salle.url.edu/api/v2/users/" + localStorage.getItem("userid") + "/friends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        if(response.status === 200) {
          return response.json()
        }else{
          console.log("Error getting users information on Friends page. Request status: " + response.status);
          return response.json()
        }
      })
      .then(data => {
        this.users = data;
        //console.log(this.users);
      })
      .catch(error => {
        console.log(error);
        alert("Error contacting with the main API. Check connection.");
      });
    },
    getFriendRequests(){
      fetch("http://puigmal.salle.url.edu/api/v2/friends/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        if(response.status === 200) {
          return response.json()
        }else{
          console.log("Error getting users information on Friends page. Request status: " + response.status);
          return response.json()
        }
      })
      .then(data => {
        this.friend_requests = data;
        //console.log(this.friend_requests);
      })
    },
    removeFriend(id){
      alert("Can't remove friends, API is not ready yet for that. You're stuck with user " + id + " forever. :)");
    },
    acceptFriend(id){
      fetch("http://puigmal.salle.url.edu/api/v2/friends/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        if(response.status === 200) {
          this.getUsers();
          this.getFriendRequests();
        }else{
          console.log("Error accepting friend. Request status: " + response.status);
        }
      })
    },
    declineFriend(id){
      fetch("http://puigmal.salle.url.edu/api/v2/friends/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        if(response.status === 200) {
          this.getUsers();
          this.getFriendRequests();
        }else{
          console.log("Error declining friend. Request status: " + response.status);
        }
      })
    }
  },
  beforeMount() {
    this.getUsers();
    this.getFriendRequests();
  },
}
</script>

<style scoped>
  .acceptFriend{
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 10px;
  }

  .declineFriend{
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .removeFriend{
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .pp{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  li{
    width: fit-content;
    display: inline-grid;
  }
  ul{
    padding: 0;
    list-style-type: none;
    margin: 0 auto;
  }
  .friend_container{
    margin: 20px;
    cursor: pointer;
  }

</style>