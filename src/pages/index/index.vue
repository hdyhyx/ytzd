
<template>
  <div class="index">
    <div class="banner-wapper">
      <div class="banner">
        <img class="banner1" src="http://img.huashitong.net/gov/banner.png" style="width:750rpx;height:234rpx">
      </div>
      <div class="container-wapper">
        <p class="symbol">"</p>
        <div class="text-wapper">
          <p class="city">永泰县</p>
          <p class="text">重大节点项目管理</p>
        </div>
        <p class="title">Project Management</p>
      </div>
    </div>
    <div class="tab-apper">
      <div class="tab-left" @click="routerEndproject">
        <img src="http://img.huashitong.net/gov/tick.png" style="width:132rpx;height:132rpx">
        <p class="text">任务完结</p>
      </div>
      <div class="tab-middle" @click="routernewProject">
        <img src="http://img.huashitong.net/gov/col.png" style="width:132rpx;height:132rpx" >
        <p class="text">创建项目</p>
      </div>
      <div class="tab-right" @click="routerWarning">
        <img src="http://img.huashitong.net/gov/warning.png" style="width:132rpx;height:132rpx">
        <p class="text">项目预警</p>
      </div>
    </div>
    <split></split>
    <div class="project-wapper">
      <heads :title="title"></heads>
      <div class="project-ec">
        <mpvue-echarts :echarts="echarts" :onInit="ecProjectPieInit" canvasId="projectPie" />
      </div>
      <div class="project-count">
            <div class="already">已开工项目：{{ecData.start.vla}}项</div>
          <div class="starts">未开工项目：{{ecData.notStar.vla}}项</div>
      </div>
      <div class="project-plan">
         <div class="plan-img"></div>
        <div class="content-count">
          <div class="text">重点项目</div>
          <div class="count">{{focusProject}}项</div>
        </div>
        <div class="content-price">
          <div class="text">计划总投资</div>
          <div class="price">{{plannedInvestment}}亿</div>
        </div>
      </div>
      <div class="project-situation">
        <navigator :url="'/pages/project/project?title='+planStartEnd[0].centerDataCode">
        <div class="container-wapper">
          <div class="content">
            <div class="block"></div>
            <div class="title">计划新开工项目</div>
            <div class="text">
              <span class="starts">开工{{planStartEnd[0].startWorkNum}}项</span>
              <span class="work">未开工{{planStartEnd[0].notStartWorkNum}}项</span>
            </div>
          </div>
        </div>
        </navigator>
         <navigator :url="'/pages/project/project?title='+planStartEnd[1].centerDataCode">
        <div class="container-wapper">
          <div class="content">
            <div class="block"></div>
            <div class="title">结转项目</div>
            <div class="text">
              <span class="starts">开工{{planStartEnd[1].startWorkNum}}项</span>
              <span class="work">未开工{{planStartEnd[1].notStartWorkNum}}项</span>
            </div>
          </div>
        </div>
        </navigator>
      </div>
    </div>
    <split></split>
    <div class="industry-wapper">
      <heads  :title="industryTitle"></heads>
      <pro v-for="(itme,index) in industry" :key="index" :industrys='itme' @routerProject="routerIndustry"></pro>
    </div>
    <div class="project-state">
        <img src="http://img.huashitong.net/gov/background-img.png" style="width:636rpx;height:92px;background:#F7FBFD">
        <div class="content-count">
          <div class="text">超前项目</div>
          <div class="count">{{leadingCount}}项</div>
        </div>
        <div class="content-count">
          <div class="text">正常项目</div>
          <div class="count">{{normalCount}}亿</div>
        </div>
        <div class="content-count">
          <div class="text">逾期项目</div>
          <div class="count">{{overdueCount}}亿</div>
        </div>
    </div>
    <split></split>
    <div class="nav-project">
      <div class="nav-img"></div>
      <div class="container">
        <div class="title">查看所有</div>
        <div class="text">重大项目节点</div>
        <!-- <div class="link-btn" @click="routerAllNode">去看看</div> -->
       <navigator class="link-btn" url="/pages/allNode/allNode">去看看</navigator>
      </div>
    </div>
    <div class="footer">
      <div class="line-left"></div>
      <div class="logo"></div>
      <div class="text">重大项目节点管理系统</div>
      <div class="line-right"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import mpvueEcharts from "mpvue-echarts";
