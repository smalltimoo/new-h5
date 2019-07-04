<template>
  <div class="withdraw">
     <router-link :to="{name:'safecenter',params:{to:'bandBank'}}" v-if="bindBank" class="user_bank_card bandbank">
   
      <div class="wrap">
             <span class="icon"></span>     
             <span class="text">点击此处添加银行卡</span> 
    </div>
     </router-link>
    <div
      class="user_bank_card"
      v-else
      :style="{ 'baackground-image': 'url(' + bankInfo.drawBackgroundImg + ')', 'background-size': '100% 100%'}"
    >
      <span class="bankTypeName">{{bankInfo.bankTypeName}}</span>
      <div class="account"></div>
      <span class="drawAddress">姓名：{{bankInfo.drawAddress}}</span>
    </div>

    <div class="recharge" style="margin-top: 14px;">
      <div>
        <span class="title">{{$t('member.onlineDeposit.os6')}}</span>
        <span class="tmux">{{$t('member.onlineDeposit.od6')}}</span>
      </div>
      <div class="input-panel">
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
      <div class="recommend" v-if="moneys.length>0">
        <span
          v-for="(item,index) in moneys"
          v-if="index<5"
          :key="index"
          :class="{active: activeAmount==item}"
          @click="vm.dealcoin=item;activeAmount=vm.dealcoin"
        >{{$t('symbol.t1')}}{{ item }}</span>
      </div>
      <div class="can_withdraw">
        <span>
          {{$t('member.onlineDeposit.os11')}}
          <span class="count">{{parseInt(yue)}}</span>
          {{$t('yuan')}}
        </span>
        <span
          class="all_withdraw"
          @click="vm.dealcoin = parseInt(yue)"
        >{{$t('member.onlineDeposit.os12')}}</span>
      </div>
      <div>
        <span style="font-size:15px;color:#4c4c4c" class="title">{{$t('member.onlineDeposit.os13')}}</span>
        <span style="font-size:15px;color:#bfc2cc" class="tmux">{{$t('member.onlineDeposit.os14')}}</span>
      </div>
      <el-input :type="'password'" v-model="vm.coinpwd" placeholder="请输入提款密码" maxlength="8"></el-input>
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
  name: "withdraw",
  props: ["moneys", "amount", "activeAmount"],
  data() {
    return {
      bankInfo: [],
      account: "",
      bindBank: false,
      setPwd: false,
      vmCard: {
        account: ""
      },
      loading: false,
      lineCountry: 1,
      vm: {
        dealcoin: "",
        coinpwd: ""
      }
      //   amount:'',
      //   moneys:[]
    };
  },
  mounted() {
    if (!this.cNeedLogin) {
      this.$http.post("/memberUser/memberamount.json").then(result => {
        if (result.code == 0) {
          this.amount = result.data;
        }
      });
    }
    this.$http.get("/memberUser/getbindbank.json").then(result => {
      if (result.code == 0) {
        if (result.data == null) {
          this.bindBank = true;
          this.$Message.warning(this.$t("member.withdrawals.wa15")); //请先绑定银行卡
        }
      }
    });
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        if (!result.data.coinPassword) {
          this.setPwd = true;
        }
      }
    });
    this.$http.post("/getsys.json").then(res => {
      if (res.code == 0) {
        this.lineCountry = res.data.lineCountry;
        this.mBanks();
      }
    });
  },
  methods: {
    createLocalData() {
      this.$http.post("/memberUser/getbindbank.json").then(result => {
        if (result.code === 0) {
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
      });
    },
    mBanks() {
      this.$http.all([this.mGetBanks(), this.mGetBindBank()]).then(
        this.$http.spread((rbanks, rbindbank) => {
          this.mLoading(false);
          if (rbanks.code == 0) {
            this.banktypes = rbanks.data.list;
          } else {
            this.$Message.warning(rbanks.message, "error");
          }
          if (rbindbank.code == 0) {
            this.vmCard = Object.assign(this.vmCard, rbindbank.data);
          }
        })
      );
    },
    mInit() {
      this.mLoading(true);
      this.$http.get("/memberUser/membercoin.json").then(result => {
        if (result.code == 0) {
          if (result.data >= 0) {
            this.coin = result.data / 100;
          }
        }
      });
    },
    mCash() {
      this.mLoading(true);
      this.$http.post("/memberUser/membercash.json", this.vm).then(result => {
        this.mLoading(false);
        if (result.code == 0) {
          this.vm.dealcoin = 0;
          if (result.data == 0) {
            this.$Message.success(this.$t("member.withdrawals.wa16")); //操作成功
          } else if (result.data == 1) {
            this.$Message.warning(this.$t("member.withdrawals.wa17")); //请先设置资金密码
          } else if (result.data == 2) {
            this.$Message.warning(this.$t("member.withdrawals.wa18")); //请先绑定银行卡
          } else {
            this.$Message.error(result.message, () => {});
          }
        } else {
          this.$Message.error(result.message, () => {});
          this.vm.dealcoin = 0;
        }
      });
    },
    mSave() {
      if (this.loading) {
        return;
      }
      if (this.bindBank) {
        this.$Message.warning(this.$t("member.withdrawals.wa18")); //绑定银行卡
        return;
      }
      if (this.vm.dealcoin == "") {
        //取现金额不能为空
        this.$Message.warning(this.$t("member.withdrawals.wa19"));
        return;
      }
      if (this.vm.dealcoin < 1) {
        //取现金额必须大于1元
        this.$Message.warning(this.$t("member.withdrawals.wa20"));
        return;
      }
      if (this.vm.coinpwd == "") {
        //请输入资金密码
        this.$Message.warning(this.$t("member.withdrawals.wa21"));
        return;
      }
      if (this.vm.dealcoin > this.coin) {
        //余额不足
        this.$Message.warning(this.$t("member.withdrawals.wa22"));
        return;
      }
      this.mLoading(true);
      this.loading = true;
      //先检查是否给手续费
      this.$http
        .post("/memberUser/checkmembercash.json", this.vm)
        .then(result => {
          this.mLoading(false);
          this.loading = false;
          if (result.code == 0) {
            let isCharge = false;
            if (
              result.data.bool &&
              result.data.washCodeState != 0 &&
              (result.data.countGame > result.data.gameAmount ||
                (result.data.countGame == 0 && result.data.gameAmount == 0))
            ) {
              isCharge = true;
            }
            if (isCharge) {
              var wa23 = this.$t("member.withdrawals.wa23");
              if (result.data.gameflag == 1) {
                //总打码不足
                wa23 = this.$t("member.withdrawals.wa23");
              } else if (result.data.gameflag == 2) {
                //最后一笔不足
                wa23 = this.$t("member.withdrawals.wa29");
              }

              let strConfirm =
                wa23 + //当前打码量不足
                result.data.countGame / 100 +
                this.$t("member.withdrawals.wa24") + //，将收取
                result.data.washCodeCharge +
                this.$t("member.withdrawals.wa25"); //%的手续费，你确定要取现吗？
              if (result.data.countGame <= 0) {
                strConfirm =
                  this.$t("member.withdrawals.wa27") + //当前没有打码量，将收取            %的手续费，你确定要取现吗？
                  result.data.washCodeCharge +
                  this.$t("member.withdrawals.wa28");
              }
              this.mConfirm(strConfirm, () => {
                this.mLoading(true);
                setTimeout(() => {
                  this.mCash();
                }, 300);
              });
            } else {
              this.mCash();
            }
          } else {
            this.vm.dealcoin = 0;
            this.$Message.warning(result.message);
          }
        })
        .catch(error => {
          this.loading = false;
        });
    },
    mGetBanks() {
      let sysInfo = this.$store.getters.getSysInfo;
      return this.$http.post("/banktypes.json", {
        lineCountry: sysInfo.lineCountry
          ? sysInfo.lineCountry
          : this.$i18n.local == "th"
          ? "2"
          : "1"
      });
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    }
  },
  created() {
    this.createLocalData();
    this.$parent.moneys = [];
    this.yue = this.$parent.yue;
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
    border-bottom: 1px solid #f3f3f3;
  }
  .can_withdraw {
    width: 351px;
    height: 40px;
    padding-top: 5px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    span {
      font-size: 12px;
      color: #4c4c4c;
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
