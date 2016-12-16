<template>
  <div class="percu">
    <div class="logo"></div>
    <router-link @click="updateOrchestra('cordes')" class="return" to='/orchestre'></router-link>
    <modal class='question' v-show="showModal"  @close="showModal = false">
      <h3 class='question__text' slot="header">Explication</h3>
      <div class='question__answers' slot="body">
        <p>
          Les sons ou les silences durent plus ou moins longtemps. Cette différence de durée s'écrit par un dessin différent pour les différentes
          notes et les différents silences. La ronde (pour les notes) ou la pause (pour les silences) représentent la plus grande durée et servent d'unité.
        </p>
      </div>
      <buttonLink slot="footer" target="/orchestre" text="Retour à l'orchestre"></buttonLink>
    </modal>
    <div class="experience__container">
      <div class="experience__test">
        <noteHero width="1000" height="400"></noteHero>
      </div>
    </div>
    <section class='sidebar'>
      <div class="sidebar__content">
        <h1 class='experience__title'>Les Instruments à Cordes</h1>
        <div class='separator'></div>
        <p class='experience__story'>Alexandre le pianiste relie une dernière fois sa partition avant son prochain concert.</p>
        <p class='experience__story'>Aide le à répéter pour être prêt pour le grand soir.</p>
        <div class='key-note'>&#9834;</div>
        <p class='experience__story experience__story--explanation'>Pour cela appuie sur les touches qui sont associés à chaque note et joue la mélodie !<br> Connais-tu cette musique ?<br><br><br><span v-on:click="showM"><ButtonLink target="none" text="Voir l'explication"></p>
      </div>
    </section>
    <div class="ariane">Les Instruments à cordes</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from '../components/Modal';
import ButtonLink from '../components/ButtonLink';
import NoteHero from '../components/NoteHero';

/* eslint-disable no-undef */
export default {
  name: 'percu',
  components: {
    Modal,
    ButtonLink,
    NoteHero,
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
      this.updateOrchestra('cordes');
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
