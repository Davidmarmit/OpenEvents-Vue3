<template>
  <article class="event_preview">
    <h2>Event</h2>
    <div class="div_img" >
      <img class="ep" :src="this.esdeveniment.image" alt="Event preview image" @error="errorImage()">
      <h3>Name:</h3>
      <h5>{{ this.esdeveniment.name }}</h5>
      <h3>Event description: </h3>
      <h5>{{ this.esdeveniment.description }}</h5>
      <h3>Event creation date: </h3>
      <h5>{{ new Date(this.esdeveniment.date) }}</h5>
      <h3>Event owner id: </h3>
      <h5>{{ this.esdeveniment.owner_id }}</h5>
      <h3>Event location: </h3>
      <h5>{{ this.esdeveniment.location }}</h5>
      <h3>Event start date: </h3>
      <h5>{{ new Date(this.esdeveniment.eventStart_date)  }}</h5>
      <h3>Event end date: </h3>
      <h5>{{ new Date(this.esdeveniment.eventEnd_date) }}</h5>
      <h3>Event maximum participators: </h3>
      <h5>{{ this.esdeveniment.n_participators }}</h5>
      <h3>Event type:</h3>
      <h5>{{ this.esdeveniment.type }}</h5>
    </div>
  </article>
</template>

<script>
export default {
  props:{
    esdeveniment: {
      type: Object,
      required: true
    }
  },
  name: "EventComponent",
  data() {
    return {
    }
  },
  methods: {
    errorImage(){
      console.log("Error loading image");
      document.getElementsByClassName("ep")[0].src = "https://img.freepik.com/free-vector/minimalist-landscape-desert_23-2148269225.jpg?w=1380&t=st=1654606670~exp=1654607270~hmac=57cae80aa529f425b5f8c9faeb547fc30297baff646469e49552289566491357";
    },
  },
}
</script>

<style scoped>
.ep{
  max-width: 300px;
  max-height: 300px;
}
</style>