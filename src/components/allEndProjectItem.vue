<template>
  <div class="project" @click="routerEndProject">
     <h1 class="title">{{data.name}}</h1>
     <div class="date">完结时间: {{data.planBeginDate}}</div>
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
      default: "暂无名称"
    },
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    routerEndProject() {
      const url =
        "/pages/theEndProject/theEndProject?projectId=" + this.data.sysId;
      wx.navigateTo({ url });
    }
  },
  created() {}
};
</script>
<style>
.project {
  width: 740rpx;
  height: 90px;
  background: #ffffff;
  padding-left: 10rpx;
  border-bottom: 1px solid #eeeeee;
}
.project .title {
  width: 400rpx;
  padding-left: 10px;
  padding-top: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  font-weight: 900;
}
.project .date {
  margin-top: 20px;
  padding-left: 10px;
  line-height: 28rpx;
  font-size: 14px;
  color: #999999;
}
</style>
