<template>
  <div class='btn-spec'>
    <template v-if="target !== 'none'">
      <router-link v-bind:to="target" class="valign__content btn">
          <span class="bg-large">
              <span class="line-bottom-left"></span>
              <span class="line-top-right"></span>
          </span>
          <span class="bg-tall">
              <span class="line-bottom-left"></span>
              <span class="line-top-right"></span>
          </span>
          <span class="bg-medium">
              <span class="line-bottom-left"></span>
              <span class="line-top-right"></span>
          </span>
          <span class="text">{{ text }}</span>
      </router-link>
    </template>
    <template v-else>
      <div class="valign__content btn">
          <span class="bg-large">
              <span class="line-bottom-left"></span>
              <span class="line-top-right"></span>
          </span>
          <span class="bg-tall">
              <span class="line-bottom-left"></span>
              <span class="line-top-right"></span>
          </span>
          <span class="bg-medium">
              <span class="line-bottom-left"></span>
              <span class="line-top-right"></span>
          </span>
          <span class="text">{{ text }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'buttonLink',
  props: ['target', 'text'],
};
</script>

<style>
.btn {
    display: inline-block;
    position: relative;
    font-size: 11px;
    font-size: .6875rem;
    font-family: "Playfair Display", serif;
    color: #FFF;
    text-transform: uppercase;
    letter-spacing: .15em;
    padding: 18px 25px;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    z-index: 10
}
.valign__content {
  cursor:pointer;
  text-decoration: none;
  color: white;
  position: relative;
  display: inline-block;
}

.btn .bg-large {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    position: absolute;
    top: 0;
    left: -4px;
    padding: 0 4px;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, .15)
}
.btn .bg-large .line-bottom-left:after,
.btn .bg-large .line-bottom-left:before,
.btn .bg-large .line-top-right:after,
.btn .bg-large .line-top-right:before {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, .5);
    transform: scale(0) translateZ(0);
    transition: transform .6s cubic-bezier(.4, 0, .1, 1);
}

.btn .bg-large .line-bottom-left:before,
.btn .bg-large .line-top-right:before {
    transform: scaleX(0) translateZ(0)
}

.btn .bg-large .line-bottom-left:after,
.btn .bg-large .line-top-right:after {
    transform: scaleY(0) translateZ(0)
}
.btn .bg-large .line-bottom-left:before {
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    transform-origin: left center;
}
.btn .bg-large .line-bottom-left:after {
    top: 0;
    left: -1px;
    width: 1px;
    height: 100%;
    transform-origin: center bottom;
}
.btn .bg-large .line-top-right:before {
    top: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    transform-origin: right center
}
.btn .bg-large .line-top-right:after {
    top: 0;
    right: -1px;
    width: 1px;
    height: 100%;
    transform-origin: center top
}
.btn .bg-tall {
    box-sizing: content-box;
    position: absolute;
    top: -4px;
    left: 0;
    padding: 4px 0;
    width: 100%;
    height: 100%;
    transform: translateZ(0);
    border: 1px solid rgba(255, 255, 255, .2)
}
.btn .bg-tall .line-bottom-left:after,
.btn .bg-tall .line-bottom-left:before,
.btn .bg-tall .line-top-right:after,
.btn .bg-tall .line-top-right:before {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, .5);
    transition: transform .6s cubic-bezier(.4, 0, .1, 1);
}
.btn .bg-tall .line-bottom-left:before,
.btn .bg-tall .line-top-right:before {
    transform: scaleX(0) translateZ(0)
}
.btn .bg-tall .line-bottom-left:after,
.btn .bg-tall .line-top-right:after {
    transform: scaleY(0) translateZ(0)
}
.btn .bg-tall .line-bottom-left:before {
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    transform-origin: right center;
}
.btn .bg-tall .line-bottom-left:after {
    top: 0;
    left: -1px;
    width: 1px;
    height: 100%;
    transform-origin: center top;
}
.btn .bg-tall .line-top-right:before {
    top: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    transform-origin: left center;
}
.btn .bg-tall .line-top-right:after {
    top: 0;
    right: -1px;
    width: 1px;
    height: 100%;
    transform-origin: center bottom;
}
.btn .bg-medium {
    box-sizing: content-box;
    position: absolute;
    top: -8px;
    left: 4px;
    padding: 8px 0;
    width: calc(100% - 8px);
    height: 100%;
    transform: translateZ(0);
    border: 1px solid rgba(255, 255, 255, .05);
}
.btn .bg-medium .line-bottom-left:after,
.btn .bg-medium .line-bottom-left:before,
.btn .bg-medium .line-top-right:after,
.btn .bg-medium .line-top-right:before {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, .5);
    transition: transform .6s cubic-bezier(.4, 0, .1, 1);
}
.btn .bg-medium .line-bottom-left:before,
.btn .bg-medium .line-top-right:before {
    -ms-transform: scaleX(0);
    -webkit-transform: scaleX(0) translateZ(0);
    transform: scaleX(0) translateZ(0)
}
.btn .bg-medium .line-bottom-left:after,
.btn .bg-medium .line-top-right:after {
    transform: scaleY(0) translateZ(0)
}

.btn .bg-medium .line-bottom-left:before {
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    transform-origin: right center
}
.btn .bg-medium .line-bottom-left:after {
    top: 0;
    left: -1px;
    width: 1px;
    height: 100%;
    transform-origin: center top
}
.btn .bg-medium .line-top-right:before {
    top: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    transform-origin: left center
}
.btn .bg-medium .line-top-right:after {
    top: 0;
    right: -1px;
    width: 1px;
    height: 100%;
    transform-origin: center bottom
}
.btn:hover .bg-large .line-bottom-left:before,
.btn:hover .bg-large .line-top-right:before {
    transform: scaleX(1) translateZ(0);
    transition: transform 1.2s cubic-bezier(.3, .1, .05, 1);
}
.btn:hover .bg-large .line-bottom-left:after,
.btn:hover .bg-large .line-top-right:after {
    transform: scaleY(1) translateZ(0);
    transition: transform 1.2s cubic-bezier(.3, .1, .05, 1);
}
.btn:hover .bg-tall .line-bottom-left:before,
.btn:hover .bg-tall .line-top-right:before {
    transform: scaleX(1) translateZ(0);
    transition: transform 1.2s cubic-bezier(.3, .1, .05, 1);
}
.btn:hover .bg-tall .line-bottom-left:after,
.btn:hover .bg-tall .line-top-right:after {
    transform: scaleY(1) translateZ(0);
    transition: transform 1.2s cubic-bezier(.3, .1, .05, 1);
}
.btn:hover .bg-medium .line-bottom-left:before,
.btn:hover .bg-medium .line-top-right:before {
    transform: scaleX(1) translateZ(0);
    transition: transform 1.2s cubic-bezier(.3, .1, .05, 1);
}
.btn:hover .bg-medium .line-bottom-left:after,
.btn:hover .bg-medium .line-top-right:after {
    transform: scaleY(1) translateZ(0);
    transition: transform 1.2s cubic-bezier(.3, .1, .05, 1);
}
.btn-spec{
  text-align:center;
}
@media only screen and (max-width: 700px) {
    .btn-spec{
      margin-top:-40px;
    }
}
@media only screen and (max-width: 510px) {
    .btn-spec{
      margin-top:-90px;
    }
    .ctn-info{
      margin-top:-60px;
    }
}
</style>
