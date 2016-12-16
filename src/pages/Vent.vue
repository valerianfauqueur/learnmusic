<template>
  <div class="vibration">
    <modal class='question' v-show="showModal"  @close="showModal = false">
      <h3 class='question__text' slot="header">Explication</p></h3>
      <div class='question__answers' slot="body">
        <p>
          Un son ne peut pas exister sans matière pour vibrer : aucun son ne se propage dans le vide donc dans l’espace on n’entend pas le son, mais toute matière peut transmettre un son dans l’eau on entend le son mais il est altérer.
        </p>
      </div>
      <buttonLink slot="footer" target="/orchestre" text="Retour à l'orchestre"></buttonLink>
    </modal>
    <div class="logo"></div>
    <router-link  @click="updateOrchestra('wind')" class="return" to='/orchestre'></router-link>
    <div class="experience__container">
      <div class='orchestra'></div>
      <ul class='vibration__nav'>
        <li @click="scrollButton('space')" class="vibration__navItem vibration__navItem--space"></li>
        <li @click="scrollButton('air')" class="vibration__navItem vibration__navItem--orchestra"></li>
        <li @click="scrollButton('water')" class="vibration__navItem vibration__navItem--water"></li>
      </ul>
      <div id='space' class='vibration__space'>
        <div class='earth'></div>
        <div class='decoration satellite'></div>
      </div>
      <div id='air' class='vibration__air'>
        <div class='scroll scroll--top'></div>
        <div class='clouds'>
          <div class="clouds__animation"></div>
        </div>
        <div class='scroll scroll--bottom'></div>
      </div>
      <div id='water' class='vibration__water'>
        <div class='decoration algue--2'></div>
        <div class='decoration algue--1'></div>
        <div class='decoration algue--3'></div>
        <div class='decoration wave--1'></div>
        <div class='decoration wave--2'></div>
        <div class='decoration wave--3'></div>
        <div class='banc__poisson--1'></div>
        <div class='banc__poisson--2'></div>
      </div>
    </div>
    <section class='sidebar'>
      <div class="sidebar__content">
        <h1 class='experience__title'>Les Instruments<br>à vents</h1>
        <div class='separator'></div>
        <p class='experience__story'>Tu te retrouves dans ta salle de concert et tu vois au loin John le trompettiste qui s'entraîne seul sur cette scène.</p>
        <p class='experience__story'>Fait défiler la page vers le haut puis vers le bas pour écouter la propagation du son dans les différents milieux.</p>
        <div class='key-note'>&#9834;</div>
        <p class='experience__story experience__story--explanation'>Demande à ton professeur un casque audio<br><br><br><span v-on:click="showM"><ButtonLink target="none" text="Voir l'explication"></span></p>
      </div>
    </section>
    <div class="ariane">Les Instruments à vent</div>
  </div>
</template>

<script>
import Howler from 'howler';
import { mapActions } from 'vuex';
import Modal from '../components/Modal';
import bellSoundUnderwaterAudio from '../assets/audio/bell/bell_underwater.mp3';
import bellSoundAirAudio from '../assets/audio/bell/bell.mp3';
import ButtonLink from '../components/ButtonLink';

