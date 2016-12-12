<template>
  <div v-on:click="playSound" class="sound"></div>
</template>

<script>
import Tone from 'tone';

export default {
  name: 'bell',
  props: ['frequency', 'src'],
  methods: {
    playSound() {
      const bellSampler = new Tone.Sampler(
        this.src,
        () => {
          bellSampler.triggerAttack(0);
        }
      ).toMaster();
    },
  },
};
</script>

<style lang="scss" scoped>
.sound {
  width:200px;
  height:200px;
  background-color: blue;
  display: inline-block;
  margin-left: 20px;
}
</style>
