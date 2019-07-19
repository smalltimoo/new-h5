<template>
  <div class="withdraw onlineDeposit">
    <div class="header hasApp">
      <div class="header-left">
        <Icon type="ios-arrow-back" class="icon-menu" @click.stop="goBack"/>
        <span class="logo">{{logo}}</span>
      </div>
      <div class="header-right" style="margin-right: 15px;">
        <div class="yue">分红余额:{{cAgentCashBalance.toFixed(2)}}</div>
      </div>
    </div>
    <router-link :to="{name:'safecenter',params:{to:'bandBank'}}" v-if="bindBank" class="user_bank_card bandbank">
      <div class="wrap">
          <span class="icon"></span>
          <span class="text">点击此处添加银行卡</span>
      </div>
     </router-link>

    <div
      class="user_bank_card"
      v-else
      :style="{ 'background-image': 'url(' + bankInfo.drawBackgroundImg + ')', 'background-size': '100% 100%'}"
    >
      <span class="bankTypeName">{{bankInfo.bankTypeName}}</span>
      <div class="account"></div>
      <span class="drawAccountName">姓名：{{bankInfo.drawAccountName}}</span>
    </div>

    <div class="recharge" style="margin-top: 14px;">
      <div>
        <span class="title">{{$t('member.onlineDeposit.os6')}}</span>
        <!-- <span class="tmux">{{$t('member.onlineDeposit.od6')}}</span> -->
      </div>
      <div class="input-panel" style="padding-left:0">
        <span style="font-size: 16px">
          <b>{{$t('symbol.t1')}}</b>
        </span>
        <input
          type="number"
          v-model="vm.dealcoin"
          class="input-number"
          :placeholder="$t('member.onlineDeposit.os10')"
        >
      </div>
      <!-- <div class="recommend" v-if="moneys.length>0">
        <span
          v-for="(item,index) in moneys"
          :key="index"
          :class="{active: activeAmount==item}"
          @click="vm.dealcoin=item;activeAmount=vm.dealcoin"
        >{{$t('symbol.t1')}}{{ item }}</span>
      </div> -->
      <div class="can_withdraw" style="padding-left:0">
        <span>
          {{$t('member.onlineDeposit.os11')}}
          <span class="count">{{parseInt(cAgentCashBalance)}}</span>
          {{$t('yuan')}}
        </span>
        <span
          class="all_withdraw"
          @click="vm.dealcoin = parseInt(cAgentCashBalance)"
        >{{$t('member.onlineDeposit.os12')}}</span>
      </div>
      <div>
        <span style="font-size:15px;color:#4c4c4c" class="title">{{$t('member.onlineDeposit.os13')}}</span>
        <!-- <span style="font-size:15px;color:#bfc2cc" class="tmux">{{$t('member.onlineDeposit.os14')}}</span> -->
      </div>
      <el-input class="paddingLeft0" style="padding-left:0" :type="'password'" v-model="vm.coinpwd" placeholder="请输入6位提款密码" maxlength="8"></el-input>
      <cube-button
        :active="true"
        @click="mSave"
        class="save-btn"
      >{{$t('member.onlineDeposit.od15')}}</cube-button>
    </div>
  </div>
</template>