export default {
  /* eslint-disable no-undef */
  name: 'vibration',
  components: {
    ButtonLink,
    Modal,
  },
  data() {
    return {
      showModal: false,
      lastScrollPosition: false,
      oneScreenHeight: window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      minScrollPos: 0,
      maxScrollPos: document.body.scrollHeight - this.oneScreenHeight,
      currentlyScrolling: false,
      currentScrollPos: document.documentElement.scrollTop || document.body.scrollTop,
      sounds: {
        air: new Howl({
          src: [bellSoundAirAudio],
          loop: true,
        }),
        water: new Howl({
          src: [bellSoundUnderwaterAudio],
          loop: true,
        }),
        currentSound: false,
        currentEnv: false,
      },
    };
  },
  methods: {

    ...mapActions([
      'updateOrchestra',
    ]),

    showM() {
      this.showModal = true;
      this.updateOrchestra('wind');
    },

    scrollToAnchor() {
      // Update current scroll positon
      this.currentScrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      this.playMatchingMatSound();
      if (!this.currentlyScrolling && this.lastScrollPosition !== false) {
        this.currentlyScrolling = true;
        const scrollDirection = this.lastScrollPosition - this.currentScrollPos > 0 ? 'up' : 'down';
        // If scroll pos is top of page you can only scroll down
        if (scrollDirection === 'up' && this.currentScrollPos !== this.minScrollPos) {
          this.scrollTo(this.currentScrollPos - this.oneScreenHeight, 'up');
        } else if (scrollDirection === 'down' && this.currentScrollPos !== this.maxScrollPos) {
          this.scrollTo(this.currentScrollPos + this.oneScreenHeight, 'down');
        }
      }
      this.lastScrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    },

    scrollTo(desiredPosition, direction) {
      const self = this;
      const scrollSpeed = 10;
      const scrollRequired = Math.abs(desiredPosition - this.currentScrollPos) / scrollSpeed;
      const timeOfScroll = 1500;
      const timeOff = timeOfScroll / scrollRequired;
      for (let i = 0; i < scrollRequired; i += 1) {
        /* eslint-disable no-loop-func */
        setTimeout(
          () => {
            if (direction === 'down') {
              document.documentElement.scrollTop += scrollSpeed;
              document.body.scrollTop += scrollSpeed;
            } else if (direction === 'up') {
              document.documentElement.scrollTop -= scrollSpeed;
              document.body.scrollTop -= scrollSpeed;
            }
          },
          timeOff * i
        );
        /* eslint-enable no-loop-func */
      }
      setTimeout(() => { this.currentlyScrolling = false; }, timeOfScroll + 10);
    },

    scrollButton(env) {
      this.currentScrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.currentlyScrolling === false) {
        this.currentlyScrolling = true;
        if (this.currentEnv === 'air') {
          if (env === 'water') { this.scrollTo(this.currentScrollPos + this.oneScreenHeight, 'down'); }
          if (env === 'space') { this.scrollTo(this.currentScrollPos - this.oneScreenHeight, 'up'); }
        } else if (this.currentEnv === 'space') {
          if (env === 'air') { this.scrollTo(this.currentScrollPos + this.oneScreenHeight, 'down'); }
          if (env === 'water') { this.scrollTo(this.currentScrollPos + (this.oneScreenHeight * 2), 'down'); }
        } else if (this.currentEnv === 'water') {
          if (env === 'air') { this.scrollTo(this.currentScrollPos - this.oneScreenHeight, 'up'); }
          if (env === 'space') { this.scrollTo(this.currentScrollPos - (this.oneScreenHeight * 2), 'up'); }
        }
      }
    },

    oneScreen() {
      this.oneScreenHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.maxScrollPos = document.body.scrollHeight - this.oneScreenHeight;
    },

    playMatchingMatSound() {
      if (this.currentScrollPos > this.minScrollPos + (this.oneScreenHeight / 2) &&
      this.currentScrollPos < this.maxScrollPos - (this.oneScreenHeight / 2)) {
        this.currentEnv = 'air';
        if (this.lastEnv !== this.currentEnv) {
          this.currentSound.pause();
          const currentSoundPos = this.currentSound.seek();
          this.currentSound = this.sounds.air;
          this.currentSound.seek(currentSoundPos);
          this.currentSound.play();
        }
      } else if (this.currentScrollPos < this.minScrollPos + this.oneScreenHeight) {
        this.currentEnv = 'space';
        if (this.lastEnv !== this.currentEnv) {
          this.currentSound.pause();
        }
      } else if (this.currentScrollPos > this.maxScrollPos - this.oneScreenHeight) {
        this.currentEnv = 'water';
        if (this.lastEnv !== this.currentEnv) {
          this.currentSound.pause();
          const currentSoundPos = this.currentSound.seek();
          this.currentSound = this.sounds.water;
          this.currentSound.seek(currentSoundPos);
          this.currentSound.play();
        }
      }
      this.lastEnv = this.currentEnv;
    },
  },
  mounted() {
    window.addEventListener('resize', this.oneScreen);
    document.addEventListener('scroll', this.scrollToAnchor);
    this.maxScrollPos = document.body.scrollHeight - this.oneScreenHeight;
    this.currentSound = this.sounds.air;
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollToAnchor);
    window.removeEventListener('resize', this.oneScreen);
    this.currentSound.stop();
  },
  /* eslint-enable no-undef */
};
</script>


