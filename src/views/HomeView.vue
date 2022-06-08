<template onload="getIdentity()">
  <nav-component></nav-component>
  <h2>Home</h2>
  <br>
  <div class="search_container">
    <input type="text" id="search_input" placeholder="Search for events...">
    <button id="search_button" v-on:click="search()">Search</button>
  </div>
  <h3>Events:</h3>
  <article class="event_preview" v-for="(e,index) in listed_events" v-bind:key="e">
    <div class="div_img" >
      <img class="ep" :src="e.image" alt="Event preview image" @error="errorImage(index)">
      <h4>{{e.name}}</h4>
    </div>
    <div class="button_div">
      <button class="show_more" v-on:click="showEvent(index)">Show more</button>
    </div>
  </article>
  <footer-component></footer-component>
</template>

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

<script>
import NavComponent from "@/components/NavComponent";
import FooterComponent from "@/components/FooterComponent";

export default {
  components: {FooterComponent, NavComponent},
  data() {
    return {
      user: {
        id: "",
        name: "",
        last_name: "",
        email: "",
        image: ""
      },
      events: [],
      listed_events: [],
    }
  },
  methods: {
    getIdentity() {
      this.user.email = localStorage.getItem("email");
      fetch("http://puigmal.salle.url.edu/api/v2/users/search?s=" + this.user.email, {
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
          console.log("Error getting user information on home page. Request status: " + response.status);
          return response.json()
        }
      })
      .then(data => {
        this.user = data[0];
        //console.log(this.user.name + " " + this.user.last_name + " | " + this.user.email + " | " + this.user.image + " " + this.user.id);
        localStorage.setItem("userid", this.user.id);
      })
    },
    getEvents(){
      fetch("http://puigmal.salle.url.edu/api/v2/events", {
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
          console.log("Error getting events information on home page. Request status: " + response.status);
          return response.json()
        }
      })
      .then(data => {
        this.events = data;
        this.listed_events = this.events;
        console.log(this.events);
      })
      .catch(error => {
        console.log(error);
        alert("Error contacting with the main API. Check connection.");
      });
    },
    errorImage(index){
      console.log("Error loading image");
      document.getElementsByClassName("ep")[index].src = "https://img.freepik.com/free-vector/minimalist-landscape-desert_23-2148269225.jpg?w=1380&t=st=1654606670~exp=1654607270~hmac=57cae80aa529f425b5f8c9faeb547fc30297baff646469e49552289566491357";
    },
    search(){
      this.listed_events = this.events.filter(event => {
        return event.name.toLowerCase().includes(document.getElementById("search_input").value.toLowerCase()) || event.location.toLowerCase().includes(document.getElementById("search_input").value.toLowerCase())
      });
      if(document.getElementById("search_input").value === "") {
        this.listed_events = this.events;
      }
    },
    showEvent(index){
      console.log("Show event " + index + " " + this.listed_events[index].name);
      this.$router.push({
        path: "/eventviewer",
        name: "eventviewer",
        params: {
          type: "event",
          id: this.listed_events[index].id
        }
      });
    }
  },
  beforeMount() {
    this.getIdentity();
    this.getEvents();
  }
}


</script>
