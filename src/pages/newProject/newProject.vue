<template>
  <div class="new-project">
    <p class="project-name line-bottom">
      <input type="text" placeholder="请输入项目名称" v-model="projectName" @blur="reg">
    </p>
    <p class="project-unit line-bottom">
      <input type="text" placeholder="请输入责任单位" v-model="projectUnit" @blur="reg">
    </p>
    <p class="project-lead line-bottom">
      <input type="text" placeholder="请输入分管领导" v-model="projectLead" @blur="reg">
    </p>
    <p class="project-price line-bottom">
      <input type="text" placeholder="请输入计划总投资" v-model="projectPrice" @blur="reg">
    </p>
    <p class="project-add line-bottom">
      <input type="text" placeholder="请输入初步选址" v-model="projectAdd" @blur="reg">
    </p>
        <p class="contact-name line-bottom">
      <input type="text" placeholder="请输入联系人" v-model="contactName" @blur="reg">
    </p>
    <p class="project-phone line-bottom">
      <input type="text" placeholder="请输入联系人电话" v-model="projectPhone" @blur="reg">
    </p>
    <p class="project-content line-bottom">
      <input type="text" placeholder="请输入建设内容" v-model="projectContet" @blur="reg">
    </p>
    <split></split>
    <pickerComponent :pickerValueArray="investment" :placeholderVal="investmentTitle" @onConfirm="investmentInput" @onCancel="investmentInput"></pickerComponent>
    <pickerComponent :pickerValueArray="industry" :placeholderVal="industryTitle" @onConfirm="industryInput" @onCancel="industryInput"></pickerComponent>
    <pickerComponent :pickerValueArray="progress" :placeholderVal="progressTitle" @onConfirm="progressInput" @onCancel="progressInput"></pickerComponent>
    <pickerComponent :pickerValueArray="project" :placeholderVal="projecTitle"  @onConfirm="projecInput" @onCancel="projecInput"></pickerComponent>
    <div class="submit" @click="submitBtn">提交</div>
  </div>
