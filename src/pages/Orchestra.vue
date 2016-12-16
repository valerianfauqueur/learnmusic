<template>
  <div class="orchestra">
    <modal class='question' v-show="showModal"  @close="showModal = false">
      <h3 class='question__text' slot="header">Tu n'as pas encore débloqué cette partie</h3>
      <div slot="footer" @click="showModal = false">
        <buttonLink target="none" text="Fermer"></buttonLink>
      </div>
    </modal>
    <div class="orchestra__gameDesc">
      <transition name="fade">
        <div v-if="welcomeMsg" class="orchestra__gameDescItem">
          <h2 class="orchestra__title" style="color:#e0c6ab;">Bienvenue à l'Orchestre <br> Musicalia</h2>
          <p class="orchestra__desc" style="font-size:18px; font-weight:300; margin-top:1vh;">
            Parcours les différentes catégories d'instruments pour pouvoir<br>rassembler ton orchestre pour le concert de ce soir
          </p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showGame.sing" class="orchestra__gameDescItem">
          <h2 class="orchestra__title">La Voix</h2>
          <div class="orchestra__gameStatus">{{ orchestra.sing.show ? 'Déjà retrouvé' : 'Non retrouvé'}}</div>
          <p class="orchestra__desc">
            Tu viens de retrouver caroline, la cantatrice de ton orchestre en pleurs dans sa loge.<br>
            Elle a le track et a peur qu’on ne l’entende plus.
          </p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showGame.wind" class="orchestra__gameDescItem">
          <h2 class="orchestra__title">Les Instruments<br> à vent</h2>
          <div class="orchestra__gameStatus">{{ orchestra.wind.show ? 'Déjà retrouvé' : 'Non retrouvés'}}</div>
          <p class="orchestra__desc">
            Tu te retrouves dans ta salle de concert et tu vois au loin John le trompettiste qui s'entraîne seul sur cette scène.
          </p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showGame.percu" class="orchestra__gameDescItem">
          <h2 class="orchestra__title">Les Percussions</h2>
          <div class="orchestra__gameStatus">{{ orchestra.percu.show  ? 'Déjà retrouvé' : 'Non retrouvés'}}</div>
          <p class="orchestra__desc">
            Maintenant que tu as réussis à convaincre Caroline était plus puissante qu’un orchestre.<br>
            Tu vas pouvoir tester la tienne et voir jusqu’à quelle fréquence tu arrives à aller.
          </p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showGame.cordes" class="orchestra__gameDescItem">
          <h2 class="orchestra__title">Les Instruments<br> à cordes</h2>
          <div class="orchestra__gameStatus">{{ orchestra.cordes.show ? 'Déjà retrouvé' : 'Non retrouvés'}}</div>
          <p class="orchestra__desc">
            Alexandre le pianiste relie une dernière fois sa partition avant son prochain concert.<br>
            Aide le à répéter pour être prés pour le grand soir.
          </p>
        </div>
      </transition>
    </div>
    <div class="orchestra__container">
      <div v-show="orchestra.cordes.show" class="orchestra__cordes"></div>
      <div v-show="orchestra.percu.show" class="orchestra__percu"></div>
      <div v-show="orchestra.sing.show" class="orchestra__sing"></div>
      <div v-show="orchestra.wind.show" class="orchestra__wind"></div>
      <div class="orchestra__chef"></div>
    </div>
    <div class="orchestra__tuto">
      Clique sur un bouton pour partir à la recherche <br> des musiciens manquants
    </div>
    <ul class="orchestra__nav">
      <li class="orchestra__navItem"><div v-on:mouseenter="updateDescMsg('sing')" @click="checkRoute('sing')" class="orchestra__navItemButton" v-bind:class="buttonClass1"></div></li>
      <li class="orchestra__navItem"><div v-on:mouseenter="updateDescMsg('wind')" @click="checkRoute('wind')" class="orchestra__navItemButton" v-bind:class="buttonClass2"></div></li>
      <li class="orchestra__navItem"><div v-on:mouseenter="updateDescMsg('percu')" @click="checkRoute('percu')" class="orchestra__navItemButton" v-bind:class="buttonClass3"></div></li>
      <li class="orchestra__navItem"><div v-on:mouseenter="updateDescMsg('cordes')" @click="checkRoute('cordes')" class="orchestra__navItemButton" v-bind:class="buttonClass4"></div></li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapGetters, mapActions } from 'vuex';
import Modal from '../components/Modal';
import ButtonLink from '../components/ButtonLink';

