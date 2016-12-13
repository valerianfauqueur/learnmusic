<template>
  <div class="vibration">
    <div class='orchestra'></div>
    <div id='space' class='vibration__space'></div>
    <div id='air' class='vibration__air'>
      <div class='scroll scroll--top'></div>
      <div class='clouds'>
        <div class="clouds__animation"></div>
      </div>
      <div class='scroll scroll--bottom'></div>
    </div>
    <div id='water' class='vibration__water'>
        <div class='waves'>
          <div class="wave wave_1"></div>
          <div class="wave wave_2"></div>
          <div class="wave wave_3"></div>
          <div class="wave wave_4"></div>
          <div class="wave wave_5"></div>
        </div>
    </div>
  </div>
</template>

<script>
import Howler from 'howler';
import bellSoundUnderwaterAudio from '../assets/audio/bell/bell_underwater.mp3';
import bellSoundAirAudio from '../assets/audio/bell/bell.mp3';

export default {
  /* eslint-disable no-undef */
  name: 'vibration',
  data() {
    return {
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
          this.currentSound.stop();
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

.vibration__space {
  height:105vh;
  width:100%;
  background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="246" height="2000" viewBox="0 0 246 2000"><path fill-rule="evenodd" clip-rule="evenodd" fill="#000" d="M0 2000c50.43 0 72.57-20.522 123-20.522 50.43 0 71.34 20.522 123 20.522V0H0v2000z"/></svg>');
  background-position:bottom left;
  background-repeat-y: no-repeat;
}

.vibration__air {
  height:90vh;
  width:100%;
  position: relative;
}

.scroll {
  width: 31px;
  height: 65px;
  position: absolute;
  left: calc(50% - 31px/2);
  background-size: cover;
}

.scroll--bottom {
  bottom:0;
  background-image: url('../assets/img/icons/scrolldown.svg');
}

.scroll--top{
  top: 0;
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
  background-image: url('../assets/img/clouds1000.png'),
                    url('../assets/img/clouds1000.png');
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


.orchestra  {
  background-color: yellow;
  width:200px;
  height:200px;
  position:fixed;
  top: calc(50vh - 100px);
  left: calc(50% - 100px);
}

.waves
{
	width:100%;
	height:105vh;
  min-height:10em;
  overflow: hidden;
  position: relative;
}

.wave
{
	width:calc( 100% + 4em );
	height:100%;
	position:absolute;
	left:-2em;
	background:bottom center repeat-x;
	animation-iteration-count:infinite;
	animation-timing-function:linear;
}

/* Individual wave layers */

.wave_1
{
  animation-name:wave_1;
  animation-duration:3400ms;
  animation-delay:-1200ms;
  top:1.0em;
  z-index:1;
  opacity:0.1;
  background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="246" height="2000" viewBox="0 0 246 2000"><path transform="rotate(-180 123,999.5)" fill-rule="evenodd" clip-rule="evenodd" fill="#153C65" d="M0 2000c50.43 0 72.57-20.522 123-20.522 50.43 0 71.34 20.522 123 20.522V0H0v2000z"/></svg>');
  background-position:top left;
}

.wave_2
{
  animation-name:wave_2;
  animation-duration:3200ms;
  animation-delay:-600ms;
  top:2.0em;
  z-index:2;
  opacity:0.2;
  background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="307" height="2000" viewBox="0 0 185 2000"><path transform="rotate(-180 123,999.5)" fill-rule="evenodd" clip-rule="evenodd" fill="#153C65" d="M0 0h307v2000c-64.47 0-90.563-25.623-153.5-25.623C90.565 1974.377 62.935 2000 0 2000V0z"/></svg>');
  background-position:top right;
}

.wave_3
{
  animation-name:wave_3;
  animation-duration:2800ms;
  animation-delay:-2400ms;
  top:3.0em;
  z-index:3;
  opacity:0.3;
  background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="384" height="2000" viewBox="0 0 108 2000"><path transform="rotate(-180 123,999.5)" fill-rule="evenodd" clip-rule="evenodd" fill="#153C65" d="M0 0h384v2000c-80.64 0-113.28-32.047-192-32.047S78.72 2000 0 2000V0z"/></svg>');
  background-position:top center;
}

.wave_4
{
  animation-name:wave_4;
  animation-duration:2600ms;
  animation-delay:-1800ms;
  top:4.0em;
  z-index:4;
  opacity:0.5;
  background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="2000" viewBox="0 0 12 2000"><path transform="rotate(-180 123,999.5)" fill-rule="evenodd" clip-rule="evenodd" fill="#153C65" d="M480 2000c-100.8 0-141.6-39.892-240-39.892S98.4 2000 0 2000V0h480v2000z"/></svg>');
  background-position:top left;
}

.wave_5
{
  animation-name:wave_5;
  animation-duration:3000ms;
  animation-delay:-3000ms;
  top:5.0em;
  z-index:5;
  opacity:0.75;
  background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="2000" viewBox="0 0 12 2000"><path transform="rotate(-180 123,999.5)" fill-rule="evenodd" clip-rule="evenodd" fill="#153C65" d="M480 2000c-100.8 0-141.6-39.892-240-39.892S98.4 2000 0 2000V0h480v2000z"/></svg>');
  background-position:top right;
}

/* Wave animations */

@keyframes wave_1
{
	from { transform: rotate(0deg)   translatey(-0.61em) rotate(0deg)    ; }
	to   { transform: rotate(360deg) translatey(-0.61em) rotate(-360deg) ; }
}

@keyframes wave_2
{
	from { transform: rotate(0deg)   translatey(-0.77em) rotate(0deg)    ; }
	to   { transform: rotate(360deg) translatey(-0.77em) rotate(-360deg) ; }
}

@keyframes wave_3
{
	from { transform: rotate(0deg)   translatey(-0.96em) rotate(0deg)    ; }
	to   { transform: rotate(360deg) translatey(-0.96em) rotate(-360deg) ; }
}

@keyframes wave_4
{
	from { transform: rotate(0deg)   translatey(-1.2em) rotate(0deg)    ; }
	to   { transform: rotate(360deg) translatey(-1.2em) rotate(-360deg) ; }
}

@keyframes wave_5
{
	from { transform: rotate(0deg)   translatey(-1.5em) rotate(0deg)    ; }
	to   { transform: rotate(360deg) translatey(-1.5em) rotate(-360deg) ; }
}
</style>