</template>
<script>
import split from "@/components/split";
import pickerComponent from "@/components/picker";
import mpvuePicker from "mpvue-picker";
import { ERR_OK, post } from "@/utils/index";
export default {
  data() {
    return {
      investment: [
        {
          label: "政府投资项目",
          value: 1
        },
        {
          label: "企业投资项目",
          value: 2
        },
        {
          label: "土地收储项目",
          value: 3
        }
      ],
      industry: [
        {
          label: "旅游特色小镇项目",
          value: 1
        },
        {
          label: "工业项目",
          value: 2
        },
        {
          label: "交通",
          value: 3
        },
        {
          label: "城镇基础设施",
          value: 4
        },
        {
          label: "安置房项目",
          value: 5
        },
        {
          label: "社会事业项目",
          value: 6
        },
        {
          label: "商住项目",
          value: 7
        },
        {
          label: "农林水利环保生态项目",
          value: 8
        }
      ],
      progress: [
        {
          label: "前期项目",
          value: 1
        },
        {
          label: "开工项目",
          value: 2
        },
        {
          label: "在建项目",
          value: 3
        },
        {
          label: "竣工项目",
          value: 4
        }
      ],
      project: [
        {
          label: "计划新开工项目",
          value: 1
        },
        {
          label: "结转项目",
          value: 2
        }
      ],
      investmentTitle: "请选择投资类型",
      industryTitle: "请选择行业分类",
      progressTitle: "请选择进度分类",
      projecTitle: "请选择项目分类",
      investmentVal: "",
      industryVal: "",
      progressVal: "",
      projecVal: "",
      projectName: "",
      projectUnit: "",
      projectLead: "",
      projectPrice: "",
      projectAdd: "",
      projectPhone: "",
      projectContet: "",
      contactName: "",
      userId: ""
    };
  },
  onLoad() {
    wx.getStorage({
      key: "userInfo",
      success: res => {
        this.userId = res.data.userId;
      }
    });
  },
  components: {
    split,
    mpvuePicker,
    pickerComponent
  },
  methods: {
    investmentInput(data) {
      if (data === "政府投资项目") {
        this.investmentVal = 0;
      } else if (data === "企业投资项目") {
        this.investmentVal = 1;
      } else if (data === "土地收储项目") {
        this.investmentVal = 2;
      } else {
        this.investmentVal = "";
      }
    },
    industryInput(data) {
      this.industryVal = data;
      if (data === "旅游特色小镇项目") {
        this.industryVal = 1001;
      } else if (data === "工业项目") {
        this.industryVal = 1002;
      } else if (data === "交通") {
        this.industryVal = 1003;
      } else if (data === "城镇基础设施") {
        this.industryVal = 1003;
      } else if (data === "安置房项目") {
        this.industryVal = 1004;
      } else if (data === "社会事业项目") {
        this.industryVal = 1006;
      } else if (data === "商住项目") {
        this.industryVal = 1007;
      } else if (data === "农林水利环保生态项目") {
        this.industryVal = 1008;
      } else {
        this.industryVal = "";
      }
    },
    progressInput(data) {
      this.progressVal = data;
      if (data === "前期项目") {
        this.progressVal = 3001;
      } else if (data === "开工项目") {
        this.progressVal = 3002;
      } else if (data === "在建项目") {
        this.progressVal = 3003;
      } else if (data === "竣工项目") {
        this.progressVal = 3004;
      } else {
        this.progressVal = "";
      }
    },
    projecInput(data) {
      this.projecVal = data;
      if (data === "计划新开工项目") {
        this.projecVal = 2001;
      } else if (data === "结转项目") {
        this.projecVal = 2002;
      } else {
        this.projecVal = "";
      }
    },
    submitBtn() {
      if (
        this.projectName.length > 0 &&
        this.projectUnit.length > 0 &&
        this.projectLead.length > 0 &&
        this.projectPrice.length > 0 &&
        this.projectAdd.length > 0 &&
        this.projectPhone.length > 0 &&
        this.projectContet.length > 0 &&
        this.contactName.length > 0 &&
        this.investmentVal !== "" &&
        this.industryVal !== "" &&
        this.progressVal !== "" > 0 &&
        this.projecVal !== "" > 0
      ) {
        const data = {
          name: this.projectName,
          resDept: this.projectUnit,
          resUser: this.projectLead,
          money: this.projectPrice,
          address: this.projectAdd,
          describes: this.projectContet,
          contactName: this.contactName,
          contactPhone: this.projectPhone,
          natureType: this.investmentVal,
          industryType: this.industryVal,
          schedCode: this.progressVal,
          projectType: this.projecVal,
          userId: this.userId
        };
        const projectNew = post("/app/newProject/addProject", data);
        projectNew.then(res => {
          if (res.code === ERR_OK) {
            wx.showToast({
              title: "创建项目成功", // 提示的内容,
              icon: "success", // 图标,
              duration: 2000, // 延迟时间,
              mask: true, // 显示透明蒙层，防止触摸穿透,
              success: res => {
                this.projectName = "";
                this.projectUnit = "";
                this.projectLead = "";
                this.projectPrice = "";
                this.projectAdd = "";
                this.projectPhone = "";
                this.projectContet = "";
                this.contactName = "";
              }
            });
          } else {
            wx.showToast({
              title: "创建项目失败", // 提示的内容,
              icon: "none", // 图标,
              duration: 2000, // 延迟时间,
              mask: true // 显示透明蒙层，防止触摸穿透,
            });
          }
        });
      } else {
        wx.showToast({
          title: "以上内容不能为空", // 提示的内容,
          icon: "none", // 图标,
          duration: 2000, // 延迟时间,
          mask: false // 显示透明蒙层，防止触摸穿透,
        });
      }
    },
    reg(e) {
      if (e.target.value === "") {
        wx.showToast({
          title: "此行不能为空", // 提示的内容,
          icon: "none", // 图标,
          duration: 2000, // 延迟时间,
          mask: false // 显示透明蒙层，防止触摸穿透,
        });
      }
    }
  }
};
</script>
<style>
.new-project {
  width: 750rpx;
  padding-bottom: 40rpx;
}
.new-project .line-bottom {
  border-bottom: 1px solid #eeeeee;
}
.new-project .line-bottom input {
  width: 710rpx;
  padding: 20rpx;
  font-size: 16px;
}
.submit {
  width: 220rpx;
  height: 70rpx;
  margin: 0 auto;
  margin-top: 50rpx;
  line-height: 70rpx;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  background: #02b0ff;
  color: #ffffff;
}
</style>
