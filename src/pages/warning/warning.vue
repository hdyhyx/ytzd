<template>
  <div class="warning">
    <warning v-if="warningList" v-for="(item,index) in warningList" :key="index" :warningData="item"></warning>
    <no-data v-if="!warningList"></no-data>
  </div>
</template>
<script>
import warning from "@/components/warning";
import noData from "@/components/noData";
import { ERR_OK, post } from "@/utils/index";
export default {
  data() {
    return {
      userId: null,
      currentPage: 0,
      warningList: []
    };
  },
  components: {
    warning,
    noData
  },
  onLoad() {
    wx.getStorage({
      key: "userInfo",
      success: res => {
        this.userId = res.data.userId;
      }
    });
  },
  methods: {
    getData() {
      const data = post("/app/earlyWarningNode/queryEarlyWarningNode", {
        sysid: this.userId,
        currentPage: this.currentPage
      });
      data.then(res => {
        if (res.code === ERR_OK) {
          this.warningList = res.data;
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style>
</style>