<script>
import { version } from "punycode";
export default {
  name: "withdrawsa",
  data() {
    return {
      yue: Number,
      logo: "分红提现",
       banktypes: [],
                amount: 0,
                bindBank: false,
                setPwd: false,
                loading: false,
                vmCard: {
                    account: "",
                    agentCashBalance: 0
                },
                bankInfo:{},
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
  methods: {
      createLocalData() {
      this.$http.post("/memberUser/getbindbank.json").then(result => {
        if (result.code === 0) {
          if (result.data == null) {
            this.bindBank = true;
            this.$Message.warning(this.$t("member.withdrawals.wa15")); //请先绑定银行卡
          }else{
              this.bankInfo = result.data;
              this.account = this.plusXing(this.bankInfo.account, 0, 4);
              let i = 0;
              let $accountDom = $(".account");
              while (i * 4 <= this.account.length + 1) {
                $accountDom.append(
                  `<span class="count_li">${this.account.substr(4 * i, 4)}</span>`
                );
                i++;
              }
          }
        }
      });
    },
      mInit() {
                this.mLoading(true);
                this.$http.all([this.mGetAgentCashBalance(), this.mGetBindBank()]).then(
                    this.$http.spread((resAgentCashBalance, rbindbank) => {
                        if (resAgentCashBalance.data == -1) {

                        } else if (resAgentCashBalance.data == -2) {
                            this.bindBank = true;
                            this.$Message.warning(_this.$t('agent.withdrawals.withdrawals15')); //请先绑定银行卡
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
                if (this.loading) {
                    return;
                }
                if (this.vm.dealcoin == "") {
                    this.$Message.warning(_this.$t('agent.withdrawals.withdrawals16'));  //取现金额不能为空
                    return;
                }
                if (this.vm.dealcoin < 1) {
                    this.$Message.warning(_this.$t('agent.withdrawals.withdrawals17')); //取现金额必须大于1元
                    return;
                }
                if (this.vm.coinpwd == "") {
                    this.$Message.warning(_this.$t('agent.withdrawals.withdrawals18'));  //请输入资金密码
                    return;
                }
                if (this.vm.dealcoin > this.cAgentCashBalance) {
                    this.$Message.warning(_this.$t('agent.withdrawals.withdrawals19'));  //余额不足
                    return;
                }
                this.mLoading(true);
                this.loading = true;
                let params = Object.assign({}, this.vm);
                this.$http.post("/agentUser/agentcash.json", params)
                    .then(result => {
                        this.mLoading(false);
                        this.loading = false;
                        if (result.code == 0) {
                            this.vm.dealcoin=0;
                            if (result.data == 0) {
                                this.$Message.success(_this.$t('agent.withdrawals.withdrawals20'));  //提现成功
                                this.mInit();
                            } else if (result.data == 1) {
                                this.setPwd = true;
                                this.$Message.warning(_this.$t('agent.withdrawals.withdrawals14'));
                                this.mAlert(_this.$t('agent.withdrawals.withdrawals21'), () => {   //请先设置资金密码
                                    this.$router.push({name: "SafaPassword"});
                                });
                            } else if (result.data == 2) {
                                this.bindBank = true;
                                this.$Message.warning(_this.$t('agent.withdrawals.withdrawals22')); //请先绑定银行卡
                            }
                        } else {
                            this.$Message.error(result.message);
                        }
                    })
                    .catch(error=>{
                        this.vm.dealcoin=0;
                        this.loading = false;
                    })
            }
  },
  created() {
  },
  mounted(){
      this.createLocalData();
       this.mInit();
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    if (!result.data.coinPassword) {
                        this.setPwd = true;
                    }
                }
            });
  }
};
</script>

<style lang="less" >
.withdraw {
  width: 100%;
  margin-top: 8px;
  .user_bank_card {
    width: 351px;
    height: 175.5px;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    /* padding-left: 78px; */
    padding: 30px 0 0 78px;
    color: #f3f3f3;
    font-size: 12px;

    .account {
      width: auto;
      .count_li {
        display: inline-block;
        font-size: 18px;
        padding-right: 10px;
        color: #fff;
        // box-shadow: 0px 1px 1px 0px rgba(211, 4, 30, 0.5);
      }
    }
  }
  /deep/ .el-input__inner {
      border: none;
    border-bottom: 1px solid #f3f3f3;
  }
  .can_withdraw {
    width: 351px;
    height: 40px;
    padding-left:0;
    padding-top: 5px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    span {
      font-size: 12px;
      color: #4c4c4c;
       padding-top: 10px;
      .count {
        color: #2d8cf0;
      }
    }
    .all_withdraw {
      color: #2d8cf0;
    }
  }
  .passContainer {
    // border-bottom: 1px solid #f3f3f3;
    // border-radius: 16px;
    width: 351px;
    height: 50px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    position: relative;
    // padding: 0;
    // position: relative;

    .passItem {
      width: 50px;
      height: 100%;
      border-bottom: 1px solid #f3f3f3;
      // float: left;
      // margin-right: 0;
      box-sizing: border-box;
    }
    .passItem:not(:last-child) {
      border-right: inherit;
    }

    input {
      width: 100%;
      height: 100%;
      background-color: transparent;
      background: transparent;
      position: absolute;
      border: none;
      padding: 0 10px;
      outline: none;
      font-size: 40px;
      font-family: "courier new", sans-serif;
      letter-spacing: 0.82em;
      text-align: left;
      text-overflow: hidden;
    }
  }
  /deep/ .el-input {
    padding-left:0
  }
    .bandbank {
      background-color: #3d73ff;
      padding: 0;
      margin: 0 auto;
      .wrap {
        width: 113px;
        height: 61px;
        display: flex;
        margin: 0 auto;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .icon {
          width: 37px;
          height: 37px;
          // border: solid 2px #ffffff;
          background: url('~@/assets/images/default/jia@2x.png');
          background-size: cover;
        }
      }
  }
}
</style>
