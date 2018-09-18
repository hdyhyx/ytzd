<template>
  <div class="no-data">
    <div class="node-data-img"></div>
    <p class="text">页面暂无数据</p>
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
.no-data {
  padding-top: 30%;
}
.node-data-img {
  width: 603rpx;
  height: 453rpx;
  margin: 0 auto;
  background-image: url("http://img.huashitong.net/gov/no-data.png");
  background-size: 100% 100%;
}
.no-data .text {
  padding-top: 50rpx;
  text-align: center;
  font-size: 16px;
}
</style>
