<template>
  <div class="project-end">
    <div class="project-list"  v-for="(itme,index) in data" :key="index">
      <all-end-project-item :title="itme.title" :data="itme"></all-end-project-item>
    </div> 
  </div>
</template>
<script>
import allEndProjectItem from "@/components/allEndProjectItem";
import { ERR_OK, get } from "@/utils/index";
export default {
  data() {
    return {
      data: {}
    };
  },
  components: {
    allEndProjectItem
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const data = get("/app/newProject/finishProject", {});
      data.then(res => {
        if (res.code === ERR_OK) {
          this.data = res.data.finishProjectList;
        }
      });
    }
  }
};
</script>
<style>
.project-end {
  width: 100%;
  height: 667px;
  background: #eeeeee;
}
</style>

