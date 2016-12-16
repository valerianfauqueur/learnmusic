<template>
  <div class="percu">
    <div class="logo"></div>
    <router-link class="return" to='/orchestre'></router-link>
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
        <soundViz width="1000" height="500"></soundViz>
      </div>
    </div>
    <section class='sidebar'>
      <div class="sidebar__content">
        <h1 class='experience__title'>Les Percussions</h1>
        <div class='separator'></div>
        <p class='experience__story'>Tu vas maintenant pouvoir tester ta voix et voir jusqu’à quelle fréquence tu arrives à aller.</p>
        <div class='key-note'>&#9834;</div>
        <p class='experience__story experience__story--explanation'>Pour cela clique sur le bouton du bas. Puis essaye de siffler de faire le son "n" ou "s" ou encore d'imiter ton professeur.<br> (à tes risque et périls)<br><br><br><span v-on:click="showM"><ButtonLink target="none" text="Voir l'explication"></span></p>
      </div>
    </section>
    <div class="ariane">Les Percussions / Deuxième partie</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from '../components/Modal';
import ButtonLink from '../components/ButtonLink';
import SoundViz from '../components/SoundViz';

/* eslint-disable no-undef */
export default {
  name: 'percu',
  components: {
    Modal,
    ButtonLink,
    SoundViz,
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
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>
