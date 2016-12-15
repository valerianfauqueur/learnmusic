<template>
  <div id="home">
    <section class='ctn-home'>
      <div class="navbar">
        <img src="../assets/img/logo.png">
      </div>
      <div class="bg-castle">
      </div>
      <div class="ctn-info">
        Bienvenue sur Orchestra,<br>
        Ce soir vous dirigez un orchestre.
      </div>
      <div class='btn-spec'>
        <buttonLink target="/orchestre" class="valign__content btn"></buttonLink>
      </div>
      <div class="ctn-inter">
        <img src="../assets/img/icons/headphone.png">
        Pour une meilleur expérience l'utilisation d'un casque <br /> est fortement recommandé
      </div>
    </section>
  </div>
</template>

<script>
import ButtonLink from '../components/ButtonLink';

export default {
  name: 'home',
  components: {
    ButtonLink,
  },
};
</script>

<style>
  @import '../css/reset.css';
</style>

<style lang="scss" scoped>

.ctn-home{
  width:100%;
  height:100%;
  position: absolute;
  background: linear-gradient(45deg, #332d2d 0%,#675757 100%);
}
.navbar{
  display:flex;
  justify-content:space-between;
  padding:20px;
}
.navbar a{
  position:relative;
  margin-top:7px;
  font-family:Montserrat;
  font-size:17px;
  color:#fff;
  text-transform:capitalize;
  text-decoration:none;
  list-style-type:none;
}
.bg-castle{
  background-image:url('../assets/img/palais-garnier.png');
  width:100%;
  height:100%;
  margin-top:-80px;
  z-index:0;
  position:absolute;
  background-repeat:no-repeat;
  background-position:center center;
  background-size:auto;
}
.ctn-info{
  opacity:1;
  color:#d8cfbc;
  font-family:Didot;
  font-size:1.9em;
  text-align:center;
  margin:auto;
  padding:120px;
}
.ctn-inter{
  display:flex;
  align-items:center;
  flex-direction:row-reverse;
  justify-content:space-between;
  flex-flow:column-reverse;
  padding:20px;
  justify-content:center;
  color:#6a6060;
  font-size:0.8em;
  text-align:center;
  font-family:Montserrat;
}

.valign {
    font-size: 0
}
.valign:before {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle
}
.valign .valign__content {
    vertical-align: middle;
    display: inline-block
}

</style>
