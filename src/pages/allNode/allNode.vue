<template>
  <div class="all-node">
    <div class="node-wapper" v-for="(list,index) in projectAll" :key="index">
      <lookProject v-for="(item,i) in list" :key="i" :projectDate="item"></lookProject>
    </div>
    <my-footer v-if="isFooter"></my-footer>
  </div>
</template>
<script>
import lookProject from "@/components/lookProject";
import { ERR_OK, post } from "@/utils/index";
import myFooter from "@/components/footer";
export default {
  data() {
    return {
      currentPage: 1, // 当前页码
      projectAll: []
    };
  },
  methods: {
    getData() {
      const data = post("/app/newProject/allProject", {
        currentPage: this.currentPage
      });
      data.then(res => {
        if (res.code === ERR_OK) {
          if (res.data !== undefined) {
            this.projectAll.push(res.data);
          } else {
            this.isFooter = true;
          }
        }
      });
    }
  },
  mounted() {
    this.getData();
  },
  components: {
    lookProject
  },
  onReachBottom() {
    this.currentPage++;
    this.getData();
  },
  onUnload() {
    this.isFooter = false;
    this.projectAll = [];
    this.currentPage = 1;
  }
};
</script>
<style>
.all-node {
  width: 100%;
  height: 100%;
  padding: 10px 0 30px 0;
  background: #eeeeee;
}
node-wapper {
  background: #eeeeee;
}
</style>
