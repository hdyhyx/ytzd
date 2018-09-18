<template>
  <div class="look-project" @click="routerLink">
    <div class="container-wapper">
      <h1 class="title">{{projectDate.projectName}}</h1>
      <div class="project-author">
        <div class="content-left">
          <div class="name">责任单位：{{projectDate.resDept}}</div>
          <div class="node">完成节点：{{projectDate.smallFinishTotal}}/{{projectDate.smallTotal}}</div>
        </div>
        <div class="content-right">
          <div class="name">分管领导：{{projectDate.resUser}}</div>
          <div class="node">项目进度：{{percentage}}%</div>
        </div>
      </div>
    </div>
    <div class="progress-wapper">
      <div class="progress-val" :style="{'width':percentage+'%'}"></div>
    </div>
    <div class="node-wapper">
      <div class="node-time">
        <div class="date-start">项目开始时间：{{projectDate.planBeginDate}}</div>
        <div class="date-end">项目结束时间：{{projectDate.planFinishDate}}</div>
      </div>
      <div class="node-details">
        <div class="normal">已完成：{{projectDate.smallFinishTotal}}</div>
        <div class="advance">进行中：{{projectDate.ongoingTotal}}</div>
        <div class="delay">未完成：{{projectDate.unfinishedTotal}}</div>
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
    progress: {
      type: Number,
      default: 200
    },
    projectDate: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    routerLink() {
      var url =
        "/pages/projectDetails/projectDetails?id=" + this.projectDate.sysId;
      wx.navigateTo({ url });
    }
  },
  mounted() {
    // console.log(this.projectDate);
  },
  computed: {
    percentage() {
      return (
        this.projectDate.smallFinishTotal /
        this.projectDate.smallTotal *
        100
      ).toFixed(0);
    }
  }
};
</script>
<style>
.look-project {
  width: 690rpx;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 10px;
}
.look-project .container-wapper .title {
  width: 400rpx;
  padding-left: 10px;
  margin-top: 20px;
  padding-top: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  font-weight: 900;
}
.look-project .project-author {
  display: flex;
  margin-top: 20px;
  font-size: 14px;
}
.look-project .project-author .content-left {
  flex: 0 0 50%;
  padding-left: 10px;
}
.project-author .content-left .name {
  margin-bottom: 10px;
  width: 350rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.look-project .project-author .content-right {
  flex: 0 0 50%;
}
.project-author .content-right .name {
  margin-bottom: 10px;
}
.progress-wapper {
  width: 618rpx;
  height: 5px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 5px;
  background: #dcdcdc;
}
.progress-wapper .progress-val {
  height: 5px;
  background: #1f63fd;
  border-radius: 5px;
}
.node-wapper {
  width: 100%;
}

.node-wapper .node-time {
  display: flex;
  margin-top: 20px;
  font-size: 13px;
}
.node-wapper .node-time .date-start {
  flex: 0 0 50%;
  padding-left: 10px;
}
.node-wapper .node-time .date-end {
  flex: 0 0 50%;
}
.node-details {
  display: flex;
  padding: 20rpx 0;
  justify-content: space-around;
  background: #f7fbfd;
}
.node-details .normal {
  width: 170rpx;
  height: 60rpx;
  line-height: 60rpx;
  border: 1px solid #b3d465;
  border-radius: 3px;
  text-align: center;
  font-size: 13px;
  color: #b3d465;
}
.node-details .advance {
  width: 170rpx;
  height: 60rpx;
  line-height: 60rpx;
  border: 1px solid #3699ff;
  border-radius: 3px;
  text-align: center;
  font-size: 13px;
  color: #3699ff;
}
.node-details .delay {
  width: 170rpx;
  height: 60rpx;
  line-height: 60rpx;
  border: 1px solid #eb6100;
  border-radius: 3px;
  text-align: center;
  font-size: 13px;
  color: #eb6100;
}
</style>
