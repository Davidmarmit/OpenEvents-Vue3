<template>
  <nav-component></nav-component>
  <div class="event_viewer">
    <EventComponent :esdeveniment="event"></EventComponent>
  </div>
  <button class="join_event" v-on:click="joinEvent()">Join</button>
  <footer-component></footer-component>
</template>

<script>
import NavComponent from "@/components/NavComponent";
import FooterComponent from "@/components/FooterComponent";
import EventComponent from "@/components/EventComponent";
export default {
  name: "EventView",
  components: {
    NavComponent,
    FooterComponent,
    EventComponent
  },
  data() {
    return {
      type: this.$route.params.type,
      id: this.$route.params.id,
      event: {
        id: "",
        name: "",
        owner_id: "",
        date: "",
        image: "",
        location: "",
        description: "",
        eventStart_date: "",
        eventEnd_date: "",
        n_participators: "",
        slug: "",
        type: ""
      }
    }
  },
  methods: {
    checkInfo() {
      console.log(this.type + " with id " + this.id);
    },
    getEventInfo() {
      if (this.type !== undefined || this.id !== undefined) {
        fetch("http://puigmal.salle.url.edu/api/v2/events/" + this.id, {
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
          this.event = data[0];
          console.log(this.event);
        })
      }else{
        alert("You should not access this page directly.\nAfter this message, press back button.");
      }
    },
    joinEvent(){
      if(document.getElementsByClassName("join_event")[0].innerHTML === "Join") {
        fetch("http://puigmal.salle.url.edu/api/v2/events/" + this.id + "/assistances", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data);
          document.getElementsByClassName("join_event")[0].innerHTML = "Joined";
          document.getElementsByClassName("join_event")[0].style.backgroundColor = "#FF0000";
        })
      }else if (document.getElementsByClassName("join_event")[0].innerHTML === "Joined"){
        fetch("http://puigmal.salle.url.edu/api/v2/events/" + this.id + "/assistances", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data);
          document.getElementsByClassName("join_event")[0].innerHTML = "Join";
          document.getElementsByClassName("join_event")[0].style.backgroundColor = "#04AA6D";
        })
      }
    },
    checkIfJoined(){
      fetch("http://puigmal.salle.url.edu/api/v2/events/" + this.id + "/assistances", {
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
        console.log(data);
        for(let i = 0; i < data.length; i++){
          //console.log("Comparing " + data[i].id + " and " + localStorage.getItem("userid"));
          if(data[i].id == localStorage.getItem("userid")){
            console.log("Joined");
            document.getElementsByClassName("join_event")[0].innerHTML = "Joined";
            document.getElementsByClassName("join_event")[0].style.backgroundColor = "#FF0000";
          }
        }
      })
    }
  },
  mounted(){
    this.checkInfo();
    this.getEventInfo();
    this.checkIfJoined();
  }
}
</script>

<style scoped>
.join_event{
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
.join_event:hover{
  cursor: pointer;
}
</style>