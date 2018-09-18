<template>
  <div class="footer">
      <div class="line-left"></div>
      <div class="text">已经到底了</div>
      <div class="line-right"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
/* footer */
.footer {
  position: relative;
  width: 750rpx;
  height: 45px;
  background: #eeeeee;
}
.footer .line-left,
.line-right {
  width: 80px;
  height: 1px;
  border-top: 1px solid #999999;
}
.footer .line-left {
  position: absolute;
  left: 100rpx;
  top: 22px;
}
.footer .line-right {
  position: absolute;
  right: 100rpx;
  top: 22px;
}
.footer .text {
  line-height: 45px;
  font-size: 14px;
  text-align: center;
}
</style>