<style lang="scss" scoped>


.decoration {
  position: absolute;
  background-size: cover;
}
.experience__container {
  width:100%;
}

.vibration__space {
  height:100vh;
  width:100%;
  background-color: black;
  position: relative;
}

.satellite {
  top: 15vh;
  left: 20vw;
  width: 101px;
  height: 84px;
  background-image: url('../assets/img/vibration/satellite-station.png');
}

.earth {
  position: absolute;
  bottom: 0;
  right:0;
  background-image: url('../assets/img/vibration/earth.png');
  width: 40vw;
  height: 29vw;
  background-size: cover;
}

.vibration__air {
  height:100vh;
  width:100%;
  position: relative;
  background-color: #3e3e40;
}

.scroll {
  width: 31px;
  height: 65px;
  position: absolute;
  left: calc(40% - 31px/2);
  background-size: cover;
}

.scroll--bottom {
  bottom:2vh;
  background-image: url('../assets/img/icons/scrolldown.svg');
}

.scroll--top{
  top: 2vh;
  background-image: url('../assets/img/icons/scrollup.svg');
}

.clouds {
  height:40vh;
  width:100%;
  position: absolute;
  top:-20vh;
}

.clouds__animation {
  position: relative;
  height: 100%;
  background-image: url('../assets/img/vibration/clouds1000.png'),
                    url('../assets/img/vibration/clouds1000.png');
  background-repeat: repeat-x;
	animation: wind 30s linear infinite;
  transform: translateZ(0deg);
}

@keyframes wind{
  0% {
    background-position: 0 0px, 400px 25px;
  }

  100% {
    background-position: 1000px 0px, 1400px 25px;
  }
}

.vibration__nav {
  position: fixed;
  left:0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index:3;
}

.vibration__navItem {
  width: 78px;
  height: 78px;
  margin: 2vh 3vw;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
}

.vibration__navItem--space {
  background-image: url('../assets/img/vibration/button-space.png');
}

.vibration__navItem--orchestra {
  background-image: url('../assets/img/vibration/button-trumpet.png');
}

.vibration__navItem--water {
  background-image: url('../assets/img/vibration/button-sea.png');
}

.orchestra  {
  background-image: url('../assets/img/voix/chanteuse.png');
  width:200px;
  height:500px;
  background-size: cover;
  position:fixed;
  top: calc(50vh - 250px);
  left: calc(40% - 100px);
  z-index: 2;
}

.vibration__water {
  height:100vh;
  position: relative;
  background: linear-gradient(45deg, #105376 0%,#4da2ce 100%);
}

.algue--1 {
  bottom:0;
  left: 20vw;
  width: 198px;
  height: 316px;
  background-image: url('../assets/img/vibration/seaweed.png');
}

.algue--2 {
  bottom:0;
  left: 27.5vw;
  width: 162px;
  height: 178px;
  background-image: url('../assets/img/vibration/seaweed2.png');
}

.algue--3 {
  bottom:0;
  left: 80vw;
  width: 218px;
  height: 246px;
  background-image: url('../assets/img/vibration/seaweed1.png');
}

.banc__poisson--1 {
  position: absolute;
  bottom: 30vh;
  right: 10vw;
  width: 20vw;
  height: 20vh;
}

.banc__poisson--2 {
  position: absolute;
  bottom:50vh;
  left: 10vw;
  width: 20vw;
  height: 20vh;
}

.wave--1 {
  top:15vh;
  left:15vw;
  width: 52px;
  height: 43px;
  background-image: url('../assets/img/vibration/sea-waves3.png');
}

.wave--2 {
  bottom:15vh;
  left:15vw;
  width: 52px;
  height: 43px;
  background-image: url('../assets/img/vibration/sea-waves.png');
}

.wave--3 {
  bottom:55vh;
  right:25vw;
  width: 52px;
  height: 43px;
  background-image: url('../assets/img/vibration/sea-waves3.png');
}
</style>
