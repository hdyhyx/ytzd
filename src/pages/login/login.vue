<template>
  <div class="login-wapper">
    <div class="login-img"></div>
    <div class="user-wapper">
      <input class="user-name" type="text" v-model="userVal" placeholder="请输入账号" @focus="userActive" @blur="isUserReg">
      <span class="tip-user" v-if="isTip">请输入正确的格式</span>
      <div class="border-bm" :class="{borderActive:index==1}" ></div>
    </div>
    <div class="pwd-wapper">
      <input class="pwd" type="password" v-model="pwdVal" placeholder="请输入密码" @focus="pwdActive" @blur="isPwdReg">
      <span class="tip-pwd" v-if="isPwd">密码不能为空</span>
      <div class="border-bm" :class="{borderActive:index==2}" ></div>
    </div>
    <div class="login-submit" @click="login">确认登录</div>
  </div>
</template>
<script>
import { hexMD5 } from "@/utils/md5.js";
import { config, ERR_OK } from "@/utils/index.js";
export default {
  data() {
    return {
      index: "",
      isTip: false,
      isPwd: false,
      regUser: false,
      regPWD: false,
      userVal: "18650467535",
      pwdVal: "123456"
    };
  },
  methods: {
    userActive() {
      this.index = 1;
    },
    pwdActive() {
      this.index = 2;
    },
    isUserReg() {
      this.index = "";
      const reg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
      // const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$/;
      if (!reg.test(this.userVal)) {
        this.isTip = true;
        this.regUser = false;
      } else {
        this.isTip = false;
        this.regUser = true;
      }
    },
    isPwdReg() {
      this.index = "";
      if (this.pwdVal === "") {
        this.isPwd = true;
        this.regPWD = false;
      } else {
        this.isPwd = false;
        this.regPWD = true;
      }
    },
    login() {
      if (this.regUser && this.regPWD) {
        wx.showLoading({
          title: "加载中"
        });
        var pwd = hexMD5(this.pwdVal);
        wx.request({
          url: "https://www.fzzhengxinyun.com/api/user/newlogin", // 仅为示例，并非真实的接口地址
          data: JSON.stringify({
            mobile: this.userVal,
            password: pwd,
            validCode: ""
          }),
          method: "POST",
          header: {
            "content-type": "application/json" // 默认值
          },
          success: function(res) {
            wx.hideLoading();
            if (res.data.code === ERR_OK) {
              wx.setStorage({
                key: "userInfo",
                data: res.data.data
              });
              const url = "/pages/index/index";
              wx.switchTab({ url });
            } else {
              wx.showModal({
                title: "提示",
                content: "用户密码错误",
                showCancel: false
              });
            }
          }
        });
      } else {
        wx.showModal({
          title: "提示",
          content: "用户或密码有误",
          showCancel: false
        });
      }
    }
  }
};
</script>
<style>
.login-wapper {
}
.login-wapper .login-img {
  width: 750rpx;
  height: 470rpx;
  background-image: url("http://img.huashitong.net/gov/login-img.png");
  background-size: 100% 100%;
  background-position-y: -1rpx;
}
.user-wapper {
  position: relative;
  width: 600rpx;
  margin: 0 auto;
  margin-top: 40rpx;
}
.border-bm {
  border-bottom: 2px solid #eeeeee;
}
.user-wapper .user-name {
  padding: 25rpx 0;
  font-size: 16px;
}
.pwd-wapper {
  position: relative;
  width: 600rpx;
  margin: 0 auto;
  margin-top: 20rpx;
}
.pwd-wapper .pwd {
  padding: 25rpx 0;
  font-size: 16px;
}
.login-submit {
  width: 520rpx;
  height: 82rpx;
  margin: 0 auto;
  margin-top: 70rpx;
  line-height: 82rpx;
  border-radius: 20px;
  background: #02b0ff;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
}
.tip-user,
.tip-pwd {
  position: absolute;
  padding: 5rpx 10rpx;
  right: 20rpx;
  top: 50%;
  margin-top: -17rpx;
  font-size: 12px;
  color: #ffffff;
  background-color: #ff5a39;
}
.login-wapper .borderActive {
  width: 600rpx;
  border-bottom: 2px solid #6392fd !important;
  animation: move 1s linear;
}
@keyframes move {
  0% {
    width: 100rpx;
  }
  10% {
    width: 150rpx;
  }
  20% {
    width: 200rpx;
  }
  30% {
    width: 250rpx;
  }
  40% {
    width: 300rpx;
  }
  50% {
    width: 350rpx;
  }
  60% {
    width: 400rpx;
  }
  70% {
    width: 450rpx;
  }
  80% {
    width: 500rpx;
  }
  90% {
    width: 550rpx;
  }
  100% {
    width: 600rpx;
  }
}
</style>
