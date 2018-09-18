<template>
  <div>
    <ul class="list">
      <li class="list-itme"  :class="{open:isOpen}">
        <input class="investment" disabled type="text" v-model="zfVal" @change="inputVal" :placeholder="placeholderVal" @click="openSelect">
        <div class="mpvue-picer" v-show="ispicer">
          <p @click="showPicker"></p>
          <mpvue-picker ref="mpvuePicker" :mode="mode" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import mpvuePicker from "mpvue-picker";
export default {
  data() {
    return {
      mode: "selector",
      pickerValueDefault: [0],
      zfVal: "",
      isOpen: false,
      ispicer: true
    };
  },
  props: {
    pickerValueArray: {
      type: Array,
      default: function() {
        return [{ label: "暂无选项", value: 1 }];
      }
    },
    placeholderVal: {
      type: String,
      default: ""
    }
  },
  components: {
    mpvuePicker
  },
  methods: {
    showPicker() {
      this.$refs.mpvuePicker.show();
      this.isOpen = true;
    },
    onConfirm(e) {
      this.zfVal = e.label;
      this.isOpen = false;
      this.ispicer = false;
      this.$emit("onConfirm", this.zfVal);
    },
    onChange(e) {
      // console.log(e, 222);
      // this.zfVal = "";
    },
    onCancel(e) {
      this.zfVal = "";
      this.isOpen = false;
      this.$emit("onCancel", this.zfVal);
    },
    openSelect() {
      this.$refs.mpvuePicker.show();
      this.isOpen = true;
      this.ispicer = true;
    }
  }
};
</script>

<style>
.list .list-itme {
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
}
.list .list-itme:after {
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
.list .open:after {
  transform: rotate(-225deg);
  top: 18px;
  transition: all 0.3s ease-in-out;
}
.content {
  padding-left: 30px;
  transition: all 5s linear;
}
.mpvue-picer {
  position: absolute;
  top: 20rpx;
  right: 50rpx;
  width: 240rpx;
  font-size: 16px;
}
.investment {
  font-size: 16px;
}
</style>
