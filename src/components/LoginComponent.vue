<template>
  <div class="body_signup">
  <div class= "sign-up-form">
    <h1> Sign Up Now</h1>
    <form action="@">
      <input type="email" class ="input-box" placeholder="Your Email">
      <input type="password" class ="input-box" placeholder="Your Password">
      <p><span><input type="checkbox"></span> I agree to the Terms and Services</p>
      <button onclick="location.href = 'home.html';" type="button" class="signUp-btn">Sign Up</button>
      <hr>
      <p class="or">OR</p>
      <button onclick="location.href = 'home.html';" type="button" class="register-btn">Register</button>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  name: "LoginComponent"
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