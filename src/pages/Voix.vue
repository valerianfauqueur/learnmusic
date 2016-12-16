<template>
  <div class="voix">
    <div class="logo"></div>
    <router-link @click="updateOrchestra('sing')" class="return" to='/orchestre'></router-link>
    <modal class='question' v-show="showModal"  @close="showModal = false">
      <h3 class='question__text' slot="header"><p>La réponse était : <span class="green">Des vibrations</span></p></h3>
      <div class='question__answers' slot="body">
        <p>
          On peut provoquer des vibrations dans l'air en frottant ou en pinçant les cordes d'une guitare ou en chantant, en faisant vibrer ses cordes vocales.<br><br>
          Pour bien distinguer la vibration, on peut aussi faire vibrer une règle sur le rebord d'une table. Ces sons produits par oscillation (mouvement de l'objet qui vibre) sont reconnus par notre cerveau comme des bruits.<br><br>
          Plus généralement, toute situation où de l'énergie est transmise au milieu ambiant produit une vibration, donc un son.<br><br>
        </p>
      </div>
      <buttonLink slot="footer" target="/orchestre" text="Retour à l'orchestre"></buttonLink>
    </modal>
    <div class="experience__container">
      <div class="experience__test">
        <div class="experience__violin">
          <div class="audio__player">
            <div class="playpause" v-on:click="playPause('violin')"></div>
            <div class="seek__bar"></div>
          </div>
        </div>
        <div class="experience__voice">
          <div class="audio__player">
            <div class="playpause" v-on:click="playPause('voice')"></div>
            <div class="seek__bar"></div>
          </div>
        </div>
      </div>
      <div class="experience__answers">
        <quizz answers='[{ "txt": "Des vibrations", "isTrue": true, "selected": false }, { "txt": "Rien du tout", "isTrue": false, "selected": false },{ "txt": "Des hoquettements", "isTrue": false, "selected": false}]'></quizz>
      </div>
      <div class="experience__answersValidate">
        <div v-on:click="showM">
          <buttonLink target="none" text="Valider la réponse"></buttonLink>
        </div>
      </div>
    </div>
    <section class='sidebar'>
      <div class="sidebar__content">
        <h1 class='experience__title'>La Voix</h1>
        <div class='separator'></div>
        <p class='experience__story'>Tu viens de retrouver <span class='ctn-bold'>Caroline</span>, la cantatrice de ton orchestre en pleurs dans sa loge. Elle n’arrive pas à retrouver sa voix.</p>
        <p class='experience__story'>Aide <span class='ctn-bold'>Caroline</span>, à comprendre pourquoi sa voix est plus forte que celle d’un orchestre tout entier.</p>
        <div class='key-note'>&#9834;</div>
        <p class='experience__story experience__story--explanation'>Pour cela compare la voix de <span class='ctn-bold'>Caroline</span>, et celle de l’orchestre <br />Que remarques-tu ?</p>
      </div>
    </section>
    <div class="ariane">La Voix</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Modal from '../components/Modal';
import Quizz from '../components/Quizz';
import ButtonLink from '../components/ButtonLink';
import bellSoundUnderwaterAudio from '../assets/audio/bell/bell_underwater.mp3';
import bellSoundAirAudio from '../assets/audio/bell/bell.mp3';

/* eslint-disable no-undef */
export default {
  name: 'home',
  components: {
    Modal,
    Quizz,
    ButtonLink,
  },
  data() {
    return {
      showModal: false,
      player: {
        voice: {
          audio: new Howl({
            src: [bellSoundUnderwaterAudio],
            loop: true,
          }),
        },
        violin: {
          audio: new Howl({
            src: [bellSoundAirAudio],
            loop: true,
          }),
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      showAnswer: 'showAnswer',
    }),
  },
  methods: {
    /* eslint-disable consistent-return */
    ...mapMutations([
      'updateShowAnswer',
    ]),
    ...mapActions([
      'updateOrchestra',
    ]),
    showM() {
      this.showModal = true;
      this.updateOrchestra('sing');
    },
    tick(type) {
      /* eslint-disable prefer-template */
      if (type === 'voice') {
        console.log(this.player.voice.seekbar);
        this.player.voice.seekbar.style =
        'width: ' + parseInt((this.player.voice.audio.seek() / this.player.voice.audio.duration()) * 100, 10) + '%;';
      } else if (type === 'violin') {
        this.player.violin.seekbar.width =
        'width: ' + parseInt((this.player.violin.audio.seek() / this.player.violin.audio.duration()) * 100, 10) + '%;';
      }
    },
    playPause(type) {
      const self = this;
      if (type === 'voice') {
        if (this.player.voice.audio.playing() === false) {
          this.player.voice.audio.play();
          this.player.voice.playing = setInterval(() => { self.tick('voice'); }, 100);
        } else {
          clearInterval(this.player.voice.playing);
          this.player.voice.audio.pause();
        }
      } else if (type === 'violin') {
        if (this.player.violin.audio.playing() === false) {
          this.player.violin.audio.play();
          this.player.violin.playing = setInterval(() => { self.tick('violin'); }, 100);
        } else {
          clearInterval(this.player.violin.playing);
          this.player.violin.audio.pause();
        }
      }
    },
  },
  mounted() {
    this.player.voice.seekbar = document.querySelector('.experience__voice .audio__player .seek__bar');
    this.player.violin.seekbar = document.querySelector('.experience__violin .audio__player .seek__bar');
  },
};
</script>

<style lang="scss" scoped>
.voix {
  height:100vh;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg,  #3f3838 0%,#3e4147 100%);
  overflow: hidden;
}

.experience__container {
  height: 100vh;
  width:80%;
  position: absolute;
  left:0;
}

.experience__test {
  width:100%;
  height:80%;
  display: flex;
  align-items: flex-start;
}

.experience__violin {
  width: 50%;
  height: 100%;
  background-image: url('../assets/img/voix/violon.png');
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  &:before {
    content: "";
    position: absolute;
    right:-0.5px;
    top: 50%;
    transform: translateY(-50%);
    height: 90%;
    border: 1px solid rgba(255,255,255,0.1);
  }
}
.experience__voice {
  width: 50%;
  height: 100%;
  background-image: url('../assets/img/voix/singerhead.png');
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.experience__answers {
  height: 10%;
  width: 100%;
}

.experience__answersValidate {
  height: 10%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-top:1vh;
  justify-content: center;
}

.green {
  color: #a7ff8d;
}

.audio__player {
  border: 3px solid white;
  border-radius: 20px;
  width:30%;
  height:2vh;
  position: absolute;
  bottom:12vh;
}

.seek__bar {
  position: absolute;
  left:-2px;
  top:-0.3vh;
  width:0%;
  background-color: white;
  height:2vh;
  border-radius: 20px;
}

.playpause {
  position: absolute;
  top:-10vh;
  width: 200px;
  height:50px;
  background-color: white;
  border-radius: 20px;
}

</style>
