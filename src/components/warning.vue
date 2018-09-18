<template>
  <div class="warning-wapper" @click="routerDetails">
    <h2 class="title">{{warningData.projectName}}</h2>
    <div class="name">负责人：{{warningData.resUser}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    warningData: {
      type: {},
      default: () => {
        return {};
      }
    }
  },
  methods: {
    routerDetails() {
      var url =
        "/pages/projectDetails/projectDetails?id=" +
        this.warningData.projectId + // ID
        "&startDate=" +
        this.warningData.planBeginDate + // 项目开始时间
        "&endDate=" +
        this.warningData.factFinishDate; // 项目结束时间
      wx.navigateTo({ url });
    }
  }
};
</script>
<style>
.warning-wapper {
  display: flex;
  border-bottom: 1px solid #eeeeee;
}
.warning-wapper .title {
  width: 400rpx;
  padding-left: 20rpx;
  white-space: nowrap;
  line-height: 100rpx;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;
}
.warning-wapper .name {
  flex: 0 350rpx;
  line-height: 100rpx;
  font-size: 16px;
  text-align: center;
  color: #eb3b3b;
}
</style>
