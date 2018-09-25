<template>
  <div class="message">
    <messageComponents v-if="messageData" v-for="(item,index) in messageData" :key="index" :messageItem="item"></messageComponents>
    <no-data v-if="!messageData"></no-data>
  </div>
</template>
<script>
import messageComponents from "@/components/message";
import noData from "@/components/noData";
import { post, ERR_OK } from "@/utils/index.js";
export default {
  data() {
    return {
      userId: null,
      page: 1,
      messageData: []
    };
  },
  components: {
    messageComponents,
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
      const data = post("/api/project/queryUserMessage", {
        userId: this.userId,
        phone: "",
        page: this.page
      });
      data.then(res => {
        if (res.code === ERR_OK) {
          this.messageData = res.data;
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
.message {
  height: 1334rpx;
  background-color: #f5f5f5;
}
</style>
