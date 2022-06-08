<template>
  <div class="profile">
    <h2>Profile</h2>
    <div class="profile-content">
      <h3>Profile Picture:</h3>
      <div class="profile-image">
        <img class="pp_img" :src="user.image" alt="Profile picture" @error="imgError">
      </div>
      <div class="profile-info">
        <h3>User Id:</h3>
        <h5>{{user.id}}</h5>
        <h3>Full Name:</h3>
        <h5>{{user.name + " " + user.last_name}}</h5>
        <h3>Email:</h3>
        <h5>{{user.email}}</h5>
        <h3>Image (URL):</h3>
        <h5 class="pp_image">{{user.image}}</h5>
        <h3>Statistics:</h3>
        <h5 class="stats"></h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      id: "",
      name: "",
      last_name: "",
      email: "",
      password: "",
      image: ""
    }
  },
  name: "UserComponent",
  data(){
    return {
      img_error: false,
      stats: {
        avg_score: "",
        num_comments: "",
        percentage_commenters_below: ""
      }
    }
  },
  methods:{
    imgError(){
      console.log("Error loading image");
      document.getElementsByClassName("pp_img")[0].src = "https://www.w3schools.com/howto/img_avatar.png";
    },
    getStatistics(){
      fetch("http://puigmal.salle.url.edu/api/v2/users/" + this.id + "/statistics", {
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
        this.stats = data[0];
        if(this.stats.avg_score == null){
          this.stats.avg_score = "No data";
        }
        if(this.stats.num_comments == null){
          this.stats.num_comments = "No data";
        }
        if(this.stats.percentage_commenters_below == null){
          this.stats.percentage_commenters_below = "No data";
        }
        document.getElementsByClassName("stats")[0].innerHTML = "Average score: " + this.stats.avg_score + " | " + "Number of comments: " + this.stats.num_comments + " | " + "Percentage of commenters below: " + this.stats.percentage_commenters_below + "%";
        //console.log(data[0]);
      })
      .catch(error => {
        console.log(error);
        alert("Error contacting with the main API. Check connection.");
      });
    }
  },
  mounted(){
    this.getStatistics();
  }
}
</script>

<style scoped>
.pp_img{
  max-width: 300px;
  max-height: 300px;
}
</style>