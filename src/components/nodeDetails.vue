<template>
  <div class="node-wapper">
    <ul class="list" v-for="(item,index) in nodeData " :key="index">
      <li class="list-itme" v-if="item.childNodesList!=''" @click="openItem(item)" :class="{open:item.isopen}">
        <span class="disc" :class="item.className"></span>
        {{item.nodeId}}.{{item.nodeName}}</li>
      <ul class="content"  v-show="item.isopen" v-for="(val,i) in item.childNodesList" :key="i">
        <li class="text" @click="isMask(val)">
          <span class="disc" :class="val.className"></span>
          {{val.nodeName}}</li>
      </ul>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isContent: [],
      open: false,
      node: []
    };
  },
  methods: {
    openItem(item) {
      item.isopen = !item.isopen;
      this.open = item.isopen;
    },
    isMask(val) {
      this.isShowMask = true;
      Object.assign(val, { isShowMask: true });
      this.$emit("isMask", val);
    }
  },
  props: {
    nodeData: {
      type: Object
    },
    isShowMask: {
      type: Boolean,
      default: false
    }
  },
  onUnload() {
    this.node = "";
  },
  computed: {
    discBg(node) {
      this.nodeData.forEach((val, index) => {
        if (val.isDelay === "0") {
          Object.assign(val, { className: "normal" });
        } else if (val.isDelay === "1") {
          Object.assign(val, { className: "limit" });
        } else if (val.isDelay === "2") {
          Object.assign(val, { className: "advance" });
        } else if (val.isDelay === "3") {
          Object.assign(val, { className: "ongoing" });
        } else {
          Object.assign(val, { className: "no-startt" });
        }
        val.childNodesList.forEach((item, i) => {
          if (item.isDelay === "0") {
            Object.assign(item, { className: "normal" });
          } else if (item.isDelay === "1") {
            Object.assign(item, { className: "limit" });
          } else if (item.isDelay === "2") {
            Object.assign(item, { className: "advance" });
          } else if (val.isDelay === "3") {
            Object.assign(val, { className: "ongoing" });
          } else {
            Object.assign(item, { className: "no-startt" });
          }
        });
      });
    }
  }
};
</script>
<style>
.node-wapper {
  width: 750rpx;
  margin-top: 20px;
  background: #ffffff;
}
.node-wapper .list {
  font-size: 16px;
}
.node-wapper .list .list-itme {
  position: relative;
  padding: 10px 25px;
  border-bottom: 1px solid #eeeeee;
}
.node-wapper .list .list-itme:after {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-left: 1px #ccc solid;
  border-bottom: 1px #ccc solid;
  position: absolute;
  top: 11px;
  right: 12px;
  transform: rotate(-45deg);
  transition: transform 0.3 ease-out, top 0.3s ease-out;
}
.node-wapper .list .open:after {
  transform: rotate(-225deg);
  top: 18px;
  transition: all 0.3s ease-in-out;
}
.node-wapper .content {
  padding-left: 30px;
  transition: all 5s linear;
}
.node-wapper .content .text {
  position: relative;
  font-size: 14px;
  padding: 10px 0 10px 25px;
  border-bottom: 1px solid #eeeeee;
}
.disc {
  position: absolute;
  left: 15rpx;
  top: 50%;
  margin-top: -12rpx;
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: #666666;
}
.node-wapper .no-start {
  background: #999999;
}
.node-wapper .advance {
  background: #05d680;
}
.node-wapper .normal {
  background: #0588fe;
}
.node-wapper .limit {
  background: #ff5a39;
}
.node-wapper .ongoing {
  background: #fdd835;
}
</style>
