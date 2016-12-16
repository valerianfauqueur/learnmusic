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
        <buttonLink target="/orchestre" text="Commencer l'expérience" class="valign__content btn"></buttonLink>
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

<style lang="scss">
@import '../css/reset.css';
@font-face {
	font-family: 'Didot';
	src: url('../assets/fonts/hinted-Didot.eot');
	src: local('Didot'),
		url('../assets/fonts/hinted-Didot.eot?#iefix') format('embedded-opentype'),
		url('../assets/fonts/hinted-Didot.woff') format('woff'),
		url('../assets/fonts/hinted-Didot.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}
.logo {
  position: fixed;
  left: 2vw;
  top: 1vw;
  background-image: url('../assets/img/logo.png');
  background-size: cover;
  width: 139px;
  height: 41px;
  z-index: 5;
}

.return {
  position: fixed;
  left: 2vw;
  top: 4vw;
  background-color: black;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 10;

  &:after {
    content:'Retour à l\'orchestre';
    position: absolute;
    top:3vw;
    left:-30%;
    text-align: center;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: bold;
  }
}

.sidebar{
  position: fixed;
  top:0;
  right:0;
  height: 100vh;
  width:20%;
  z-index:99999;
  background-color: rgba(0,0,0,0.25);
}
.sidebar__content {
  display: flex;
  flex-direction: column;
  height:100%;
  width:100%;
  align-items: center;
}
.experience__title {
  display: flex;
  justify-content: center;
  font-family: 'Didot', Helvetica, Arial, sans-serif;
  font-size: 48px;
  margin-top: 3vh;
  color:#e0c6ab;
  position: relative;
  text-align: center;
  &:before {
    content:'';
    position: absolute;
    bottom: -4vh;
    border: 1px solid rgba(255,255,255,0.1);;
    width:70%;
    left:50%;
    transform: translateX(-50%);
  }
}
.experience__story {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width:90%;
  margin-top:5vh;
  text-align: justify;
  color: #E3E2E2;
  font-size: 18px;
  line-height: 1.5;
}
.experience__story--explanation {
  text-align: center;
  color: #e0c6ab;
  font-weight: bold;
}
.key-note {
  font-size: 48px;
  color: #e0c6ab;
  margin: 2vh 0;
}
.experience__figure {
  display: flex;
  justify-content: center;
  width:75%;
  height:40%;
}
.experience__figure img{
  width:100%;
  height:100%;
}
.ariane {
  position: fixed;
  bottom:0;
  left:0;
  width:80%;
  display: flex;
  align-items: center;
  padding-left:1vw;
  text-transform: uppercase;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: bold;
  color:#E3E2E2;
  font-size: 14px;
  height:1.5vw;
  background-color: rgba(0,0,0,0.25);
}

.question__text {
  display: flex;
  justify-content: center;
  font-size: 24px;
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: bold;
  color:white;
}

.question__answers {
  display: flex;
  justify-content: center;
  font-size: 16px;
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color:white;
}
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