export default {
  name: 'orchestra',
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    Modal,
    ButtonLink,
  },
  computed: {
    ...mapGetters({
      orchestra: 'orchestra',
      showGame: 'showGame',
      welcomeMsg: 'welcomeMsg',
    }),

    buttonClass1() {
      return {
        'orchestra__navItemButton--game1': !this.orchestra.sing.locked,
        'orchestra__navItemButton--game1--locked': this.orchestra.sing.locked,
      };
    },
    buttonClass2() {
      return {
        'orchestra__navItemButton--game2': !this.orchestra.wind.locked,
        'orchestra__navItemButton--game2--locked': this.orchestra.wind.locked,
      };
    },
    buttonClass3() {
      return {
        'orchestra__navItemButton--game3': !this.orchestra.percu.locked,
        'orchestra__navItemButton--game3--locked': this.orchestra.percu.locked,
      };
    },
    buttonClass4() {
      return {
        'orchestra__navItemButton--game4': !this.orchestra.cordes.locked,
        'orchestra__navItemButton--game4--locked': this.orchestra.cordes.locked,
      };
    },
  },
  methods: {
    ...mapActions([
      'updateDescMsg',
    ]),

    checkRoute(type) {
      switch (type) {
        case 'cordes':
          if (this.orchestra.cordes.locked) {
            this.showModal = true;
          } else {
            this.$router.replace('/cordes');
          }
          break;
        case 'percu':
          if (this.orchestra.percu.locked) {
            this.showModal = true;
          } else {
            this.$router.replace('/percussions');
          }
          break;
        case 'sing':
          if (this.orchestra.sing.locked) {
            this.showModal = true;
          } else {
            this.$router.replace('/voix');
          }
          break;
        case 'wind':
          if (this.orchestra.wind.locked) {
            this.showModal = true;
          } else {
            this.$router.replace('/vent');
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.orchestra {
  width:100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #5b4d4d;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.orchestra__gameDesc {
  position: absolute;
  top: 5vh;
  display: flex;
  justify-content: center;
  z-index: 5;
}

.orchestra__gameDescItem {
  position: fixed;
}

.orchestra__title {
  color:#7D6B6B;
  font-family: 'Didot', Helvetica, Arial, sans-serif;
  font-size: 72px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.orchestra__gameStatus {
  margin-top: 1.2vh;
  margin-bottom: 4vh;
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  color: white;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  letter-spacing: 2px;
  background-color: #5b4d4d;
  &:before {
    content:'';
    position: absolute;
    bottom: -10px;
    left:10%;
    border-bottom: 3px solid #E3E2E2;
    width: 80%;
  }
}

.orchestra__desc {
  text-align: center;
  color: white;
  font-size: 17px;
  color: #E3E2E2;
  font-weight: 400;
  display: flex;
  justify-content: center;
    background-color: #5b4d4d;
}

.fade-enter-active, .fade-leave-active {
  transition: all ease 0.2s;
}
.fade-enter-active {
  transition-delay: 0.2s;
}

.fade-leave-active {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-enter {
  opacity: 0;
  transform: translateX(50px);
}

.orchestra__container {
  position: relative;
  height: 17vw;
  width: 71vw;
  margin-top: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/img/orchestra/scene.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.orchestra__cordes {
  width: 100%;
  height: calc(100% + 9vw);
  background-image: url('../assets/img/orchestra/scene-instacorde.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: -9.5vw;
  left: -2vw;
  z-index: 2;

}

.orchestra__sing {
  width: 100%;
  height: calc(100% + 9vw);
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('../assets/img/orchestra/scene-chanteuse.png');
  position: absolute;
  top: -10vw;
  left: -4vw;
  z-index: 2;
}

.orchestra__wind {
  width: 100%;
  height: calc(100% + 9vw);
  background-repeat: no-repeat;
  background-image: url('../assets/img/orchestra/scene-instavent.png');
  background-size: cover;
  position: absolute;
  top: -9vw;
  left: -3vw;
}

.orchestra__percu {
  width: 100%;
  height: calc(100% + 9vw);
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('../assets/img/orchestra/scene-percu.png');
  position: absolute;
  top: -9vw;
  left: -3vw;
}

.orchestra__chef {
  width: 6.5vw;
  height: 13vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('../assets/img/orchestra/orchestrachef.png');
  position: absolute;
  bottom: 1vw;
  left: calc(50% - (8vw/2));
  z-index: 3;

  &::before {
    width:100%;
    height: 2vw;
    content:'';
    background-color: rgba(0,0,0,0.1);
    position: absolute;
    bottom: -1vw;
    left:0.3vw;
    z-index: 1;
    border-radius: 50%;
  }
}

.orchestra__tuto {
  font-size: 18px;
  color: #7D6B6B;
  position: relative;
  top: 5vh;
  text-align: center;
}

.orchestra__nav {
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 5vh;
}

.orchestra__navItemButton {
  width: 7vw;
  height: 7vw;
  margin: 0 1.5vw;
  background-size: cover;
  cursor: pointer;
}

.orchestra__navItemButton--game1 {
  background-image: url('../assets/img/orchestra/icon-chanteuse.png');
}
.orchestra__navItemButton--game2 {
  background-image: url('../assets/img/orchestra/icon-vent.png');
}
.orchestra__navItemButton--game3 {
  background-image: url('../assets/img/orchestra/icon-percu.png');
}
.orchestra__navItemButton--game4 {
  background-image: url('../assets/img/orchestra/icon-corde.png');
}

.orchestra__navItemButton--game1--locked {
  background-image: url('../assets/img/orchestra/locked-icon-chanteuse.png');
}
.orchestra__navItemButton--game2--locked {
  background-image: url('../assets/img/orchestra/locked-icon-vent.png');
}
.orchestra__navItemButton--game3--locked {
  background-image: url('../assets/img/orchestra/locked-icon-percu.png');
}
.orchestra__navItemButton--game4--locked {
  background-image: url('../assets/img/orchestra/locked-icon-corde.png');
}

</style>
