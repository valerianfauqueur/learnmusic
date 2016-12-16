<template>
  <div class="sound__viz">
    <div class='sound__frequency'>{{ hertz !== -1 ? parseInt(hertz) : '-' }} Hz</div>
    <canvas v-bind:width="width" v-bind:height="height"></canvas>
    <div @click="launchCapture" class="enableBtn"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'soundViz',
  props: ['width', 'height'],
  data() {
    return {
      MIN_SAMPLES: 0,
      GOOD_ENOUGH_CORRELATION: 0.9,
      audioContext: new AudioContext(),
      bufferSize: 1024,
      buf: new Float32Array(1024),
      bufUint: new Uint8Array(2048),
      hertz: 0,
    };
  },
  methods: {
    getUserMedia(dictionary, callback) {
      try {
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;
        navigator.getUserMedia(dictionary, callback, this.error);
      } catch (e) {
        alert('La capture du microphone à échoué');
      }
    },

    error() {
      alert('Stream generation failed.');
    },

    gotStream(stream) {
      // Create an AudioNode from the stream.
      this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);

      // Connect it to the destination.
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.mediaStreamSource.connect(this.analyser);
      this.updateHertz = setInterval(() => {
        this.analyser.getFloatTimeDomainData(this.buf);
        this.hertz = this.autoCorrelate(this.buf, this.audioContext.sampleRate);
      }, 100);

      this.drawWave();
    },

    drawWave() {
      this.clear();
      this.waveAnim = window.requestAnimationFrame(this.drawWave);
      this.analyser.getByteTimeDomainData(this.bufUint);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#E3E2E2';
      this.ctx.beginPath();
      const waveLineSize = (this.ctxW * 1) / this.bufferSize;
      let x = 0;
      for (let i = 0; i < this.bufferSize; i += 1) {
        const data = this.bufUint[i] / 128;
        const y = data * (this.ctxH / 2);

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }

        x += waveLineSize;
      }

      this.ctx.lineTo(this.ctxW, this.ctxH / 2);
      this.ctx.stroke();
    },


    clear() {
      this.ctx.clearRect(0, 0, this.ctxW, this.ctxH);
    },

    autoCorrelate(buf, sampleRate) {
      /* eslint-disable max-len */
      const SIZE = buf.length;
      const MAX_SAMPLES = Math.floor(SIZE / 2);
      let bestOffset = -1;
      let bestCorrelation = 0;
      let rms = 0;
      let foundGoodCorrelation = false;
      const correlations = new Array(MAX_SAMPLES);

      for (let i = 0; i < SIZE; i += 1) {
        const val = buf[i];
        rms += val * val;
      }
      rms = Math.sqrt(rms / SIZE);
      if (rms < 0.01) { // not enough signal
        return -1;
      }
      let lastCorrelation = 1;
      for (let offset = this.MIN_SAMPLES; offset < MAX_SAMPLES; offset += 1) {
        let correlation = 0;

        for (let i = 0; i < MAX_SAMPLES; i += 1) {
          correlation += Math.abs((buf[i]) - (buf[i + offset]));
        }
        correlation = 1 - (correlation / MAX_SAMPLES);
        correlations[offset] = correlation; // store it, for the tweaking we need to do below.
        if ((correlation > this.GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
          foundGoodCorrelation = true;
          if (correlation > bestCorrelation) {
            bestCorrelation = correlation;
            bestOffset = offset;
          }
        } else if (foundGoodCorrelation) {
          const shift = (correlations[bestOffset + 1] - correlations[bestOffset - 1]) / correlations[bestOffset];
          return sampleRate / (bestOffset + (8 * shift));
        }
        lastCorrelation = correlation;
      }
      if (bestCorrelation > 0.01) {
        // console.log("f = " + sampleRate/bestOffset + "Hz (rms: " + rms + " confidence: " + bestCorrelation + ")")
        return sampleRate / bestOffset;
      }
      return -1;
    },
    launchCapture() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      /* eslint-disable no-undef */
      this.getUserMedia({
        audio: {
          mandatory: {
            googEchoCancellation: false,
            googAutoGainControl: false,
            googNoiseSuppression: false,
            googHighpassFilter: false,
          },
          optional: [],
        },
      }, this.gotStream);
    },
  },
  mounted() {
    this.canvas = document.querySelector('.sound__viz canvas');
    this.ctxW = this.canvas.width;
    this.ctxH = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
  },
  beforeDestroy() {
    clearInterval(this.updateHertz);
    window.cancelAnimationFrame(this.waveAnim);
  },
};
</script>

<style>
  .sound__viz {
    width:80%;
    height:100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .sound__frequency {
    font-size: 48px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #E3E2E2;
  }

  .enableBtn {
    position: absolute;
    bottom: 10vh;
    width: 70px;
    height: 70px;
    background-image: url('../assets/img/icons/record.png');
    background-size: cover;
    cursor:pointer;
  }
</style>
