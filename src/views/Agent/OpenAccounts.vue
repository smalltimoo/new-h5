<template>
  <div id="app">
   <div class="publicpage">
  <div class="TransferRecords publicpage_view" >
   <div class="TopHeader">
     <div id="return" style="position: absolute;">
          <router-link :to="{name:'AgentMember'}">
            <Icon type="ios-arrow-back" />
            </router-link></div>{{ $t('agent.openAccounts.openAccounts1')}}
     </div><!--下级开户 -->
     <div class="data-time animated slideInUp">
        <Divider style="color:#fff">{{ $t('agent.openAccounts.openAccounts2')}}</Divider><!--用户类型 -->
        <div class="mui-card" style="width:50%; margin-left:25%;">
          <ul class="mui-table-view" style="max-height:300px;overflow-y:auto;" >
            <li class="mui-table-view-cell mui-radio mui-left mui-selected">
              <label style="color:#000">{{ $t('agent.openAccounts.openAccounts3')}}</label><!--会员 -->
              <input name="radio" type="radio" value="1" v-model="vm.memberType">
            </li>
            <li class="mui-table-view-cell mui-radio mui-left" >
              <label style="color:#000">{{ $t('agent.openAccounts.openAccounts4')}}</label><!--代理 -->
              <input name="radio" type="radio" value="2" v-model="vm.memberType">
            </li>
          </ul>
        </div>
    </div>
    <div class="data-time animated slideInUp">
        <Divider style="color:#fff">{{ $t('agent.openAccounts.openAccounts5')}}</Divider><!-- 开户信息-->
        <Row><!-- 登陆账号：-->
            <Col span="24" style=" margin-top: 15px;">{{ $t('agent.openAccounts.openAccounts6')}}
                <Input v-model="vm.username"  :placeholder="$t('agent.openAccounts.openAccounts7')" style="width:200px;"></Input><!-- 请输入登陆账号...-->
            </Col><!--登陆密码： -->
            <Col span="24" style=" margin-top: 15px;">{{ $t('agent.openAccounts.openAccounts8')}}
                <Input v-model="vm.password"  :placeholder="$t('agent.openAccounts.openAccounts9')" style="width:200px;"></Input><!-- 请输入登陆密码...-->
            </Col>
        </Row>
        <Row  v-if="vm.memberType==2"><!--分红比例： -->
            <Col span="24" style="  margin-top: 15px;  ">{{ $t('agent.openAccounts.openAccounts10')}}
            <Input v-model="vm.profitRebate" :placeholder="'分红比例不能大于'+dataList.profitRebate+'%'" style="width: 200px" />
            </Col><!--返水扣除： -->
            <Col span="24" style="  margin-top: 15px;  ">{{ $t('agent.openAccounts.openAccounts11')}}
            <Input v-model="vm.rakebackRebate" :placeholder="'返水扣除不能小于'+dataList.rakebackRebate+'%'" style="width: 200px" />
            </Col>
        </Row>
        <Row v-if="vm.memberType==2"><!--优惠扣除： -->
            <Col span="24" style="  margin-top: 15px;  ">{{ $t('agent.openAccounts.openAccounts12')}}
            <Input v-model="vm.benefitAmountRebate" :placeholder="'优惠金额扣除不能小于'+dataList.benefitAmountRebate+'%'" style="width: 200px" />
            </Col>
            <!-- <Col span="24" style="  margin-top: 15px;  ">活动扣除：
            <Input v-model="vm.activeAmountRebate" placeholder="活动扣除金额百分比不能小于0" style="width: 200px" />
            </Col> -->
        </Row>
        <button type="success" class="el-button G-submit el-button--primary" @click="mSave">
            <span>{{ $t('agent.openAccounts.openAccounts13')}}</span></button><!--确定 -->
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
        memberType: "",
        username: "",
        password: "",
        profitRebate: "",
        rakebackRebate: "",
        benefitAmountRebate: "",
        activeAmountRebate: ""
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
          this.mAlert(_this.$t('agent.openAccounts.openAccounts14'));
        }
      });
    },
    mSave() {
      if (this.vm.memberType <= 0) {
          //请选择开户类型
        this.mAlert(_this.$t('agent.openAccounts.openAccounts15'), null, "warning");
        return;
      }
      if (this.vm.username.trim() == "") {
          //请填写登陆账号
        this.mAlert(_this.$t('agent.openAccounts.openAccounts16'), null, "warning");
        return;
      }
      if (this.vm.password.trim() == "") {
          //请填写登陆密码
        this.mAlert(_this.$t('agent.openAccounts.openAccounts17'), null, "warning");
        return;
      }
      if (this.vm.memberType == 2 && this.vm.profitRebate > this.profitRebate) {
        this.mAlert(
            //下级分红比例不能高于
            _this.$t('agent.openAccounts.openAccounts18') + this.profitRebate + "%",
          null,
          "warning"
        );
        return;
      }
      this.$http.post("/agentUser/addMemberUser.json", this.vm).then(result => {
        this.mLoading(false);
        if (result.code == 0) {
            //操作成功
          this.mAlert(_this.$t('agent.openAccounts.openAccounts19'), () => {}, "success");
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

