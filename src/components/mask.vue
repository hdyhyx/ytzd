<template>
  <div class="mask-wapper">
    <div class="drawer-screen" @click="powerDrawer" data-statu="close" v-show="showModalStatus"></div>
    <div animation="animationData" class="drawer-box" data-statu="close" v-show="showModalStatus" >
      <div class="drawer-title"></div>
      <div class="content">
        <div class="text-wapper">
          <span class="text">项目节点：</span>
          <span class="name">{{showModal.nodeName}}</span>
        </div>
        <div class="text-wapper">
          <span class="text">责任人-责任单位：</span>
          <span class="name">{{showModal.resDept}}</span>
        </div>
        <div class="text-wapper">
          <span class="text">责任人联系电话：</span>
          <span class="name">{{showModal.resUserPhone}}</span>
        </div>
         <div class="text-wapper">
          <span class="text">经办人：</span>
          <span class="name">{{showModal.operatorUser}}</span>
        </div>
        <div class="text-wapper">
          <span class="text">经办人-联系电话：</span>
          <span class="name">{{showModal.operatorPhone}}</span>
        </div>
        <div class="text-wapper">
          <span class="text">计划用时：</span>
          <span class="name">{{showModal.planTime}}</span>
        </div>
        <div class="text-wapper">
          <span class="text">计划开始时间：</span>
          <span class="name">{{showModal.planBeginDate}}</span>
        </div>
        <div class="text-wapper">
          <span class="text">计划完成时间：</span>
          <span class="name">{{showModal.factFinishDate}}</span>
        </div>
       <div class="text-wapper">
          <span class="text">实际用时：</span>
          <span class="name">{{showModal.factTime}}</span>
        </div>
        <div class="text-wapper">
          <span class="text">实际开始时间：</span>
          <span class="name">{{showModal.planBeginDate}}</span>
        </div>
        <div class="text-wapper">
          <span class="text">实际结束时间：</span>
          <span class="name">{{showModal.factFinishDate}}</span>
        </div>
        <div class="btn-ok" data-statu="close" @click="powerDrawer">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModalStatus: false,
      animationData: "",
      projectArr: [
        "项目节点：",
        "责任人-责任单位：",
        "责任人联系电话：",
        "经办人-单位：",
        "经办人-联系电话：",
        "计划用时：",
        "计划开始时间：",
        "计划完成时间：",
        "实际用时：",
        "实际开始时间：",
        "实际结束时间："
      ]
    };
  },
  props: {
    showModal: {
      type: Object
    }
  },
  methods: {
    powerDrawer: function(e) {
      var currentStatu = e.currentTarget.dataset.statu;
      console.log(currentStatu);
      this.util(currentStatu);
      if (currentStatu === "close") {
        this.$emit("isPower", currentStatu);
      }
    },
    util: function(currentStatu) {
      /* 动画部分 */
      // 第1步：创建动画实例
      var animation = wx.createAnimation({
        duration: 5000, // 动画时长
        timingFunction: "linear", // 线性
        delay: 0 // 0则不延迟
      });

      // 第2步：这个动画实例赋给当前的动画实例
      this.animation = animation;
      // 第3步：执行第一组动画
      animation
        .opacity(0)
        .rotateX(-100)
        .step();

      // 第4步：导出动画对象赋给数据对象储存
      this.animationData = animation.export();

      // 第5步：设置定时器到指定时候后，执行第二组动画
      setTimeout(
        function() {
          // 执行第二组动画
          animation
            .opacity(1)
            .rotateX(0)
            .step();
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
          this.animationData = animation;

          // 关闭
          if (currentStatu === "close") {
            this.showModalStatus = false;
          }
        }.bind(this),
        200
      );

      // 显示
      if (currentStatu === "open") {
        this.showModalStatus = true;
      }
    }
  },
  mounted() {
    this.showModalStatus = this.showModal;
    console.log(this.showModal);
  }
};
</script>
<style>
/*mask*/
.drawer-screen {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
}
/*content*/
.drawer-box {
  width: 650rpx;
  overflow: hidden;
  position: fixed;
  top: 40%;
  left: 0;
  z-index: 1001;
  background: #fafafa;
  margin: -150px 50rpx 0 50rpx;
  border-radius: 3px;
}
.drawer-title {
  height: 227rpx;
  background-image: url("http://img.huashitong.net/gov/model.png");
  background-size: 100% 100%;
}
.drawer-box .content {
  padding: 35rpx;
}
.drawer-box .content .text-wapper {
  font-size: 15px;
}
.drawer-box .text-wapper .text {
  line-height: 45rpx;
  letter-spacing: 1rpx;
  font-size: 15px;
}
.drawer-box .text-wapper .name {
  line-height: 45rpx;
  font-size: 15px;
}
.btn-ok {
  width: 200rpx;
  height: 60rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  line-height: 60rpx;
  border-radius: 5px;
  border: 1px solid #02b0ff;
  font-size: 16px;
  text-align: center;
}
</style>
