<template>
  <div v-if="getToken()">
    <div class="body_signup">
    <div class= "sign-up-form">
      <h1> Sign Up Now</h1>
      <form>
        <input type="email" class ="input-box" placeholder="Your Email" v-model="input.email">
        <input type="password" class ="input-box" placeholder="Your Password" v-model="input.password">
        <br><br>
        <button v-on:click="login" type="button" class="signUp-btn">Sign Up</button>
        <hr><br>
        <button v-on:click="register" type="button" class="register-btn">Register</button>
      </form>
    </div>
    </div>
  </div>
  <div v-else>
    <h2>You are already logged in. Redirecting.</h2>
    <meta http-equiv="refresh" content="1; url=http://localhost:8080/#/home">
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      input: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      if(this.input.email !== "" && this.input.password !== "") {
        fetch("http://puigmal.salle.url.edu/api/v2/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.input.email,
            password: this.input.password
          })
        })
        .then(response =>{
          if(response.status === 200) {
            return response.json()
          }else{
            alert("Wrong email or password");
          }
        })
        .then(data => {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("email", this.input.email);
          console.log("token = " + localStorage.getItem("token"));
          this.$router.push("/home");
        })
      }
    },
    register(){
      this.$router.push("/register");
    },
    goHome(){
      this.$router.push("/home");
    },
    getToken(){
      let tok = localStorage.getItem("token");
      if(tok !== null) {
        console.log("Token isn't null");
        return false;
      }else{
        console.log("Token is null");
        return true;
      }
    }

  }
}
</script>
<link href="https://fonts.googleapis.com/css?family=Montserrat:100" rel="stylesheet">

<style scoped>
  .body_signup{
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    font-family: "Montserrat";
    background-size: auto;
    background-position: left;
  }

  .sign-up-form{
    width: 300px;
    box-shadow: 0 0 3px 0 rgba(0, 0 , 0, 3);
    background: black;
    padding: 20px;
    margin: 8% auto 0;
    text-align: center;

  }

  .sign-up-form h1{
    color: aqua;
    margin-bottom: 30px;
  }

  .input-box{
    border-radius: 20px;
    padding: 10px;
    margin: 10px 0;
    width: 80%;
    border: 1px solid #999;
    outline: none;
    transition: 0.25s;
    text-align: center;
  }

  .input-box:focus{
    width: 280px;
    border-color: aqua;
  }

  button{
    color: #fff;
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    font-size: 15px;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .signUp-btn{
    background-color: aqua;
  }

  .register-btn{
    background-color: aqua;
  }

  hr{
    margin-top: 20px;
    color: aqua;
  }

  p{
    color: aqua;
  }
</style>