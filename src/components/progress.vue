<template>
  <div class="progress-wapper">
    <!-- <div>{{departments.title}}</div> -->
    <div @click="routerProject">
      <div class="content">
        <div class="title">{{industrys.industryType}}</div>
        <div class="count">{{industrys.num}}项</div>
      </div>
      <div class="progress">
        <div class="perform" :style="{width:percentage+'%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {},
  props: {
    industrys: {
      type: Object,
      default: () => ({
        industryType: "暂无项目"
      })
    }
  },
  methods: {
    routerProject() {
      var industryData = {};
      Object.assign(industryData, {
        title: this.industrys.industryType,
        industryType: this.industrys.natureType,
        price: this.industrys.doble
      });
      console.log(industryData);
      this.$emit("routerProject", industryData);
    }
  },
  computed: {
    percentage() {
      return (
        this.industrys.schednormalNum / this.industrys.schednormalNum * 100
      );
    }
  }
};
</script>
<style scoped>
.progress-wapper {
  width: 100%;
  height: 50px;
  margin: 15px 0;
}
.progress-wapper .content {
  padding: 0 26px;
}
.progress-wapper .content .title {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
}
.progress-wapper .content .count {
  display: inline-block;
  width: 56px;
  height: 20px;
  margin-left: 14px;
  line-height: 20px;
  border-radius: 5px;
  font-size: 16px;
  background: #ff4545;
  color: #fff;
}
.progress-wapper .progress {
  position: relative;
  width: 690rpx;
  height: 12px;
  border-radius: 6px;
  margin: 0 auto;
  margin-top: 10px;
  background: #aee0ef;
}
.progress-wapper .progress .perform {
  position: absolute;
  height: 12px;
  border-radius: 6px;
  background: #4faaff;
}
</style>
