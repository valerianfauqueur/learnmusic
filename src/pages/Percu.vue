<template>
  <div class="percu">
    <div class="logo"></div>
    <router-link @click="updateOrchestra('percu')" class="return" to='/orchestre'></router-link>
    <modal class='question' v-show="showModal"  @close="showModal = false">
      <h3 class='question__text' slot="header">Explication</h3>
      <div class='question__answers' slot="body">
        <p>
          La fréquence d'un son correspond à sa hauteur : à une fréquence faible correspond un son grave, à une fréquence élevée un son aigu. La cloche petite produit une fréquence forte donc un son aigu une cloche plus grosse produira un son plus grave car sa fréquence sera plus faible.<br><br>
          L'oreille humaine moyenne ne perçoit les sons que dans une certaine plage de fréquences située environ entre 20 Hz (en dessous les sons sont qualifiés d'infrasons) et 20 kHz, soit 20 000 Hz (au-delà les sons sont qualifiés d'ultrasons).<br><br>
          Les ultrasons peuvent être perçus par des animaux comme le chien (jusqu'à 35 kHz), chauve-souris ou le dauphin peuvent (jusqu'à 100 kHz). Les infrasons peuvent être perçus par les éléphants, avec lesquels ils communiquent entre eux à plusieurs kilomètres de distance.<br><br>
        </p>
      </div>
      <buttonLink slot="footer" target="/orchestre" text="Retour à l'orchestre"></buttonLink>
    </modal>
    <div class="experience__container">
      <div class="experience__test">
        <div class='experience__sound cloche--1' @click="playSound(0)"><img src="../assets/img/percu/alarm.png"></div>
        <div class='experience__sound cloche--2' @click="playSound(3)"><img src="../assets/img/percu/alarm.png"></div>
        <div class='experience__sound cloche--3' @click="playSound(6)"><img src="../assets/img/percu/alarm.png"></div>
        <div class='experience__sound cloche--4' @click="playSound(9)"><img src="../assets/img/percu/alarm.png"></div>
      </div>
      <div class="experience__over">
        <ButtonLink target="/percussions/2" text="Passer au test"></ButtonLink>
      </div>
    </div>
    <section class='sidebar'>
      <div class="sidebar__content">
        <h1 class='experience__title'>Les Percussions</h1>
        <div class='separator'></div>
        <p class='experience__story'>Maintenant que tu as réussis à convaincre Caroline était plus puissante qu’un orchestre. Tu vas pouvoir tester la tienne et voir jusqu’à quelle fréquence tu arrives à aller.</p>
        <div class='key-note'>&#9834;</div>
        <p class='experience__story experience__story--explanation'>Pour cela test les différentes cloches et écoutes leur différents sons, dès que tu as terminé appuye sur le bouton “passer au test”<br><br><br><span v-on:click="showM"><ButtonLink target="none" text="Voir l'explication"></span></p>
      </div>
    </section>
    <div class="ariane">Les Percussions / Première partie</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Tone from 'tone';
import Modal from '../components/Modal';
import ButtonLink from '../components/ButtonLink';
import bellSoundAirAudio from '../assets/audio/bell/bell.mp3';

/* eslint-disable no-undef */
export default {
  name: 'percu',
  components: {
    Modal,
    ButtonLink,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    /* eslint-disable consistent-return */
    ...mapActions([
      'updateOrchestra',
    ]),
    showM() {
      this.showModal = true;
      this.updateOrchestra('percu');
    },
    playSound(attack) {
      const bellSampler = new Tone.Sampler(
        bellSoundAirAudio,
        () => {
          bellSampler.triggerAttack(attack);
        }
      ).toMaster();
    },
  },
};
</script>

<style lang="scss" scoped>
.percu {
  background: linear-gradient(45deg,  #3f3838 0%,#3e4147 100%);
}
.experience__container {
  width:80%;
  height:100vh;
  display: flex;
  flex-direction: column;
}
.experience__test {
  width:100%;
  height: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}


.cloche--1 img {
  width: 15vw;
  height: 18vw;
}

.cloche--2 img{
  width: 13vw;
  height: 15vw;
}

.cloche--3 img{
  width: 10vw;
  height: 11.5vw;
}

.cloche--4 img{
  width: 7vw;
  height: 8vw;
}

</style>
