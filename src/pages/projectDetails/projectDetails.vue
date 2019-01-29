<template>
  <div class="project-details">
    <div class="project-wapper">
        <h1 class="title">{{projectDate.name}}</h1>
        <div class="project-time">
          <div class="date">
            <div class="date-start">启动时间：{{projectDate.planBeginDate}}</div>
            
          </div>
          <div class="node">完成节点: <span class="count">{{projectDate.smallFinishTotal}}/{{projectDate.smallTotal}}</span></div>
        </div>
        <div class="date-end">责任单位：{{projectDate.resDept}}</div>
        <div class="progress-wapper">
          <div class="progress" :style="{width:progressSpeed+'%'}"></div>
        </div>
        <div class="project-state">
          <div class="advance">超前:{{projectDate.advanceTotal}}</div>
          <div class="normal">正常:{{projectDate.normalTotal}}</div>
          <div class="delay">延期:{{projectDate.delayTotal}}</div>

        </div>
        <div class="project-state">
          <div class="no-start">未开始:{{projectDate.notBeginList}}</div>
          <div class="ongoing">进行中:{{projectDate.underwayTotal}}</div>
          <div class="totals"></div>

        </div>
    </div>
      <div>
        <node-details  :key="index" :nodeData='nodeDetail' @isContent='isContentShow' 
        :isContent='isShow' @isMask="showMask"></node-details>
      </div>
       <mask v-if="isMask" :showModal="isMask" @isPower=isShowPower></mask>
  </div>
</template>
<script>
import nodeDetails from "@/components/nodeDetails";
import mask from "@/components/mask";
import { ERR_OK, post } from "@/utils/index";
export default {
  data() {
    return {
      isShow: false,
      isMask: false,
      id: null,
      projectDate: {}, // 项目数据 res.data.data
      nodeDetail: [], // 节点详情
      progressVal: null
    };
  },
  components: {
    nodeDetails,
    mask
  },
  methods: {
    isContentShow(isContent) {
      if (isContent === false) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    showMask(isShowMask) {
      this.isMask = isShowMask;
    },
    isShowPower(data) {
      if (data === "close") {
        this.isMask = false;
      }
    },
    getData() {
      const data = post("/app/nodesApp/queryNodesListByProjectId", {
        projectId: this.id
      });
      data.then(res => {
        if (res.code === ERR_OK) {
          this.nodeDetail = [];
          this.projectDate = res.data;
          res.data.lists.map((val, index) => {
            Object.assign(val, { isopen: false });
            this.nodeDetail.push(val);
          });
        }
      });
    }
  },
  onLoad(option) {
    this.id = option.id;
    this.getData();
  },
  onUnload() {
    this.nodeDetail = [];
    this.projectDate = [];
  },
  computed: {
    progressSpeed() {
      return (
        (this.projectDate.smallFinishTotal / this.projectDate.smallTotal) *
        100
      ).toFixed(0);
    }
  }
};
</script>
<style>
.project-details {
  width: 750rpx;
  padding-top: 20px;
  background: #eeeeee;
}
.project-details .project-wapper {
  width: 690rpx;
  height: 420rpx;
  margin: 0 auto;
  padding-bottom: 10px;
  border-radius: 8px;
  background: #f7fbfd;
  background-image: url("http://img.huashitong.net/gov/background-img.png");
  background-size: 100% 100%;
}
.project-details .project-wapper .title {
  width: 600rpx;
  padding-left: 10px;
  padding-top: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  font-weight: 900;
}
.project-wapper .project-time {
  display: flex;
  padding: 20rpx 20rpx 0 20rpx;
}
.project-wapper .project-time .date {
  flex: 0 0 50%;
}
.project-wapper .date .date-start {
  line-height: 28px;
  font-size: 14px;
}
.date-end {
  width: 630rpx;
  padding: 0 20rpx 20rpx 20rpx;
  line-height: 28px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.project-wapper .project-time .node {
  flex: 0 0 50%;
  font-size: 14px;
  text-align: right;
}
.project-wapper .node .count {
  line-height: 28px;
  font-size: 16px;
}
.progress-wapper {
  position: relative;
  width: 550rpx;
  height: 10rpx;
  margin: 0 auto;
  margin-bottom: 20px;
  background: #eeeeee;
}
.progress-wapper .progress {
  position: absolute;
  top: 0;
  margin-top: 0;
  height: 10rpx;
  background: #438ffd;
}
.project-state {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.project-state .normal {
  flex: 0 0 160rpx;
  line-height: 32px;
  border: 1px solid #3699ff;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #3699ff;
}
.project-state .advance {
  flex: 0 0 160rpx;
  line-height: 32px;
  border: 1px solid #05d680;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #05d680;
}
.project-state .delay {
  flex: 0 0 160rpx;
  line-height: 32px;
  border: 1px solid #eb6100;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #eb6100;
}
.project-state .totals {
  flex: 0 0 160rpx;
  line-height: 32px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}
.project-state .no-start {
  flex: 0 0 160rpx;
  line-height: 32px;
  border: 1px solid #666666;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #666666;
}
.project-state .ongoing {
  flex: 0 0 160rpx;
  line-height: 32px;
  border: 1px solid #fdd835;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #fdd835;
}
</style>
