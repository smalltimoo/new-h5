<template>
  <div id="app">
    <div class="publicpage">
      <div class="Withdrawals publicpage_view">
        <div class="TopHeader">
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'AgentMember'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div>{{ $t('agent.withdrawals.withdrawals1')}}
        </div><!--分红提现 -->

        <div class="el-row" style>
          <div class="G-card el-row">
            <div class="el-col el-col-24">
              <div class="G-card-left">{{ $t('agent.withdrawals.withdrawals2')}}</div><!--到账银行卡 -->
              <div class="G-card-right">
                <div class="G-card-box">
                  <div class="G-card-name">{{vmCard.bankTypeName}}</div>
                  <div class="line-w"></div>
                  <div class="G-card-num">
                    <div>{{vmCard.drawAccountName}}</div>
                    <div>{{vmCard.account}}</div>
                    <div>{{vmCard.drawAddress}}</div>
                  </div>
                  <i class="x-icon-lotter-active"></i>
                </div>
                <a class>{{ $t('agent.withdrawals.withdrawals3')}}</a><!-- 请仔细查看银行卡信息-->
              </div>
            </div>
          </div>
          <div class="line-w"></div>
          <form class="el-form el-form--label-right">
            <div class="el-form-item" style="margin-bottom: 20px;">
              <label class="el-form-item__label" style="margin-left: 10px;">{{ $t('agent.withdrawals.withdrawals4')}}</label><!--分红钱包余额 -->
              <div class="el-form-item__content" style="margin-left: 10px;">
                <span class="lf">{{cAgentCashBalance}}</span>
              </div>
            </div>
            <div class="el-form-item" style="margin-bottom: 20px;" v-if="cAgentCashBalance<=0">
              <label class="el-form-item__label" style="margin-left: 10px;"></label>
              <div class="el-form-item__content" style="margin-left: 10px;">
                <span class="lf" style="color:#c4bbc4;">{{ $t('agent.withdrawals.withdrawals5')}}</span><!-- 分红钱包余额暂不支持取现-->
              </div>
            </div>
          </form>
          <form
            class="el-form el-form--label-right"
            style="margin-top: 10px;"
            v-if="cAgentCashBalance>0"
          >
            <div class="el-form-item">
              <label class="el-form-item__label" style="width: 100px;">{{ $t('agent.withdrawals.withdrawals6')}}</label><!--提交金额 -->
              <div class="el-form-item__content" style="margin-left: 100px; width:180px">
                <div class="el-input el-input--mini">
                  <input
                    v-model="vm.dealcoin"
                    autocomplete="off"
                    :placeholder="$t('agent.withdrawals.withdrawals7')"
                    size="mini"
                    maxlength="8"
                    type="text"
                    validateevent="true"
                    class="el-input__inner"
                  ><!--请输入 ￥100-500000 -->
                </div>
              </div>
            </div>
            <div class="transition-boxW" style="display: none;">
              <p>{{ $t('agent.withdrawals.withdrawals8')}}</p><!--单笔限额(元)100 - 500000 -->
            </div>
            <div class="line-w"></div>
            <div class="el-form-item">
              <label class="el-form-item__label" style="width: 100px;">{{ $t('agent.withdrawals.withdrawals9')}}</label><!--提款密码 -->
              <div class="el-form-item__content" style="margin-left: 100px;width: 180px;">
                <div class="el-input el-input--mini">
                  <input
                    v-model="vm.coinpwd"
                    autocomplete="off"
                    :placeholder="$t('agent.withdrawals.withdrawals9')"
                    size="mini"
                    type="password"
                    validateevent="true"
                    class="el-input__inner"
                  ><!--提款密码 -->
                </div>
              </div>
            </div>
          </form>
          <button
            type="button"
            class="el-button G-submit el-button--primary el-button--default"
            @click="mSave"
            v-if="cAgentCashBalance>0"
          >
            <span>{{ $t('agent.withdrawals.withdrawals10')}}</span><!--下一步 -->
          </button>
          <div class="G-Warm">
            <p>{{ $t('agent.withdrawals.withdrawals11')}}</p><!--提取遇到困难 -->
            <p><!--联系 -->
              {{ $t('agent.withdrawals.withdrawals23')}}
              <a href="/NoteSingle" class style="color: rgb(184, 17, 9);">{{ $t('agent.withdrawals.withdrawals12')}}</a> {{ $t('agent.withdrawals.withdrawals13')}}
            </p><!--在线客服 --> <!--获得帮助 -->
          </div>
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
      banktypes: [],
      amount: 0,
      vmCard: {
        account: "",
        agentCashBalance: 0
      },
      vm: {
        dealcoin: "",
        coinpwd: ""
      }
    };
  },
  computed: {
    cAgentCashBalance() {
      let cb = this.vmCard.agentCashBalance / 100;
      return cb ? cb : 0;
    }
  },
  mounted() {
    this.mInit();
  },
  methods: {
    mInit() {
      this.mLoading(true);
      this.$http.all([this.mGetAgentCashBalance(), this.mGetBindBank()]).then(
        this.$http.spread((resAgentCashBalance, rbindbank) => {
          if (resAgentCashBalance.data == -1) {
              //请先设置资金密码
            this.mAlert(_this.$t('agent.withdrawals.withdrawals14'), () => {
              this.$router.push({ name: "SafaPassword" });
            });
          } else if (resAgentCashBalance.data == -2) {
              //请先绑定银行卡
            this.mAlert(_this.$t('agent.withdrawals.withdrawals15'), () => {
              this.$router.push({
                name: "UserBankCard"
              });
            });
          } else {
            this.vmCard.agentCashBalance = resAgentCashBalance.data;
          }
          if (rbindbank.code == 0) {
            this.vmCard = Object.assign(this.vmCard, rbindbank.data);
          }
          this.mLoading(false);
        })
      );
    },
    mGetAgentCashBalance() {
      return this.$http.get("/agentUser/agentCashBalance.json");
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    },
    mSave() {
      if (this.vm.dealcoin == "") {
          //取现金额不能为空
        this.mAlert(_this.$t('agent.withdrawals.withdrawals16'));
        return;
      }
      if (this.vm.dealcoin < 1) {
          //取现金额必须大于1元
        this.mAlert(_this.$t('agent.withdrawals.withdrawals17'));
        return;
      }
      if (this.vm.coinpwd == "") {
          //请输入资金密码
        this.mAlert(_this.$t('agent.withdrawals.withdrawals18'));
        return;
      }
      if (this.vm.dealcoin > this.cAgentCashBalance) {
          //余额不足
        this.mAlert(_this.$t('agent.withdrawals.withdrawals19'));
        return;
      }
      this.mLoading(true);
      let params = Object.assign({}, this.vm);
      this.$http.post("/agentUser/agentcash.json", params).then(result => {
        this.mLoading(false);
        if (result.code == 0) {
          if (result.data == 0) {
              //提现成功
            this.mAlert(_this.$t('agent.withdrawals.withdrawals20'));
          } else if (result.data == 1) {
              //请先设置资金密码
            this.mAlert(_this.$t('agent.withdrawals.withdrawals21'), () => {
              this.$router.push({ name: "SafaPassword" });
            });
          } else if (result.data == 2) {
              //请先绑定银行卡
            this.mAlert(_this.$t('agent.withdrawals.withdrawals22'), () => {
              this.$router.push({
                name: "UserBankCard"
              });
            });
          }
        } else {
          this.mAlert(result.message);
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
.Withdrawals {
  width: 100%;
  padding-bottom: 50px;
  font-size: 0;
}
.TopHeader {
  background-color: #545478;
  border-bottom: 1px solid #3a3a3a;
  color: #fff;
}
.Withdrawals .G-card {
  height: 180px;
  background: #545478;
}
.Withdrawals .G-card-left {
  width: 100px;
  font-size: 16px;
  padding-top: 30px;
  color: #fff;
  font-weight: 900;
}
.Withdrawals .G-card-left,
.Withdrawals .G-card-right {
  float: left;
}
.Withdrawals .G-card-box {
  position: relative;
  margin-top: 15px;
  border: 1px solid #c8a675;
  min-width: 200px;
  max-width: 300px;
}
.Withdrawals .G-card-name {
  font-size: 20px;
  line-height: 40px;
  font-weight: 600;
  height: 40px;
}
.Withdrawals .line-w {
  height: 1px;
  width: 100%;
  border-bottom: 1px solid #3a3a3a;
}
.Withdrawals .G-card-num {
  line-height: 22px;
  font-size: 16px;
}
.Withdrawals .G-card-box i {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
}
.Withdrawals .G-card-right a {
  display: block;
  line-height: 30px;
  font-size: 15px;
  text-align: left;
  margin-top: 8px;
  color: #c8a675;
}
.Withdrawals .el-form-item__label {
  font-weight: 900;
  color: #fff;
}
.Withdrawals .el-form-item {
  /*background: #545478;*/
  height: 55px;
  padding-top: 7px;
  margin-bottom: 0;
}
.Withdrawals .el-input.is-disabled .el-input__inner {
  background-color: transparent;
}
.Withdrawals input {
  border: none;
  outline: none;
  font-size: 15px;
}

.Withdrawals .el-input--mini {
  /*background-color: #545478;*/
  color: #fff;
  width: 180px;
}
.Withdrawals span.Description {
  position: absolute;
  font-size: 14px;
  right: 0;
  top: 0;
  height: 50px;
  width: 100px;
  color: #c8a675;
}
.Withdrawals .el-button--primary {
  background-color: #ffb301;
  border-color: #ffc501;
  margin-top: 30px;
}
.Withdrawals .G-Warm {
  margin: 30px 20px;
}
.Withdrawals .G-Warm p {
  line-height: 24px;
  font-size: 15px;
  text-align: left;
}
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  font-size: 24px;
  /*background-color: #545478;*/
  height: 60px;
  line-height: 60px;
}
.ivu-select-single .ivu-select-selection {
  border: none;
  width: 165px;
}
</style>
