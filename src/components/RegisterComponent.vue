<template>
  <div class="body_signup">
    <div class= "sign-up-form">
      <h1> Sign Up Now</h1>
      <form >
        <input type="text" class ="input-box" placeholder="Name" v-model="input.name">
        <input type="text" class ="input-box" placeholder="Last Name" v-model="input.last_name">
        <input type="email" class ="input-box" placeholder="Email" v-model="input.email">
        <input type="password" class ="input-box" placeholder="Password" v-model="input.password">
        <input type="url" class ="input-box" placeholder="Image URL" v-model="input.image">
        <br><br>
        <button v-on:click="register" type="button" class="signUp-btn">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterComponent",
  data() {
    return {
      input: {
        name: "",
        last_name: "",
        email: "",
        password: "",
        image: ""
      }
    }
  },
  methods:{
    register(){
      if(this.input.name !== "" && this.input.last_name !== "" && this.input.email !== "" && this.input.password !== "" && this.input.image !== "") {
        fetch("http://puigmal.salle.url.edu/api/v2/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.input.name,
            last_name: this.input.last_name,
            email: this.input.email,
            password: this.input.password,
            image: this.input.image
          })
        })
        .then(response => {
          console.log("response");
          if (response.status === 200) {
            this.$router.push("/login")
            return response.json()
          } else {
            alert("Error Registering, check fields for errors.\nMaybe the user already exists?");
          }
        })
        .catch(error => {
          console.log(error);
          alert("Error contacting with the main API. Check connection.");
        });
      }
    }
  }
}
</script>

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