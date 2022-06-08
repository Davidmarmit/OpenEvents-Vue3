<!--Template, indiquem a vue que executi la funció getIdentity quan es carrega la pagina -->
<template onload="getIdentity()">
<!--  Component propi NavComponent, que conté tota la navegació de la web -->
  <nav-component></nav-component>
  <h2>Home</h2>
  <br>
<!--  Contenido amb la barra de cerca i el boto de cercar -->
  <div class="search_container">
    <input type="text" id="search_input" placeholder="Search for events...">
    <button id="search_button" v-on:click="search()">Search</button>
  </div>
  <h3>Events:</h3>
<!--  Article que conté la imatge i el nom de l'esdeveniment. S'utilitza un v-for per mostrar tots els esdeveniments disponibles -->
  <article class="event_preview" v-for="(e,index) in listed_events" v-bind:key="e">
    <div class="div_img" >
<!--      Imatge de l'esdeveniment, si hi ha algun error a l'hora de mostrar la imatge, es crida la funció errorImage passant la posicio-->
      <img class="ep" :src="e.image" alt="Event preview image" @error="errorImage(index)">
      <h4>{{e.name}}</h4>
    </div>
<!--    Contenidor amb el boto de mostrar més-->
    <div class="button_div">
      <button class="show_more" v-on:click="showEvent(index)">Show more</button>
    </div>
  </article>
<!--  Component propi amb el footer-->
  <footer-component></footer-component>
</template>

<style scoped>
  /*Codi d'estil de la Pagina d'Inici.*/
  .div_img{
    height: 180px;
  }
  /*Forçem un tamany per cada esdeveniment*/
  .event_preview{
    display: inline-grid;
    width: 150px;
    height: 250px;
    margin-bottom: 50px;
  }
  /*Forçem un tamany per cada fotografia, i la convertim en foto rodona*/
  .ep{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 10px;
  }
  /*Codi css per el contenidor del boto de mostrar mes*/
  .button_div{
    position: relative;
    bottom: 0;
  }
  /*Codi css per el boto de mostrar més*/
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
//Importacio de components propis
import NavComponent from "@/components/NavComponent";
import FooterComponent from "@/components/FooterComponent";

//Exportació de HomeView
export default {
  components: {FooterComponent, NavComponent},
  //Definim les dades usades
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
  //Definim els metodes emprats
  methods: {
    //Fucnió que obté la indentitat de l'usuari una vegada ha estat carregada la pagina despres del login
    getIdentity() {
      this.user.email = localStorage.getItem("email");
      //Fem una petició a la api per obtenir la informació de l'usuari
      fetch("http://puigmal.salle.url.edu/api/v2/users/search?s=" + this.user.email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      //Si la petició es correcta, obtenim la informació de l'usuari
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
    //Funcio que obté tots els esdeveniments disponibles
    getEvents(){
      //Fem una petició a la api per obtenir tots els esdeveniments disponibles
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
        //console.log(this.events);
      })
      .catch(error => {
        console.log(error);
        alert("Error contacting with the main API. Check connection.");
      });
    },
    //Funcio per corregir els errors de les imatges a l'hora de mostrar-les.
    errorImage(index){
      console.log("Error loading image");
      document.getElementsByClassName("ep")[index].src = "https://img.freepik.com/free-vector/minimalist-landscape-desert_23-2148269225.jpg?w=1380&t=st=1654606670~exp=1654607270~hmac=57cae80aa529f425b5f8c9faeb547fc30297baff646469e49552289566491357";
    },
    //Funcio que s'encarrega de mostrar els esdeveniments buscats per l'usuari
    search(){
      //Filtrem els esdeveniments per el nom i/o localització. Si compleixen el criteri, es fitrarà i s'afegeria dins la llista d'esdeveniments filtrats
      this.listed_events = this.events.filter(event => {
        return event.name.toLowerCase().includes(document.getElementById("search_input").value.toLowerCase()) || event.location.toLowerCase().includes(document.getElementById("search_input").value.toLowerCase())
      });
      if(document.getElementById("search_input").value === "") {
        this.listed_events = this.events;
      }
    },
    //Funció que mostra els esdeveniments més detallats, enviant el id de l'esdeveniment seleccionat a una vista nova
    showEvent(index){
      //console.log("Show event " + index + " " + this.listed_events[index].name);
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
  //Funcions que s'executaran abans de muntar la vista
  beforeMount() {
    this.getIdentity();
    this.getEvents();
  }
}


</script>
