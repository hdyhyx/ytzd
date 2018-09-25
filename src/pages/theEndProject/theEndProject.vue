<template>
  <div class="end-project">
    <div class="header-wapper">
      <div class="content">
        <div class="project-name">
          <div class="name">项目名称</div>
          <div class="container">
            <h2 class="title">{{projectData.projectName}}</h2>
            <div class="major-count">
              <div class="major">市重点项目</div>
              <div class="major">"五个一批"重点项目</div>
            </div>
          </div>
        </div>
        <div class="project-unit">
          <div class="unit">责任单位</div>
          <div class="content">{{projectData.resDept}}</div>
        </div>
        <div class="project-date">
          <div class="date-start">
            <span class="date">开始时间</span>
            <span class="content">{{projectData.beginTime}}</span>
          </div>
          <div class="date-end">
            <span class="date">结束时间</span>
            <span class="content"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="split-head"></div>
    <div class="completion-wapper">
      <div class="title">完成情况</div>
      <div class="count-wapper">
        <div class="left">“</div>
        <div class="content">
          {{projectData.status}}<span class="count">{{projectData.dateNum}}</span>天
        </div>
        <div class="right">”</div>
      </div>
      <div class="completion">
        <div class="complete">
          <span class="block"></span>
          <span class="name">完成</span>
          <span class="count">{{projectData.finishNodeNum}}</span>
        </div>
        <div class="advance">
          <span class="block"></span>
          <span class="name">超前</span>
          <span class="count">{{projectData.leadingNodeNum}}</span>
        </div>
        <div class="normal">
          <span class="block"></span>
          <span class="name">正常</span>
          <span class="count">{{projectData.normalNodeNum}}</span>
        </div>
        <div class="limit">
          <span class="block"></span>
          <span class="name">逾期</span>
          <span class="count">{{projectData.delayNodeNum}}</span>
        </div>
      </div>
    </div>
    <split></split>
    <div class="each-node">
      <div class="title-wapper">
        <span class="block"></span>
        <span class="title">各个节点完成情况</span>
      </div>
      <div class="node-wapper">
        <scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%" @scrolltolower="scrolltolower" @scroll="scroll">
          <div class="scroll-x">
            <div v-for="(itme,index) in className" :key="index">
                <div  class="scroll-view-item_H" :class="itme.className">{{itme.nodeId}}</div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <split></split>
    <div class="efficiency-max" v-if="maxEfficiency.length>=3">
      <div class="title-wapper">
        <div class="icon"></div>
        <div class="title">效率最高</div>
      </div>
      <div class="container-max">
        <div class="content" v-for="(itme,index) in maxEfficiency" :key="index">
          <div class="text">{{itme.text}}</div>
          <div class="accounted">{{itme.num}}</div>
        </div>
      </div>
    </div>
    <split></split>
        <div class="efficiency-min" v-if="minEfficiency.length >=3">
      <div class="title-wapper">
        <div class="icon"></div>
        <div class="title">效率最低</div>
      </div>
      <div class="container-min">
        <div class="content" v-for="(itme,index) in minEfficiency" :key="index">
          <div class="text">{{itme.text}}</div>
          <div class="accounted">{{itme.num}}</div>
        </div>
      </div>
    </div>
    <split></split>
    <div class="department-wapper">
      <div class="title-wapper">
        <span class="title">各部门完成情况</span>
      </div>
      <div class="department-list">
        <department v-for="(itme,index) in projectData.wcqkList" :key="index" :departments='itme'></department>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import split from "@/components/split";
