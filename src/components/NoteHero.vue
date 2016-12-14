<template>
  <div class='noteHero'>
    <canvas v-bind:width="width"  v-bind:height="height"></canvas>
    <div class='controls'>
      <div class='controls__button controls__button--a' v-bind:class="{'controls__button--active': controls.a}">A</div>
      <div class='controls__button controls__button--z' v-bind:class="{'controls__button--active': controls.z}">Z</div>
      <div class='controls__button controls__button--e' v-bind:class="{'controls__button--active': controls.e}">E</div>
      <div class='controls__button controls__button--r' v-bind:class="{'controls__button--active': controls.r}">R</div>
    </div>
    <div class='start'>
      <div class='controls__button controls__button--start' @mousedown="mouseStart" @mouseup="controls.start = false" v-bind:class="{'controls__button--active': controls.start}">
        {{ status === 'waiting' ? 'Commencer' : 'Recommencer'}}
      </div>
    </div>
  </div>
</template>

<script>
import Howler from 'howler';
import gameAudio from '../assets/audio/notehero/notehero.mp3';

export default {
  /* eslint-disable no-undef */
  name: 'noteHero',
  props: ['width', 'height'],
  data() {
    return {
      controls: {
        a: false,
        z: false,
        e: false,
        r: false,
        start: false,
      },
      status: 'waiting',
      audio: new Howl({
        src: [gameAudio],
        onend: this.gameOver,
      }),
      life: 100,
      offsetTop: 100,
      indicatorBaseColor: 'black',
      lines: [],
      notes: [],
      lineParams: {
        width: 2,
        color: 'black',
        number: 5,
      },
      gameParams: {
        speed: 100,
        fps: 60,
      },
      noteParams: {
        strokeWidth: 10,
        elipse: {
          size: {
            x: 35,
            y: 21,
          },
          angle: -10,
        },
      },
    };
  },
  methods: {

    mouseStart() {
      this.controls.start = true;
      if (this.status !== 'playing') {
        this.game();
        this.audio.play();
        this.status = 'playing';
      } else if (this.status === 'playing') {
        window.cancelAnimationFrame(this.gameH);
        this.clear();
        this.audio.stop();
        this.reset();
        this.audio.play();
        this.game();
      }
    },

    reset() {
      this.clear();
      this.lines = [];
      this.notes = [];
      this.indicator = {};
      this.life = 100;
      this.createLines();
      this.createIndicator();
      this.drawBackground();
    },

    initKeyboardEv() {
      document.addEventListener('keydown', this.keyEv);
      document.addEventListener('keyup', this.keyEv);
    },

    removeKeyboardEv() {
      document.removeEventListener('keydown', this.keyEv);
      document.removeEventListener('keyup', this.keyEv);
    },

    keyEv(e) {
      switch (e.keyCode) {
        case 65:
          this.controls.a = e.type === 'keydown';
          this.checkCollision(1);
          break;
        case 90:
          this.controls.z = e.type === 'keydown';
          this.checkCollision(2);
          break;
        case 69:
          this.controls.e = e.type === 'keydown';
          this.checkCollision(3);
          break;
        case 82:
          this.controls.r = e.type === 'keydown';
          this.checkCollision(4);
          break;
        case 32:
          this.mouseStart(e);
          if (e.type === 'keyup') {
            this.controls.start = false;
          }
          break;
        default:
          break;
      }

      this.lastKey = e.keyCode;
    },

    checkCollision(line) {
      const result = [];
      for (let i = 0, l = this.notes.length; i < l; i += 1) {
        if (this.notes[i].line === line && this.collide(this.indicator, this.notes[i])) {
          result.push('hi');
          this.notes[i].hitted = true;
          switch (line) {
            case 1:
              this.indicator.color = '#e9e895';
              break;
            case 2:
              this.indicator.color = '#f18989';
              break;
            case 3:
              this.indicator.color = '#80c7ec';
              break;
            case 4:
              this.indicator.color = '#a8eea6';
              break;
            default:
              return;
          }
        }
      }
      if (result.length === 0) {
        this.indicator.color = this.indicatorBaseColor;
        this.life -= 5;
      }
    },

    drawLifeBar() {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'black';
      this.ctx.strokeRect(
        1, this.offsetTop - 40, (this.ctxW / 5), 20
      );
      this.ctx.fillStyle = 'black';
      const lifePercentLeft = this.life / 100;
      this.ctx.fillRect(
        2, this.offsetTop - 40, (this.ctxW / 5) * lifePercentLeft, 20
      );
    },

    initBase() {
      this.canvas = document.querySelector('.noteHero canvas');
      this.ctxW = this.canvas.width;
      this.ctxH = this.canvas.height - this.offsetTop;
      this.ctx = this.canvas.getContext('2d');

      this.createLines();
      this.createIndicator();
      this.drawBackground();
    },

    collide(source, target) {
      const leftTargetSide = target.x - target.elipse.size.x;
      if (leftTargetSide < source.x + source.width && leftTargetSide > source.x) {
        return true;
      }
      if (target.x + target.width > source.x &&
        leftTargetSide + target.width < source.x + source.width) {
        return true;
      }
      if (target.x + target.width > source.x + source.width && leftTargetSide < source.x) {
        return true;
      }
      return false;
    },

    createNote(type, line, time = 0) {
      /* eslint-disable prefer-const */
      let note = {
        type,
        time,
        elipse: {
          size: {
            x: this.noteParams.elipse.size.x,
            y: this.noteParams.elipse.size.y,
          },
          angle: this.noteParams.elipse.angle,
        },
        tail: {
          size: 0,
        },
        strokeWidth: this.noteParams.strokeWidth,
        line,
        hitted: false,
        checked: false,
      };
      /* eslint-enable prefer-const */
      if (type === 'multi') {
        note.tail.size = time * this.gameParams.speed;
        note.width = note.elipse.size.x + note.tail.size;
      } else {
        note.width = note.elipse.size.x;
      }

      switch (line) {
        case 1:
          note.color = '#e9e895';
          break;
        case 2:
          note.color = '#f18989';
          break;
        case 3:
          note.color = '#80c7ec';
          break;
        case 4:
          note.color = '#a8eea6';
          break;

        default:
          break;
      }

      /* eslint-disable max-len */
      note.y = ((((this.ctxH / (this.lineParams.number - 1)) - (this.lineParams.width / (this.lineParams.number - 1))) * line) - (note.elipse.size.y * 1.5)) + this.offsetTop;
      /* eslint-enable max-len */
      note.x = this.ctxW + note.width;
      const tooClose = this.checkCloseNotes();
      if (!tooClose) {
        this.notes.push(note);
      }
    },

    checkCloseNotes() {
      for (let i = 0; i < this.notes.length; i += 1) {
        if (this.notes[i].x + this.notes[i].width + 200 > 1200) {
          return true;
        }
      }
      return false;
    },

    updateNotes() {
      // create new random notes
      if (this.rand(1, 100) === 100) {
        if (this.rand(1, 100) > 20) {
          const rand = this.rand(1, 4);
          this.createNote('single', rand);
        } else {
          this.createNote('multi', this.rand(1, 3), this.rand(1, 4));
        }
      }

      for (let i = 0, l = this.notes.length; i < l; i += 1) {
        this.notes[i].x -= (this.gameParams.speed / this.gameParams.fps);
        this.drawNote(this.notes[i]);
      }
      // destroy notes which are not visible
      this.checkNotes();
    },

    checkNotes() {
      for (let i = 0; i < this.notes.length; i += 1) {
        if (this.notes[i].x + this.notes[i].width < this.indicator.x &&
          this.notes[i].hitted === false && this.notes[i].checked === false) {
          this.notes[i].checked = true;
          this.life -= 5;
        }
        if (this.notes[i].x + this.notes.width < -100) {
          this.notes.splice(i, 1);
        }
      }
    },

    drawNote(note) {
      this.ctx.beginPath();
      /* eslint-disable max-len */
      this.ctx.ellipse(
        note.x, note.y, note.elipse.size.x, note.elipse.size.y, note.elipse.angle * (Math.PI / 180), 0, 2 * Math.PI
      );
      this.ctx.closePath();
      if (note.type === 'single') {
        this.ctx.fillStyle = note.color;
        this.ctx.fill();
        this.ctx.fillRect(
          (note.x + note.elipse.size.x) - 12, note.y - 157, 12, 150
        );
      } else if (note.type === 'multi') {
        this.ctx.lineWidth = note.strokeWidth;
        this.ctx.strokeStyle = note.color;
        this.ctx.stroke();
        this.ctx.fillStyle = note.color;
        this.ctx.fillRect(
          (note.x + note.elipse.size.x) - (note.strokeWidth / 2) - 2, note.y - 157, 12, 150
        );
        this.ctx.fillRect(
          ((note.x + note.elipse.size.x) - (note.strokeWidth / 2)), (note.y - note.elipse.size.y) + 6, note.tail.size, 30
        );
      }
      /* eslint-enable max-len */
    },

    rand(min, max) {
      return Math.floor(Math.random() * max) + min;
    },

    drawBackground() {
      this.drawLines();
      this.drawIndicator();
    },

    createIndicator() {
      this.indicator = {
        width: this.ctxW / 20,
        height: this.ctxH,
        x: this.ctxW / 20,
        y: 0 + this.offsetTop,
        color: this.indicatorBaseColor,
      };
    },

    drawIndicator() {
      if (this.controls.a || this.controls.z || this.controls.e || this.controls.r) {
        this.ctx.fillStyle = this.indicator.color;
      } else {
        this.indicator.color = this.indicatorBaseColor;
        this.ctx.fillStyle = this.indicatorBaseColor;
      }
      this.ctx.fillRect(
        this.indicator.x, this.indicator.y, this.indicator.width, this.indicator.height
      );
    },

    createLines() {
      for (let i = 0, l = this.lineParams.number; i < l; i += 1) {
        this.lines.push({
          width: this.ctxW,
          height: this.lineParams.width,
          x: 0,
          y: (((this.ctxH / (l - 1)) - (this.lineParams.width / (l - 1))) * i) + this.offsetTop,
          color: this.lineParams.color,
        });
      }
    },

    drawLines() {
      for (let i = 0, l = this.lines.length; i < l; i += 1) {
        this.ctx.fillStyle = this.lines[i].color;
        this.ctx.fillRect(
          this.lines[i].x, this.lines[i].y, this.lines[i].width, this.lines[i].height
        );
      }
    },

    clear() {
      this.ctx.clearRect(0, 0, this.ctxW, this.ctxH + this.offsetTop);
    },

    game() {
      this.clear();
      this.gameH = window.requestAnimationFrame(this.game);
      this.drawBackground();
      this.updateNotes();
      this.drawLifeBar();
      if (this.life <= 0) {
        this.gameOver();
      }
    },

    gameOver() {
      this.audio.stop();
      window.cancelAnimationFrame(this.gameH);
      this.clear();
      if (this.life > 0) {
        this.drawEndMessage(['Bravo !', 'Tu as gagné', 'Score: 1206']);
      } else {
        this.drawEndMessage(['Dommage', 'Tu as perdu', 'Réessaye en cliquant sur le bouton Recommencer']);
      }
    },

    drawEndMessage(msg) {
      this.fillStyle = 'black';
      this.ctx.fillRect(0, this.offsetTop, this.ctxW, this.ctxH);
      this.ctx.font = '30px Arial';
      for (let offset = -1, l = msg.length, i = 0; i < l; i += 1, offset += 1) {
        const textSize = this.ctx.measureText(msg[i]).width;
        const quarterOfLine = parseInt(this.ctx.font, 10) / 4;
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(
          msg[i],
          (this.ctxW / 2) - (textSize / 2),
          ((this.ctxH / 2) + this.offsetTop) + ((offset * 20) + (i * 20))
        );
      }
    },
  },
  mounted() {
    this.initBase();
    this.initKeyboardEv();
    document.querySelector('.noteHero').style = `width: ${this.ctxW}px`;
  },

  beforeDestroy() {
    this.removeKeyboardEv();
    this.audio.stop();
    window.cancelAnimationFrame(this.gameH);
  },
};
</script>

<style lang="scss" scoped>
.noteHero {
  position: relative;
}

.controls {
  width: calc(1200px / 20);
  height: calc(100% - 100px);
  position: absolute;
  top: 100px;
  left: -70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.controls__button {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid black;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 24px;
  position: relative;
  background-color: #fff;
  transition: 0.1s ease all;

  &::before {
    content:"";
    position: absolute;
    bottom: -15px;
    width:  calc(100% + 6px);
    height: 100%;
    border-bottom: 3px solid black;
    border-left: 3px solid black;
    border-right: 3px solid black;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: 0.1s ease all;
  }

  &--active {
    transform: translateY(5px);

    &::before {
      transform: translateY(-5px);
    }
  }
}

.controls__button--a {
  color: #e9e895;
}
.controls__button--z {
  color: #f18989;
}
.controls__button--e {
  color: #80c7ec;
}
.controls__button--r {
  color: #a8eea6;
}

.start {
  position: absolute;
  left:50%;
  transform: translateX(-50%);
}

.controls__button--start {
  width: 200px;
}

</style>
