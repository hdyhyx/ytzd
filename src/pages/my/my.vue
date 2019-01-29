<template>
  <div class="my">
    <div class="bg-img">
      <div class="user-wapper">
        <div class="user-info"></div>
      </div>
    </div>
    <div class="user-name">{{userName}}</div>
    <div class="edi-info" @click="ediInfo">
      <div class="icon"></div>
      <div class="text">版本信息</div>
    </div>
    <div class="end-login" @click="endLogin">
      <div class="icon"></div>
      <div class="text">退出登陆</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: ""
    };
  },
  methods: {
    ediInfo() {
      wx.showToast({
        title: "已是最新版本", // 提示的内容,
        icon: "none", // 图标,
        duration: 2000 // 延迟时间,
      });
    },
    endLogin() {
      wx.showModal({
        title: "", // 提示的标题,
        content: "退出登录", // 提示的内容,
        showCancel: true, // 是否显示取消按钮,
        cancelText: "取消", // 取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: "#000000", // 取消按钮的文字颜色,
        confirmText: "确定", // 确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: "#02b0ff", // 确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            wx.setStorage({
              key: "userInfo",
              data: ""
            });
            const url = "/pages/login/login";
            wx.redirectTo({ url });
          } else if (res.cancel) {
          }
        }
      });
    }
  },
  onLoad() {
    // 获取用户名
    wx.getStorage({
      key: "userInfo",
      success: res => {
        this.userName = res.data.userName;
      }
    });
  }
};
</script>
<style>
.my {
}
.my .bg-img {
  position: relative;
  width: 750rpx;
  height: 450rpx;
  background-color: #6392fd;
  background-image: url("http://img.huashitong.net/gov/my-img-1.png");
  background-size: 100% 100%;
}
.my .user-wapper {
  position: absolute;
  left: 50%;
  margin-left: -130rpx;
  bottom: -130rpx;
  width: 260rpx;
  height: 260rpx;
  border-radius: 50%;
  background: #666666;
}
.my .user-wapper .user-info {
  width: 240rpx;
  height: 240rpx;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 10rpx;
  background: #ffffff;
}
.end-login {
  width: 750rpx;
  padding: 20rpx 0;
  border-bottom: 1px solid #eeeeee;
}
.end-login .icon {
  display: inline-block;
  width: 30rpx;
  height: 30rpx;
  margin-left: 50rpx;
  margin-top: 5rpx;
  background-image: url("http://img.huashitong.net/gov/end-login.png");
  background-size: 100% 100%;
}
.end-login .text {
  display: inline-block;
  line-height: 48rpx;
  font-size: 16px;
  padding-left: 24rpx;
  vertical-align: top;
}
.edi-info {
  width: 750rpx;
  padding: 20rpx 0;
  margin-top: 20rpx;
  border-bottom: 1px solid #eeeeee;
}
.edi-info .icon {
  display: inline-block;
  width: 30rpx;
  height: 30rpx;
  margin-left: 50rpx;
  background-image: url("http://img.huashitong.net/gov/up.png");
  background-size: 100% 100%;
}
.edi-info .text {
  display: inline-block;
  line-height: 48rpx;
  font-size: 16px;
  padding-left: 24rpx;
  vertical-align: top;
}
.user-name {
  margin: 0 auto;
  margin-top: 150rpx;
  font-size: 16px;
  text-align: center;
}
/* .task {
  width: 750rpx;
  padding: 20rpx 0;
  margin-top: 150rpx;
  border-bottom: 1px solid #eeeeee;
}
.task .icon {
  display: inline-block;
  width: 30rpx;
  height: 30rpx;
  margin-left: 50rpx;
  background-image: url("http://img.huashitong.net/gov/min-tick.png");
  background-size: 100% 100%;
}
.task .text {
  display: inline-block;
  line-height: 48rpx;
  font-size: 16px;
  padding-left: 24rpx;
  vertical-align: top;
} */
</style>
