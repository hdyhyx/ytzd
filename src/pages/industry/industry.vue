<template>
  <div class="industry">
    <div class="industry-title">
      <h1 class="title">{{title}}</h1>
      <div class="content">
        <div class="text">计划总投资额(万)</div>
        <div class="count">{{price}}</div>
        <!-- <div class="years-plan-count">年度计划投资59.99亿</div>
        <div class="years-reality-count">年度实际投资58.88亿</div> -->
      </div>
    </div>
    <div v-for="(item,i) in industrList" :key="i">
      <industry-project :industry="item" :index="i"></industry-project>
    </div>
    <my-footer v-if="isFooter"></my-footer>
  </div>
</template>
<script>
import industryProject from "@/components/industryProject";
import { ERR_OK, post } from "@/utils/index";
import myFooter from "@/components/footer";
export default {
  data() {
    return {
      title: "",
      isMore: Boolean,
      industrType: null,
      currentPage: 1,
      industrList: [],
      isFooter: false,
      price: 0
    };
  },
  methods: {
    getData() {
      const data = post("/app/newProject/allProject", {
        currentPage: this.currentPage,
        industryType: this.industrType
      });
      data.then(res => {
        if (res.code === ERR_OK) {
          if (res.data !== undefined) {
            this.industrList = res.data;
          }
        }
      });
    },
    onReach() {
      this.currentPage + 1;
      const data = post("/app/newProject/allProject", {
        currentPage: this.currentPage,
        industryType: this.industrType
      });
      data.then(res => {
        if (res.code === ERR_OK) {
          if (res.data !== undefined) {
            this.industrList = this.industrList.concat(res.data);
          } else {
            this.isFooter = true;
          }
        }
      });
    }
  },
  onLoad(option) {
    this.title = option.title;
    this.industrType = option.industrType;
    this.price = option.price;
    this.getData();
  },
  components: {
    industryProject,
    myFooter
  },
  onReachBottom() {
    this.currentPage++;
    this.onReach();
  },
  onUnload() {
    this.isFooter = false;
    this.currentPage = 1;
    this.industrList = [];
  }
};
</script>
<style scoped>
.industry {
  width: 750rpx;
  background: #f5f5f5;
}
.industry-title {
  width: 720rpx;
  height: 350rpx;
  margin-bottom: 15px;
  padding-left: 30rpx;
  background-image: url("http://img.huashitong.net/gov/project.png");
  background-size: 100% 100%;
  color: #ffffff;
}
.industry-title .title {
  line-height: 56px;
  font-size: 32px;
  letter-spacing: 2px;
}
.industry-title .content {
  margin-top: 15px;
}
.industry-title .text {
  font-size: 14px;
}
.industry-title .count {
  line-height: 30px;
  font-size: 30px;
  font-weight: 600;
}
/* .industry-title .years-plan-count {
  line-height: 22px;
  font-size: 16px;
}
.industry-title .years-reality-count {
  line-height: 22px;
  font-size: 16px;
} */
</style>
