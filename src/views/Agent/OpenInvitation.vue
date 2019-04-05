<template>
  <div id="app">
    <div class="publicpage">
      <div class="TransferRecords publicpage_view">
        <div class="TopHeader">
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'AgentMember'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div>{{ $t('agent.openInvitation.openInvitation1')}}
        </div><!--推广链接 -->
        <div class="data-time animated slideInUp">
          <Divider style="color:#fff">{{ $t('agent.openInvitation.openInvitation2')}}</Divider><!--用户类型 -->
          <div class="mui-input-group" style="width:50%; margin-left:25%;">
            <div class="mui-input-row mui-radio mui-left">
              <input name="radio1" type="radio" :value="1" v-model="vm.linkType">
              <label style="height:40px;color:#000;font-size:14px;text-align:center;">{{ $t('agent.openInvitation.openInvitation3')}}</label><!--会员 -->
            </div>
            <div class="mui-input-row mui-radio mui-left">
              <label style="height:40px;color:#000;font-size:14px;text-align:center;">{{ $t('agent.openInvitation.openInvitation4')}}</label><!--代理 -->
              <input name="radio1" type="radio" :value="2" v-model="vm.linkType">
            </div>
          </div>
        </div>
        <div class="data-time animated slideInUp">
          <Divider style="color:#fff">{{ $t('agent.openInvitation.openInvitation5')}}</Divider><!--开户信息 -->
          <Row v-if="vm.linkType==2"><!-- 分红比例：-->
            <Col span="24" style="  margin-top: 15px;  ">{{ $t('agent.openInvitation.openInvitation6')}}
              <Input v-model="vm.profitRebate" :placeholder="'分红比例不能大于'+dataList.profitRebate+'%'" style="width: 200px"
              />
            </Col><!--返水扣除： -->
            <Col span="24" style="  margin-top: 15px;  ">{{ $t('agent.openInvitation.openInvitation7')}}
              <Input v-model="vm.rakebackRebate" :placeholder="'返水扣除不能小于'+dataList.rakebackRebate+'%'" style="width: 200px"/>
            </Col><!--优惠扣除： -->
            <Col span="24" style="  margin-top: 15px;  ">{{ $t('agent.openInvitation.openInvitation8')}}
              <Input v-model="vm.benefitAmountRebate" :placeholder="'优惠金额扣除不能小于'+dataList.benefitAmountRebate+'%'" style="width: 200px"
              />
            </Col>
          </Row>
          <button type="success" class="el-button G-submit el-button--primary" @click="mSave">
            <span>{{ $t('agent.openInvitation.openInvitation9')}}</span><!--确定 -->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  var _this;
export default {
  data() {
    return {
      memberTypes: [{ id: 1, value: "会员" }, { id: 2, value: "代理" }],
      dataList:{profitRebate:'',rakebackRebate:'',benefitAmountRebate:''},
      vm: {
        linkType: "",
        activeAmountRebate: "",
        benefitAmountRebate: "",
        profitRebate: "",
        rakebackRebate: ""
      }
    };
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
          this.mAlert(_this.$t('agent.openInvitation.openInvitation10'));
        }
      });
    },
    mSave() {
      if (this.vm.linkType == "") {
          //请选择开户类型
        this.mAlert(_this.$t('agent.openInvitation.openInvitation11'), null, "warning");
        return;
      }
      if (this.vm.linkType == 2 && this.vm.profitRebate > this.profitRebate) {
        this.mAlert(
            //下级分红比例不能高于
            _this.$t('agent.openInvitation.openInvitation12') + this.profitRebate + "%",
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
            this.mAlert(_this.$t('agent.openInvitation.openInvitation13'), () => {}, "success");
          } else {
              //操作失败
            this.mAlert(result.message, () => {}, "error");
          }
        });
    }
  },created(){
      _this=this;
    }
};
</script>


<style scoped>
.publicpage {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #33334e;
  z-index: 10;
}
.TopHeader {
  background-color: #545478;
  border-bottom: 1px solid #3a3a3a;
  color: #fff;
}
.TransferRecords .filter {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  z-index: 15;
  color: #fff;
  font-weight: 800;
  padding: 13px 10px;
}
.TransferRecords {
  width: 100%;
  font-size: 0;
}
.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.TransferRecords h1 {
  line-height: 1.8rem;
  font-size: 16px;
  text-align: left;
}
.TransferRecords .rowbg {
  background: #545478;
  padding: 1rem;
  border-bottom: 1px solid #3a3a3a;
  margin-bottom: 10px;
}
.TransferRecords .Save {
  display: block;
  padding: 0.05rem;
  text-align: center;
  background: #ff695a;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
}
.TransferRecords .status {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}
.TransferRecords .data {
  line-height: 22px;
  font-size: 14px;
  padding-left: 0.1rem;
  text-align: left;
}
.TransferRecords .Types {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 700;
}
</style>

