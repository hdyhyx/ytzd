<template>
    <div class="head-wapper">
        <div class="container">
          <div class="block"></div>          
          <h1 class="head">{{title}}</h1>
          <!-- <p class="more">更多</p> -->
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "重大项目"
    }
  }
};
</script>
<style>
.head-wapper {
  width: 750rpx;
  height: 100rpx;
  border-bottom: 1px solid #eeeeee;
}

.head-wapper .container {
  position: relative;
  padding: 0 30px 0 35px;
}
.head-wapper .block {
  position: absolute;
  left: 25px;
  top: 15px;
  display: inline-block;
  width: 6rpx;
  height: 40rpx;
  border-radius: 2px;
  background: #238bff;
}
.head-wapper .container .head {
  float: left;
  line-height: 100rpx;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: 500;
}
/* .head-wapper .container .more {
  float: right;
  line-height: 100rpx;
  font-size: 12px;
  color: #999999;
} */
</style>

