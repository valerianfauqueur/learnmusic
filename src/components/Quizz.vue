<template>
    <div class="answers">
      <div @click.stop="select(0)" class="question__answer" v-bind:class="classObject0">{{ data[0].txt }}</div>
      <div @click.stop="select(1)" class="question__answer" v-bind:class="classObject1">{{ data[1].txt }}</div>
      <div @click.stop="select(2)" class="question__answer" v-bind:class="classObject2">{{ data[2].txt }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'answer',
  props: ['answers'],
  data() {
    return {
      data: JSON.parse(this.answers),
    };
  },
  methods: {
    select(index) {
      for (let i = 0, l = this.data.length; i < l; i += 1) {
        if (this.data[i].selected && i !== index) {
          this.data[i].selected = false;
        }
      }
      this.data[index].selected = true;
    },
  },
  computed: {
    ...mapGetters({
      showAnswer: 'showAnswer',
    }),
    classObject0() {
      return {
        'question__answer--selected': this.data[0].selected,
        'question__answer--false': this.data[0].selected && this.showAnswer && !this.data[0].isTrue,
        'question__answer--true': this.showAnswer && this.data[0].isTrue,
      };
    },
    classObject1() {
      return {
        'question__answer--selected': this.data[1].selected,
        'question__answer--false': this.data[1].selected && this.showAnswer && !this.data[1].isTrue,
        'question__answer--true': this.showAnswer && this.data[1].isTrue,
      };
    },
    classObject2() {
      return {
        'question__answer--selected': this.data[2].selected,
        'question__answer--false': this.data[2].selected && this.showAnswer && !this.data[2].isTrue,
        'question__answer--true': this.showAnswer && this.data[2].isTrue,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.answers {
  display: flex;
  justify-content: space-around;
}
.question__answer {
  border: 3px solid rgba(0,0,0,0.4);
  background-color: #2d2b2d;
  color:white;
  width: 20vw;
  height: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 22px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.question__answer--selected {
  border: 3px solid white;
}

.question__answer--false {
  border: 3px solid #d74c4c;
}

.question__answer--true {
  border: 3px solid #a7ff8d;
}
</style>
