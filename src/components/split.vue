<template>
  <div class="split border-top">
    <div class="border-bottom">
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.split {
  width: 100%;
  height: 24rpx;
  background: #f3f5f7;
}
.border-top {
  position: relative;
}
.border-top:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  background-color: #eeeeee;
  height: 1px;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .border-top::after {
    transform: scaleY(0.5);
    transform-origin: 50% 0%;
  }
}
.border-bottom {
  position: relative;
}
.border-bottom:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  z-index: 1;
  pointer-events: none;
  background-color: #eeeeee;
  height: 1px;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .border-bottom::after {
    transform: scaleY(0.5);
    transform-origin: 50% 0%;
  }
}
</style>
