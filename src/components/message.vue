<template>
    <div class="message-wapper" @click="routerDetails">
    <div class="title-container">
      <h3 class="title">有一个任务需要完成</h3>
      <div class="date">{{messageItem.begin}}</div>
    </div>
    <div class="content-wapper">
      <div class="project-name">
        <span class="text">项目名称：</span>
        <span class="name">{{messageItem.projectName}}</span>
      </div>
      <div class="progress-name">
        <span class="text">任务名称：</span>
        <span class="name">{{messageItem.nodeId}}{{messageItem.str}}</span>
      </div>
      <div class="project-date">
        <span class="text">截止日期：</span>
        <span class="date">{{messageItem.end}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    messageItem: {
      type: String
    }
  },
  methods: {
    routerDetails() {
      var url =
        "/pages/projectDetails/projectDetails?id=" + this.messageItem.projectId; // ID
      wx.navigateTo({ url });
    }
  }
};
</script>
<style>
.message-wapper {
  padding: 20px 20px 0 20px;
  background-color: #fafafa;
}
.message-wapper .title-container {
  display: flex;
  border-bottom: 1px solid #5a91fd;
  background-color: #ffffff;
}
.message-wapper .title-container .title {
  flex: 1;
  padding-left: 20rpx;
  line-height: 70rpx;
  font-size: 16px;
  color: #6092fd;
}
.message-wapper .title-container .date {
  flex: 1;
  padding-right: 20rpx;
  line-height: 70rpx;
  font-size: 16px;
  text-align: right;
  color: #999999;
}
.message-wapper .content-wapper {
  padding: 30rpx 20rpx 10rpx 20rpx;
  background-color: #ffffff;
}
.message-wapper .project-name {
  margin-bottom: 10rpx;
  font-size: 16px;
}
.message-wapper .project-name .text {
  color: #999999;
}
.message-wapper .progress-name {
  margin-bottom: 10rpx;
  font-size: 16px;
}
.message-wapper .progress-name .text {
  color: #999999;
}
.message-wapper .project-date {
  margin-bottom: 10rpx;
  font-size: 16px;
}
.message-wapper .project-date .text {
  color: #999999;
}
</style>
