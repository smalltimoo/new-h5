<template>
  <div class="main-body option">
    <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div style="margin-top: 44px">
      <div class="title">{{$t('agent.openInvitation.openInvitation0')}}</div>
      <div class="mui-input-group panel">
        <div style="text-align: left">{{ $t('agent.openInvitation.openInvitation2')}}</div>
        <el-select
          v-model="vm.linkType"
          :placeholder=" $t('agent.openInvitation.openInvitation14')"
          class="ipt"
        >
          <el-option
            v-for="item in memberTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="title" v-if="vm.linkType==2">{{ $t('agent.openInvitation.openInvitation5')}}</div>
      <div class="panel" v-if="vm.linkType==2">
        <span>{{ $t('agent.openInvitation.openInvitation6')}}</span>
        <input
          v-model="vm.profitRebate"
          type="number"
          :placeholder="'分红比例不能大于'+dataList.profitRebate+'%'"
          class="ipt"
        >
      </div>
      <div class="panel" v-if="vm.linkType==2">
        <span>{{ $t('agent.openInvitation.openInvitation7')}}</span>
        <input
          v-model="vm.rakebackRebate"
          type="number"
          :placeholder="'返水扣除不能小于'+dataList.rakebackRebate+'%'"
          class="ipt"
        >
      </div>
      <div class="panel" v-if="vm.linkType==2">
        <span>{{ $t('agent.openInvitation.openInvitation8')}}</span>
        <input
          v-model="vm.benefitAmountRebate"
          type="number"
          :placeholder="'优惠金额扣除不能小于'+dataList.benefitAmountRebate+'%'"
          class="ipt"
        >
      </div>
      <cube-button :active="true" @click="mSave" class="save-btn">
        {{ $t('agent.openInvitation.openInvitation9')}}
        <!--立即设置 -->
      </cube-button>
    </div>

    <!--<div class="publicpage">-->
    <!--<div class="TransferRecords publicpage_view">-->
    <!--<div class="data-time animated slideInUp">-->
    <!--<Divider>{{ $t('agent.openInvitation.openInvitation2')}}</Divider>&lt;!&ndash;用户类型 &ndash;&gt;-->
    <!--<div class="mui-input-group" style="width:50%; margin-left:24%;">-->
    <!--<div class="mui-input-row mui-radio mui-left" style="margin-bottom: 10px">-->
    <!--<el-radio v-model="vm.linkType" :label="1">{{$t('agent.openInvitation.openInvitation3')}}</el-radio>-->
    <!--</div>-->
    <!--<div class="mui-input-row mui-radio mui-left">-->
    <!--<el-radio v-model="vm.linkType" :label="2">{{$t('agent.openInvitation.openInvitation4')}}</el-radio>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="data-time animated slideInUp">-->
    <!--<div>{{ $t('agent.openInvitation.openInvitation5')}}</div>&lt;!&ndash;开户信息 &ndash;&gt;-->
    <!--<div v-if="vm.linkType==2">&lt;!&ndash; 分红比例：&ndash;&gt;-->
    <!--<div span="24" style="border-bottom: solid 1px #f3f3f3;">-->
    <!--{{ $t('agent.openInvitation.openInvitation6')}}-->
    <!--<input v-model="vm.profitRebate" :placeholder="'分红比例不能大于'+dataList.profitRebate+'%'" class="ipt"/>-->
    <!--</div>&lt;!&ndash;返水扣除： &ndash;&gt;-->
    <!--<div span="24" style="border-bottom: solid 1px #f3f3f3;">-->
    <!--{{ $t('agent.openInvitation.openInvitation7')}}-->
    <!--<input v-model="vm.rakebackRebate" :placeholder="'返水扣除不能小于'+dataList.rakebackRebate+'%'" class="ipt" />-->
    <!--</div>&lt;!&ndash;优惠扣除： &ndash;&gt;-->
    <!--<div span="24" style="border-bottom: solid 1px #f3f3f3;">-->
    <!--{{ $t('agent.openInvitation.openInvitation8')}}-->
    <!--<input v-model="vm.benefitAmountRebate" :placeholder="'优惠金额扣除不能小于'+dataList.benefitAmountRebate+'%'" class="ipt" />-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
var _this;
export default {
  data() {
    return {
      logo: this.$t("agentMember.am12"),
      value: "",
      memberTypes: [{ value: 1, label: "会员" }, { value: 2, label: "代理" }],
      dataList: {
        profitRebate: "",
        rakebackRebate: "",
        benefitAmountRebate: ""
      },
      vm: {
        linkType: "",
        activeAmountRebate: "",
        benefitAmountRebate: "",
        profitRebate: "",
        rakebackRebate: ""
      }
    };
  },
  components: {
    headerComponent
  },
  mounted() {
    this.mInit();
  },
  methods: {
    mInit() {
      this.$http.get("/agentUser/getprofitRebate.json").then(result => {
        if (result.code == 0) {
          this.dataList = result.data.memberUser;
        } else {
          //加载分红比例失败
          this.mAlert(_this.$t("agent.openInvitation.openInvitation10"));
        }
      });
    },
    mSave() {
      if (this.vm.linkType == "") {
        //请选择开户类型
        this.mAlert(
          _this.$t("agent.openInvitation.openInvitation11"),
          null,
          "warning"
        );
        return;
      }
      if (this.vm.linkType == 2 && this.vm.profitRebate > this.profitRebate) {
        this.mAlert(
          //下级分红比例不能高于
          _this.$t("agent.openInvitation.openInvitation12") +
            this.profitRebate +
            "%",
          null,
          "warning"
        );
        return;
      }
      if (this.vm.activeAmountRebate == "") {
        this.vm.activeAmountRebate = this.vm.benefitAmountRebate;
      }
      this.$http
        .post("/agentUser/formAgentlinks.json", this.vm)
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            //操作成功
            this.mAlert(
              _this.$t("agent.openInvitation.openInvitation13"),
              () => {},
              "success"
            );
          } else {
            //操作失败
            this.mAlert(result.message, () => {}, "error");
          }
        });
    }
  },
  created() {
    _this = this;
  }
};
</script>


<style scoped>
.mui-input-group {
  /* padding: 20px; */
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 10px;
  font-size: 16px;
  color: #303313;
}

.panel {
  width: 351px;
  margin: 0 auto;
  height: 55px;
  line-height: 55px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: solid 1px #f3f3f3;
  background-color: #fff;
  padding: 0 10px;
}

.ipt {
  height: 54px;
  width: 60%;
}
.main-body >>> .el-input__inner {
  border: none;
}
</style>