import department from "@/components/department";
import myFooter from "@/components/footer";
import { ERR_OK, get } from "@/utils/index";
export default {
  data() {
    return {
      queryData: "", // 从上级页面传来的值
      projectData: {}, // 本页面数据 res.data.data
      nodeList: [], // 节点列表 36状态
      className: [], // 36个节点颜色控制
      maxDate: [], // 最高效率数据
      maxEfficiency: [],
      minDate: [], // 最低效率数据
      minEfficiency: []
    };
  },
  mounted() {},
  methods: {
    scrolltolower() {},
    scroll(e) {},
    getData() {
      const url = "/app/newProject/summarize?projectId=" + this.queryData;
      const data = get(url);
      data.then(res => {
        if (res.code === ERR_OK) {
          this.projectData = res.data;
          this.nodeList = this.projectData.nodeList;
          this.maxDate = this.projectData.gxlList;
          this.minDate = this.projectData.dxlList;
        } else {
          wx.showToast({
            title: "加载失败",
            icon: "loading",
            duration: 2000
          });
        }
      });
    }
  },
  components: {
    split,
    department,
    myFooter
  },
  onLoad(option) {
    this.queryData = option.projectId;
    this.getData();
  },
  created() {},
  computed: {
    nodeListCount() {
      this.className = [];
      this.nodeList.map((val, index) => {
        if (val.nodeState === "0") {
          Object.assign(val, { className: "normal" });
          this.className.push(val);
        } else if (val.nodeState === "1") {
          Object.assign(val, { className: "limit" });
          this.className.push(val);
          // return "advance";
        } else if (val.nodeState === "2") {
          Object.assign(val, { className: "advance" });
          this.className.push(val);
          // return "limit";
        } else {
          Object.assign(val, { className: "no-startt" });
          this.className.push(val);
          // return "no-start";
        }
      });
    },
    maxDateFn() {
      this.maxEfficiency = [];
      this.maxDate.map((val, index) => {
        var maxArr = {};
        var i = val.gxljd.indexOf("(");
        var text = val.gxljd.substring(0, i);
        var num = val.gxljd.substring(i + 1, val.gxljd.length - 1);
        maxArr["text"] = text;
        maxArr["num"] = num;
        this.maxEfficiency.push(maxArr);
      });
    },
    minDateFn() {
      this.minEfficiency = [];
      this.minDate.map((val, index) => {
        var minArr = {};
        var i = val.gxljd.indexOf("(");
        var text = val.gxljd.substring(0, i);
        var num = val.gxljd.substring(i + 1, val.gxljd.length - 1);
        minArr["text"] = text;
        minArr["num"] = num;
        this.minEfficiency.push(minArr);
      });
    }
  },
  onUnload() {
    this.projectData = "";
  }
};
</script>
<style>
.end-project {
  width: 750rpx;
}
.header-wapper {
  position: relative;
  width: 750rpx;
  height: 260rpx;
  background: #02b0ff;
}
.header-wapper > .content {
  position: absolute;
  left: 24rpx;
  width: 705rpx;
  height: 297rpx;
  border-radius: 6px;
  background: #ffffff;
}
.header-wapper .project-name {
  position: relative;
  padding: 18rpx;
  height: 100rpx;
}
.header-wapper .project-name .name {
  position: absolute;
  top: 44rpx;
  padding: 2px;
  font-size: 12px;
  color: #6392fd;
  background: #e7eeff;
}
.header-wapper .project-name .container {
  margin-left: 80px;
  height: 100rpx;
  border-bottom: 1px solid #eeeeee;
}
.project-name .container .title {
  font-size: 18px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.project-name .container .major-count {
}
.project-name .major-count .major {
  display: inline-block;
  margin-right: 4px;
  padding: 0 4px;
  border-radius: 2px;
  font-size: 12px;
  background: #ff5a39;
  color: #ffffff;
}
.header-wapper .project-unit {
  position: relative;
  padding: 0 18rpx;
  height: 67rpx;
}
.header-wapper .project-unit .unit {
  position: absolute;
  top: 18rpx;
  padding: 0 4px;
  font-size: 12px;
  color: #6392fd;
  background: #e7eeff;
}
.header-wapper .project-unit .content {
  margin-left: 80px;
  height: 66rpx;
  border-bottom: 1px solid #eeeeee;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header-wapper .project-date {
  padding: 0 18rpx;
  height: 67rpx;
}
.header-wapper .project-date .date-start {
  display: inline-block;
  font-size: 14px;
  line-height: 57rpx;
}
.project-date .date-start .date {
  padding: 0 4px;
  margin-right: 10px;
  font-size: 12px;
  color: #6392fd;
  background: #e7eeff;
}
.project-date .date-start .content {
  margin-right: 20px;
  font-size: 16px;
}
.header-wapper .project-date .date-end {
  display: inline-block;
  margin-top: 35rpx;
  font-size: 16px;
}
.project-date .date-end .date {
  padding: 0 4px;
  margin-right: 10px;
  font-size: 12px;
  color: #6392fd;
  background: #e7eeff;
}
.split-head {
  width: 750rpx;
  height: 60rpx;
  background: #eeeeee;
}
/* 完成情况 */
.completion-wapper {
  width: 750rpx;
}
.completion-wapper .title {
  padding: 0 15px;
  font-size: 18px;
  line-height: 48px;
  border-bottom: 1px solid #eeeeee;
}
.completion-wapper .count-wapper {
  position: relative;
  width: 750rpx;
  height: 210rpx;
}
.completion-wapper .count-wapper .left {
  position: absolute;
  top: 10px;
  left: 60px;
  font-size: 46px;
  color: #c1c4d1;
}
.completion-wapper .count-wapper .right {
  position: absolute;
  bottom: -20px;
  right: 60px;
  font-size: 46px;
  color: #c1c4d1;
}
.completion-wapper .count-wapper .content {
  line-height: 210rpx;
  text-align: center;
  font-size: 14px;
}
.count-wapper .content .count {
  padding: 0 10px;
  font-size: 50px;
  color: #ff5a39;
}
.completion {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 14px;
}
.completion .complete {
  flex: 0 0 374rpx;
  border-top: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.completion .block {
  margin-left: 10px;
}
.completion .complete .block {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e3bf79;
}
/* .completion .complete .count {
  padding-left: 64px;
} */
.completion .name {
  padding-left: 15px;
  line-height: 42px;
  font-size: 16px;
}
.completion .count {
  padding-left: 80px;
}
.completion .advance {
  flex: 0 0 375rpx;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.completion .advance .block {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0588fe;
}
.completion .normal {
  flex: 0 0 374rpx;
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.completion .normal .block {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #05d680;
}
.completion .limit {
  flex: 0 0 375rpx;
  border-bottom: 1px solid #eeeeee;
}
.completion .limit .block {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff5a39;
}
/* 各节点 */
.each-node {
}
.each-node .title-wapper {
  position: relative;
  width: 750rpx;
  border-bottom: 1px solid #eeeeee;
}
.each-node .title-wapper .block {
  position: absolute;
  top: 15px;
  left: 10px;
  display: inline-block;
  width: 6px;
  height: 22px;
  border-radius: 4px;
  background: #3d8efd;
}
.each-node .title-wapper .title {
  margin-left: 20px;
  line-height: 50px;
  font-size: 18px;
}
.node-wapper {
}
/* 横向滚动 */
.page-section-spacing {
  margin-top: 60rpx;
}
.scroll-view_H {
  white-space: nowrap;
}
.scroll-x {
  display: flex;
  flex-direction: row;
  width: 750rpx;
}
.scroll-view-item {
  height: 300rpx;
}
.scroll-view-item_H {
  display: inline-block;
  width: 55rpx;
  height: 55rpx;
  line-height: 55rpx;
  margin: 15px 0 15px 15px;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
}
.scroll-x .no-start {
  background: #999999;
}
.scroll-x .advance {
  background: #0588fe;
}
.scroll-x .normal {
  background: #05d680;
}
.scroll-x .limit {
  background: #ff5a39;
}
/* 效率最高 */
.efficiency-max {
  width: 750rpx;
}
.efficiency-max .title-wapper {
  width: 100%;
  height: 89rpx;
  border-bottom: 1px solid #eeeeee;
}
.efficiency-max .title-wapper .icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-top: 26rpx;
  margin-left: 20px;
  background-image: url(http://img.huashitong.net/gov/max.png);
  background-size: 100% 100%;
}
.efficiency-max .title-wapper .title {
  display: inline-block;
  margin-left: 10px;
  line-height: 90rpx;
  font-size: 16px;
  vertical-align: top;
}
.efficiency-max .container-max {
  padding: 10px 20px 10px 20px;
}
.container-max .content .text {
  display: inline-block;
  line-height: 30px;
  font-size: 15px;
}
.container-max .content .accounted {
  float: right;
  margin-right: 30rpx;
  width: 260rpx;
  padding: 2px 4px;
  font-size: 14px;
  background: rgba(5, 136, 254, 0.1);
  color: #3d8efd;
}
/* 效率最低 */
.efficiency-min {
  width: 750rpx;
}
.efficiency-min .title-wapper {
  width: 100%;
  height: 89rpx;
  border-bottom: 1px solid #eeeeee;
}
.efficiency-min .title-wapper .icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-top: 26rpx;
  margin-left: 20px;
  background-image: url(http://img.huashitong.net/gov/min.png);
  background-size: 100% 100%;
}
.efficiency-min .title-wapper .title {
  display: inline-block;
  margin-left: 10px;
  line-height: 90rpx;
  font-size: 16px;
  vertical-align: top;
}
.efficiency-min .container-min {
  padding: 10px 20px 10px 20px;
}
.container-min .content .text {
  display: inline-block;
  line-height: 30px;
  font-size: 15px;
}
.container-min .content .accounted {
  float: right;
  margin-right: 30rpx;
  width: 260rpx;
  padding: 2px 4px;
  font-size: 14px;
  background: rgba(255, 90, 57, 0.1);
  color: #ff5a39;
}
/* 部门 */
.department-wapper > .title-wapper {
  width: 750rpx;
  border-bottom: 1px solid #eeeeee;
}
.department-wapper .title-wapper .title {
  margin-left: 10px;
  line-height: 50px;
  font-size: 18px;
}
/* footer
.footer {
  position: relative;
  width: 750rpx;
  height: 45px;
  background: #eeeeee;
}
.footer .line-left,
.line-right {
  width: 80px;
  height: 1px;
  border-top: 1px solid #999999;
}
.footer .line-left {
  position: absolute;
  left: 100rpx;
  top: 22px;
}
.footer .line-right {
  position: absolute;
  right: 100rpx;
  top: 22px;
}
.footer .text {
  line-height: 45px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
} */
</style>