import split from "@/components/split";
import heads from "@/components/projectHead";
import pro from "@/components/progress";
import { ERR_OK, get } from "@/utils/index";
let ecPie;
function getPieOption(opt) {
  return {
    series: [
      {
        type: "pie",
        radius: ["40%", "80%"],
        center: ["50%", "53%"],
        color: ["#ffea39", "#02b0ff"],
        data: [
          { value: opt.notStar.vla, name: opt.notStar.name },
          { value: opt.start.vla, name: opt.start.name }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        label: {
          normal: {
            textStyle: {
              color: "rgb(0, 0, 0)"
            },
            formatter: function(name) {
              if (name.name === "未开工项目") {
                return name.name + ":" + name.data.value + "项";
              } else {
                return name.name + ":" + name.data.value + "项";
              }
            }
          }
        }
      }
    ]
  };
}

export default {
  data() {
    return {
      echarts,
      title: "重大项目",
      industryTitle: "重大项目按行业分类",
      a: 10,
      b: 10,
      ecData: {},
      focusProject: "", // 重点项目
      plannedInvestment: "", // 计划投资额
      planStartEnd: {}, // 计划开始，结转项目
      endProject: {}, // 结束项目
      industry: [], //
      newAndEnd: [], // 新开工跟结转项目
      branchType: null, // 角色类型  0业主单位
      role: null // 角色分类 经办人 才可以创建项目
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    ecProjectPieInit(canvas, width, height) {
      ecPie = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(ecPie);

      ecPie.setOption(getPieOption(this.ecData));
      return ecPie;
    },
    routerEndproject() {
      const url = "/pages/allEndProject/allEndProject";
      // const url = "/pages/login/login";
      wx.navigateTo({ url });
    },
    routerIndustry(data) {
      console.log(data);
      const url =
        "/pages/industry/industry?title=" +
        data.title +
        "&industrType=" +
        data.industryType +
        "&price=" +
        data.price;
      wx.navigateTo({ url });
    },
    routernewProject() {
      if (this.branchType === "0" && this.role === "经办人") {
        const url = "/pages/newProject/newProject";
        wx.navigateTo({ url });
      } else {
        wx.showModal({
          title: "提示",
          content: "您不需要创建项目",
          showCancel: false
        });
      }
    },
    routerWarning() {
      const url = "/pages/warning/warning";
      wx.navigateTo({ url });
    },
    // index 请求
    getTest() {
      return new Promise((resolve, reject) => {
        const data = get("/app/newProject/appNewIndex", {});
        data.then(res => {
          if (res.code === ERR_OK) {
            resolve(res.data);
          } else {
            resolve(res.code);
          }
        });
      });
    },
    getData() {
      const data = get("/app/newProject/appNewIndex", {});
      data.then(res => {
        if (res.code === ERR_OK) {
          this.ecData["notStar"] = {
            vla: res.data.notStartWorkNum,
            name: "未开工项目"
          };
          this.ecData["start"] = {
            vla: res.data.startWorkNum,
            name: "已开工项目"
          };
          this.focusProject = res.data.focusProject;
          this.plannedInvestment = res.data.plannedInvestment;
          this.planStartEnd = res.data.centerDataList;
          this.industry = res.data.industryList;
        } else {
          wx.showModal({
            title: "提示",
            content: "网络加载出现问题",
            showCancel: false
          });
        }
      });
    }
  },
  components: {
    mpvueEcharts,
    split,
    heads,
    pro
  },
  onLoad() {
    wx.getStorage({
      key: "userInfo",
      success: res => {
        this.branchType = res.data.branchType;
        this.role = res.data.role;
      }
    });
  },
  computed: {
    leadingCount() {
      var leading = 0;
      this.industry.map((val, index) => {
        leading += parseInt(val.schedleadingNum);
      });
      return leading;
    },
    normalCount() {
      var normalVal = 0;
      this.industry.map((val, index) => {
        normalVal += parseInt(val.schednormalNum);
      });
      return normalVal;
    },
    overdueCount() {
      var overdueVal = 0;
      this.industry.map((val, index) => {
        overdueVal += parseInt(val.schedoverdueNum);
      });
      return overdueVal;
    }
  },
  onPullDownRefresh() {
    this.getTest().then(res => {
      wx.stopPullDownRefresh();
      this.ecData["notStar"] = {
        vla: res.data.notStartWorkNum,
        name: "未开工项目"
      };
      this.ecData["start"] = {
        vla: res.data.startWorkNum,
        name: "已开工项目"
      };
      this.focusProject = res.data.focusProject;
      this.plannedInvestment = res.data.plannedInvestment;
      this.planStartEnd = res.data.centerDataList;
      this.industry = res.data.industryList;
    });
  }
};
</script>

<style>
.banner-wapper {
  position: relative;
  width: 100%;
  height: 234rpx;
}
.banner-wapper .banner {
  position: absolute;
  width: 750rpx;
  height: 234rpx;
}
.banner1 {
  position: absolute;
  z-index: -1;
}
.banner-wapper .container-wapper {
  padding: 0 30px;
}
.banner-wapper .container-wapper .symbol {
  position: absolute;
  font-size: 99rpx;
  color: #eeeeee;
}
.banner-wapper .container-wapper .title {
  font-size: 24rpx;
  color: #eeeeee;
  font-weight: 900;
}
.container-wapper .text-wapper {
}
.container-wapper .text-wapper .city {
  padding-top: 35px;
}

/* 导航 */
.tab-apper {
  display: flex;
  width: 100%;
  height: 234rpx;
  flex-direction: row;
}
.tab-apper .tab-left,
.tab-middle,
.tab-right {
  flex: 0 0 250rpx;
  text-align: center;
  font-size: 12px;
}
.tab-apper .text {
  margin-top: 5px;
}
.tab-apper img {
  margin-top: 15px;
}
/* 项目 */
.project-wapper {
  width: 100%;
  margin-bottom: 26px;
}
.project-wapper .project-ec {
  width: 100%;
  height: 330rpx;
}
.project-wapper .project-count {
  width: 630rpx;
  height: 63rpx;
  margin: 0 auto;
  margin-top: 20px;
}
.project-wapper .project-count .already {
  display: inline-block;
  margin-right: 5px;
  width: 300rpx;
  height: 100%;
  line-height: 63rpx;
  border-radius: 20px;
  font-size: 14px;
  background: #438ffd;
  text-align: center;
  color: #fff;
}
.project-wapper .project-count .starts {
  display: inline-block;
  width: 300rpx;
  height: 100%;
  margin-left: 5px;
  border-radius: 20px;
  border: 1px solid #eeeeee;
  line-height: 63rpx;
  font-size: 14px;
  text-align: center;
}
.project-wapper .project-plan {
  position: relative;
  display: flex;
  width: 630rpx;
  height: 144rpx;
  padding: 0 60rpx 0 60rpx;
  margin: 0 auto;
  margin-top: 22px;
}
.project-wapper .project-plan .plan-img {
  position: absolute;
  width: 636rpx;
  height: 92px;
  background-image: url("http://img.huashitong.net/gov/background-img.png");
  background-color: #ebf5fd;
  background-size: 100% 100%;
  z-index: -1;
}
.project-wapper .project-plan .content-count {
  flex: 0 0 50%;
  text-align: center;
}
.project-wapper .project-plan .content-price {
  flex: 0 0 50%;
  text-align: left;
}
.project-wapper .content-count .text {
  line-height: 50px;
  font-size: 16px;
}
.project-wapper .content-count .count {
  line-height: 30px;
  font-size: 16px;
  color: #ff4545;
}
.project-wapper .content-price .text {
  line-height: 50px;
  font-size: 16px;
  text-align: center;
}
.project-wapper .content-price .price {
  line-height: 30px;
  font-size: 16px;
  color: #ff4545;
  text-align: center;
}
.project-wapper .project-situation {
  margin-top: 50px;
  width: 100%;
  height: 115px;
}
.project-situation .content {
  position: relative;
  width: 630rpx;
  margin: 0 auto;
  padding: 15px 0 15px 0;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  font-size: 16px;
}
.project-wapper .project-situation .block {
  position: absolute;
  top: 15px;
  width: 5px;
  height: 20px;
  border-radius: 2px;
  background: #438ffd;
}
.project-situation .content .title {
  display: inline-block;
  padding-left: 10px;
}
.project-situation .content .text {
  float: right;
  font-size: 14px;
}
.project-situation .content .text .starts {
  margin-right: 15rpx;
}
.project-situation .container-wapper:last-child .content {
  border-top: none;
}
/* 项目状态 */
.project-state {
  position: relative;
  display: flex;
  width: 630rpx;
  height: 144rpx;
  padding: 0 60rpx 0 60rpx;
  margin: 0 auto;
  margin-top: 22px;
  margin-bottom: 40px;
}
.project-state img {
  position: absolute;
  z-index: -1;
}
.project-state .content-count {
  flex: 0 0 215rpx;
  text-align: center;
}
.project-state .content-count .text {
  line-height: 50px;
  font-size: 16px;
}
.project-state .content-count .count {
  line-height: 30px;
  font-size: 16px;
  color: #ff4545;
}
/* 查看节点 */
.nav-project {
  position: relative;
  width: 750rpx;
  height: 162rpx;
}
.nav-project .nav-img {
  position: absolute;
  width: 138rpx;
  height: 110rpx;
  top: 25rpx;
  left: 40rpx;
  background-image: url("http://img.huashitong.net/gov/look.png");
  background-size: 100% 100%;
}
.nav-project .container {
  margin-left: 216rpx;
}
.nav-project .container .title {
  padding-top: 30rpx;
  font-size: 14px;
  color: #438ffd;
}
.nav-project .container .text {
  font-size: 16px;
}
.nav-project .container .link-btn {
  position: absolute;
  right: 52rpx;
  top: 50rpx;
  width: 126rpx;
  height: 52rpx;
  line-height: 52rpx;
  border: 1px solid #00b0fe;
  border-radius: 14px;
  font-size: 14px;
  text-align: center;
  color: #438ffd;
}
/* footer */
.footer {
  position: relative;
  width: 750rpx;
  height: 45px;
  background: #eeeeee;
}
.footer .line-left,
.line-right {
  width: 50px;
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
  position: absolute;
  left: 260rpx;
  line-height: 45px;
  font-size: 14px;
}
.footer .logo {
  position: absolute;
  left: 215rpx;
  top: 15px;
  width: 15px;
  height: 15px;
  background-image: url("http://img.huashitong.net/gov/min-logo.png");
  background-size: 100% 100%;
}
/* 跳转链接样式 */
.router-block {
  display: inline-block;
}
</style>