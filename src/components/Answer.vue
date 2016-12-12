<template>
    <div @click.stop="validate" class="question__answer" v-bind:class="classObject">{{ answer }}</div>
</template>

<script>

export default {
  name: 'answer',
  props: ['isTrue', 'answer'],
  data() {
    return {
      showAnswer: false,
    };
  },
  methods: {
    validate() {
      this.showAnswer = true;
    },
  },
  computed: {
    classObject() {
      return {
        'question__answer--true': this.isTrue && this.showAnswer,
        'question__answer--false': !this.isTrue && this.showAnswer,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.question__answer {
  border-radius: 50%;
  border: 2px solid black;
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 24px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.question__answer--false {
  color:white;
  background-color: crimson;
}

.question__answer--true {
  color:white;
  background-color: green;
}
</style>
