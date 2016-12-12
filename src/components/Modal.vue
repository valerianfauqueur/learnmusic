<template>
  <transition name="modal">
    <div class="modal__mask" @click="$emit('close')">
      <div class="modal__wrapper">
        <div @click.stop class="modal">

          <div class="modal__header">
            <slot name="header">
            </slot>
          </div>

          <div class="modal__body">
            <slot name="body">
            </slot>
          </div>

          <div class="modal__footer">
            <slot name="footer">
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}

.modal__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height: 100%;
}

.modal {
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.modal__body {
  margin: 20px 0;
}

.modal__header {
  text-align: center;
  font-size: 48px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
