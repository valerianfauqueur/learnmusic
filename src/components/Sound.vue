<template>
  <div v-on:click="playSound" class="sound"></div>
</template>

<script>
import Howler from 'howler';

export default {
  name: 'bell',
  props: ['frequency', 'src'],
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
