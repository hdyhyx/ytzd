<template>
  <div class="project">
    <div class="project-list">
        <industry-project v-for="(item,i) in projectData" :key="i" :industry="item" :index="i"></industry-project>
    </div>
    <my-footer v-if="isShow"></my-footer>
  </div>
</template>
<script>
import industryProject from "@/components/industryProject";
import myFooter from "@/components/footer";
import { ERR_OK, post } from "@/utils/index.js";
export default {
  data() {
    return {
      projectType: "",
      currentPage: 1,
      projectData: [],
      count: [],
      isShow: false
    };
  },
  methods: {
    getData() {
      const data = post("/app/newProject/allProject", {
        projectType: this.projectType,
        currentPage: this.currentPage
      });
      data.then(res => {
        if (res.code === ERR_OK) {
          this.projectData = res.data;
        }
      });
    },
    onReach() {
      const data = post("/app/newProject/allProject", {
        projectType: this.projectType,
        currentPage: this.currentPage
      });
      data.then(res => {
        if (res.code === ERR_OK) {
          if (res.data !== undefined) {
            this.projectData = this.projectData.concat(res.data);
          } else {
            this.isShow = true;
          }
        }
      });
    }
  },
  onLoad(option) {
    this.projectType = option.title;
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
    this.currentPage = 1;
    this.projectData = [];
    this.isShow = false;
  }
};
</script>
<style>
.project {
  width: 750rpx;
  background: #f5f5f5;
}
.project-list {
  padding: 1rpx 0 0 0;
  background: #f5f5f5;
}
</style>
