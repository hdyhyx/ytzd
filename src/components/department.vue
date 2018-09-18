<template>
  <div class="department">
      <div class="title-wapper">
        <span class="block"></span>
        <span class="title">{{departments.dept}}</span>
      </div>
      <div class="content-wapper">
        <div class="task-count">
          <div class="total">
            <span class="text">总任务数</span>
            <span class="count">{{departments.allNodeNum}}个</span>
          </div>
          <div class="completed">
            <span class="text">已完成</span>
            <span class="count">{{departments.finishNodeNum}}个</span>
          </div>
          <div class="unfinished">
            <span class="text">未完成</span>
            <span class="count">{{departments.unFinishNodeNum}}个</span>
          </div>
        </div>
        <div class="task-details">
          <div class="advance">
            <div class="text">超前项目</div>
            <div class="count">{{departments.leadingDate}}</div>
          </div>
          <div class="normal">
            <div class="text">正常项目</div>
            <div class="count">{{departments.normalNodeNum}}</div>
          </div>
          <div class="limit">
            <div class="text">逾期项目</div>
            <div class="count">{{departments.delayNodeNum}}</div>
          </div>
        </div>
        <div class="project-date">考核情况:超前{{departments.leadingDate}}天</div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    departments: {
      type: Object,
      default: () => ({
        title: "暂无项目"
      })
    }
  },
  created() {}
};
</script>
<style scoped>
.department {
  width: 750rpx;
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}
.department .title-wapper {
  position: relative;
  width: 750rpx;
}
.department .title-wapper .block {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-block;
  width: 6px;
  height: 18px;
  border-radius: 4px;
  background: #3d8efd;
}
.department .title-wapper .title {
  margin-left: 20px;
  line-height: 36px;
  font-size: 16px;
}
.department .content-wapper {
}
.department .content-wapper .task-count {
  display: flex;
  justify-content: space-between;
  width: 570rpx;
  margin: 0 auto;
}
.content-wapper .task-count .total {
  font-size: 14px;
}
.content-wapper .task-count .completed {
  font-size: 14px;
}

.content-wapper .task-count .unfinished {
  font-size: 14px;
}
.task-count .text {
  font-size: 14px;
  line-height: 28px;
}
.task-count .count {
  padding-left: 5px;
  font-size: 16px;
  color: #ff5a39;
}

.task-details {
  display: flex;
  width: 570rpx;
  height: 120rpx;
  padding: 5px 10px;
  justify-content: space-between;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  background: #f7fbfd;
}
.task-details .text {
  text-align: center;
  line-height: 38px;
  font-size: 14px;
}
.task-details .count {
  font-size: 16px;
}
.task-details .limit .count {
  color: #ff5a39;
}
.project-date {
  width: 570rpx;
  margin: 0 auto;
  margin-top: 15px;
  text-align: right;
  font-size: 16px;
}
</style>


