<template>
  <div id="home">
    <router-link to="/vibration#air">Vibration</router-link>
    <router-link to="/frequency">Frequency</router-link>
    <button v-on:click="showModal = true">showModal</button>
    <modal class='question' v-show="showModal"  @close="showModal = false">
      <h3 class='question__text' slot="header">Que ressens-tu ?</h3>
      <div class='question__answers' slot="body">
        <answer v-bind:isTrue="false" answer="Des vibrations"></answer>
        <answer v-bind:isTrue="true" answer="Du lait au chocolat"></answer>
        <answer v-bind:isTrue="false" answer="Un tremblement de terre"></answer>
      </div>
      <router-link slot="footer" to="/frequency">Frequency</router-link>
    </modal>
  </div>
</template>

<script>
import Modal from '../components/Modal';
import Answer from '../components/Answer';

export default {
  name: 'home',
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    Modal,
    Answer,
  },
};
</script>

<style>
  @import '../css/reset.css';
</style>

<style lang="scss" scoped>

.question__answers {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.question__text {
  color:red;
}
</style>
