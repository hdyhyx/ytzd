<template>
  <div class="industry-project">
    <navigator :url="'/pages/projectDetails/projectDetails'+url">
      <div class="title-wapper">
        <div class="icon">
          <div class="count">
            <div class="text">{{index+1}}</div>
          </div>
        </div>
        <div class="title">{{industry.projectName}}</div>
        <div class="schedule">
          <span class="text">进度</span>
          <span class="count">{{industry.smallFinishTotal}}/{{industry.smallTotal}}</span>
        </div>
      </div>
      <div class="container-wapper">
        <div class="content">
          <div class="name">分管领导：{{industry.resUser}}</div>
          <div class="address">分管单位：{{industry.resDept}}</div>
        </div>
        <div class="progress-wapper">
          <div class="count">{{percentage}}%</div>
          <div class="progress">
            <div class="perform" :style="{width:percentage+'%'}"></div>
          </div>
        </div>
      </div>
    </navigator>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  props: {
    industry: {
      type: Array,
      default: () => {
        return [];
      }
    },
    index: {
      type: Number
    }
  },
  created() {
    this.url =
      "?id=" +
      this.industry.sysId +
      "&startDate=" +
      this.industry.planBeginDate +
      "&endDate=" +
      this.industry.planFinishDate + // 项目结束时间
      "&smallTotal=" +
      this.industry.smallTotal + // 总节点
      "&smallFinishTotal=" +
      this.industry.smallFinishTotal; // 完成节点数;
  },
  computed: {
    percentage() {
      return (
        this.industry.smallFinishTotal /
        this.industry.smallTotal *
        100
      ).toFixed(0);
    }
  },
  onUnload() {
    this.industry = [];
  }
};
</script>
<style>
.industry-project {
  width: 690rpx;
  height: 300rpx;
  margin: 0 auto;
  background: #f5f5f5;
}
.industry-project .title-wapper {
  position: relative;
  padding-top: 10px;
  margin-top: 15px;
  background: #ffffff;
}
.industry-project .title-wapper .icon {
  position: absolute;
  top: 0px;
  left: 10px;
  width: 25px;
  height: 23px;
  background: #6392fd;
}
.title-wapper .icon .count {
  position: absolute;
  top: 13px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #6392fd;
}
.industry-project .icon .count .text {
  width: 22px;
  height: 22px;
  margin: 0 auto;
  margin-top: 1px;
  border-radius: 50%;
  font-size: 15px;
  color: #6392fd;
  background: #ffffff;
  text-align: center;
}
.industry-project .title-wapper .title {
  display: inline-block;
  margin-left: 40px;
  width: 400rpx;
  vertical-align: top;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  font-weight: 600;
}
.industry-project .title-wapper .schedule {
  display: inline-block;
  margin-left: 25px;
}
.industry-project .schedule .text {
  font-size: 12px;
  color: #999999;
}
.industry-project .schedule .count {
  font-size: 18px;
}
.industry-project .container-wapper {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  background: #ffffff;
}
.container-wapper .content {
  padding-left: 40px;
}
.container-wapper .content .name {
  line-height: 20px;
  font-size: 14px;
  color: #999999;
}
.container-wapper .content .address {
  width: 600rpx;
  line-height: 20px;
  font-size: 14px;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.progress-wapper {
  margin-top: 10px;
}
.progress-wapper .progress {
  position: relative;
  width: 580rpx;
  height: 12px;
  border-radius: 6px;
  margin: 0 auto;
  margin-top: 5px;
  background: #aee0ef;
}
.progress-wapper .count {
  padding-left: 30px;
  font-size: 18px;
  color: #4faaff;
}
.progress-wapper .progress .perform {
  position: absolute;
  height: 12px;
  border-radius: 6px;
  background: #4faaff;
}
</style>
