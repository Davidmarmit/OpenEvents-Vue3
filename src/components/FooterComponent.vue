<template>
  <footer>
  <div class="footer-content">
    <h3>Open Events</h3>
    <p>Open Events is your new way of communicating with your friends and manage all of your social events.</p>
    <div class="shortcuts">
      <p class="clickable" v-on:click="this.$router.push('/home')">Events</p>
      <p class="clickable" v-on:click="this.$router.push('/friends')">Friends</p>
      <p class="clickable" v-on:click="this.$router.push('/profile')">Profile</p>
    </div>
    <!--<ul class="socials">
      <li><a href="#"><i class="fa fa-fb"></i></a></li>
      <li><a href="#"><i class="fab fa-twitter"></i></a></li>
      <li><a href="#"><i class="fab fa-instagram"></i></a></li>
    </ul>-->
  </div>

  <div class="footer-bottom">
    <p>copyright &copy;2022 OpenEvents 2.0. designed by <span>DM & IH</span></p>
  </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>
.clickable{
  cursor: pointer;
}
footer{
  margin-top: auto;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  background:#111;
  height: auto;
  width: 100vw;
  font-family: "Montserrat";
  padding-top: 40px;
  color: #fff;
}
.shortcuts{
  display: inline-block;
}
.footer-content{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.footer-content h3{
  font-size: 1.8rem;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 3rem;
}

.footer-content p{
  max-width: 500px;
  margin: 10px auto;
  line-height: 28px;
  font-size: 14px;
}

.socials{
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 3rem;
}
.socials li{
  margin: 0 10px;
}
.socials a{
  text-decoration: none;
  color: #fff;
}

.socials a i{
  font-size: 1.1rem;
  transition: color .4s ease;
}

.socials a:hover i {
  color: aqua;
}

.footer-bottom{
  background: #000;
  width: 100vw;
  padding: 20px 0;
  text-align: center;
}

.footer-bottom p{
  font-size: 14px;
  word-spacing: 2px;
  text-transform: capitalize;
}
.footer-bottom span{
  text-transform: uppercase;
  opacity: .8;
  font-weight: 200;
}
</style>