<template>
  <div id="app">
    <div class="publicpage">
      <div class="Withdrawals publicpage_view">
        <div class="TopHeader">
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'UserMember'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div>{{ $t('member.withdrawals.wa1') }}
        </div><!--提款 -->
        <div class="el-row">
          <div class="Addcardpass el-row" style="display: none;">
            <p class="text">{{ $t('member.withdrawals.wa2') }}</p><!--申请提款需先设置提款密码,请先设置 -->
            <a href="/modifybankpass" class="AddPass">{{ $t('member.withdrawals.wa3') }}</a><!-- 立即设置--><!-- -->
          </div>
          <section class="el-container"></section>
        </div>
        <div class="el-row" style>
          <div class="G-card el-row">
            <div class="el-col el-col-24">
              <div class="G-card-left" style="width: 120px;">{{ $t('member.withdrawals.wa4') }}</div><!-- 到账银行卡-->
              <div class="G-card-right"  style="width: 250px;">
                <div class="G-card-box">
                  <!-- <div >
           &nbsp;中国农业银行&nbsp;
                  </div>-->
                  <Select v-model="vmCard.drawAccountType" class="G-card-name" disabled>
                    <Option
                      v-for="(item, index) in banktypes"
                      :key="index"
                      :value="item.id"
                    >{{item.bankName}}</Option>
                  </Select>
                  <div class="line-w"></div>
                  <div class="G-card-num">&nbsp;{{vmCard.account}}&nbsp;</div>
                  <i class="x-icon-lotter-active"></i>
                </div>
                <a class>{{ $t('member.withdrawals.wa5') }}</a><!--请仔细查看银行卡信息 -->
              </div>
            </div>
          </div>
          <div class="line-w"></div>
          <form class="el-form el-form--label-right">
            <div class="el-form-item" style="margin-bottom: 20px;">
              <label class="el-form-item__label" style="margin-left: 10px">{{ $t('member.withdrawals.wa6') }}</label><!--账户余额 -->
              <div class="el-form-item__content" style="margin-left: 100px;">
                <span class="lf">{{amount / 100}}</span>
                <!---->
              </div>
            </div>
            <!-- <div class="el-form-item">
        <label class="el-form-item__label" style="width: 100px;">要求打码量</label>
        <div class="el-form-item__content" style="margin-left: 100px;">
         <div class="el-input el-input--mini is-disabled">
          <input autocomplete="off" size="mini" disabled="disabled" type="text" rows="2" validateevent="true" class="el-input__inner" />
         </div>
        </div>
       </div>
       <div class="line-w"></div>
       <div class="el-form-item">
        <label class="el-form-item__label" style="width: 100px;">完成打码量</label>
        <div class="el-form-item__content" style="margin-left: 100px;">
         <div class="el-input el-input--mini is-disabled">
          <input autocomplete="off" size="mini" disabled="disabled" type="text" rows="2" validateevent="true" class="el-input__inner" />
         </div>
        </div>
            </div>-->
          </form>
          <form class="el-form el-form--label-right" style="margin-top: 10px;">
            <div class="el-form-item">
              <label class="el-form-item__label" style="margin-left: 10px">{{ $t('member.withdrawals.wa7') }}</label><!--提交金额 -->
              <div class="el-form-item__content" style="margin-left: 100px;">
                <div class="el-input el-input--mini">
                  <!---->
                  <input v-model="vm.dealcoin"
                         autocomplete="off"
                         :placeholder="$t('member.withdrawals.wa8')"
                         size="mini"
                         maxlength="8"
                         type="text"
                         validateevent="true"
                         class="el-input__inner"
                         oninput="value=value.replace(/[^\d]/g,'')"
                         style="width: 240px;"
                  ><!-- 请输入 ￥100-500000-->
                </div>
                <!-- <span class="Description">限额说明</span> -->
                <!---->
              </div>
            </div>
            <div class="transition-boxW" style="display: none; ">
              <p>{{ $t('member.withdrawals.wa9') }}</p><!-- 单笔限额(元)100 - 500000-->
            </div>
            <div class="line-w"></div>
            <div class="el-form-item">
              <label class="el-form-item__label" style="margin-left: 10px">{{ $t('member.withdrawals.wa10') }}</label><!--提款密码 -->
              <div class="el-form-item__content" style="margin-left: 100px;">
                <div class="el-input el-input--mini">
                  <!---->
                  <input v-model="vm.coinpwd"
                         autocomplete="off"
                         :placeholder="$t('member.withdrawals.wa10')"
                         size="mini"
                         type="password"
                         validateevent="true"
                         class="el-input__inner"
                         style="width: 240px;"
                  ><!-- 提款密码-->
                  <!---->
                  <!---->
                  <!---->
                </div>
                <!---->
              </div>
            </div>
          </form>
          <button type="button" class="el-button G-submit el-button--primary el-button--default" @click="mSave">
            <!---->
            <!---->
            <span>{{ $t('member.withdrawals.wa11') }}</span><!--下一步 -->
          </button>
          <div class="G-Warm">
            <p>{{ $t('member.withdrawals.wa12') }}</p><!--提取遇到困难 -->
            <p><!--联系 -->
              {{ $t('member.withdrawals.wa13') }}
              <a href="javascript:void(0)" @tap="mOpenCService" style="color: rgb(184, 17, 9);"> {{ $t('member.withdrawals.wa14') }}</a> {{ $t('member.withdrawals.wa26') }}
            </p><!--在线客服 --><!--获得帮助 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banktypes: [],
      amount: 0,
      vmCard: {
        account: ""
      },
      vm: {
        dealcoin: "",
        coinpwd: ""
      }
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
    this.mLoading(true);
    this.$http.get("/memberUser/getbindbank.json").then(result => {
      if (result.code == 0) {
        if (result.data == null) {
            //请先绑定银行卡
          this.mAlert(this.$t('member.withdrawals.wa15'), () => {
            this.$router.push({
              name: "UserBankCard"
            });
          });
        }
      }
    });
    this.mLoading(true);
    this.$http.all([this.mGetBanks(), this.mGetBindBank()]).then(
      this.$http.spread((rbanks, rbindbank) => {
        console.log(rbanks.data, rbindbank.data);
        this.mLoading(false);
        if (rbanks.code == 0) {
          this.banktypes = rbanks.data.list;
        } else {
          this.mAlert(rbanks.message, () => {}, "error");
        }
        if (rbindbank.code == 0) {
          this.vmCard = Object.assign(this.vmCard, rbindbank.data);
        }
      })
    );
    this.mInit();
  },
  methods: {
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
          if (result.data == 0) {
              //操作成功
            this.mAlert(this.$t('member.withdrawals.wa16'), () => {
              this.$router.push({ name: "UserMember" });
            });
          } else if (result.data == 1) {
              //请先设置资金密码
            this.mAlert(this.$t('member.withdrawals.wa17'), () => {
              this.$router.push({
                name: "SafaPassword"
              });
            });
          } else if (result.data == 2) {
              //请先绑定银行卡
            this.mAlert(this.$t('member.withdrawals.wa18'), () => {
              this.$router.push({
                name: "UserBankCard"
              });
            });
          } else {
            this.mAlert(result.message, () => {});
          }
        } else {
          this.mAlert(result.message, () => {});
        }
      });
    },
    mSave() {
      if (this.vm.dealcoin == "") {
          //取现金额不能为空
        this.mAlert(this.$t('member.withdrawals.wa19'));
        return;
      }
      if (this.vm.dealcoin < 1) {
          //取现金额必须大于1元
        this.mAlert(this.$t('member.withdrawals.wa20'));
        return;
      }
      if (this.vm.coinpwd == "") {
          //请输入资金密码
        this.mAlert(this.$t('member.withdrawals.wa21'));
        return;
      }
      if (this.vm.dealCoin > this.coin) {
          //余额不足
        this.mAlert(this.$t('member.withdrawals.wa22'));
        return;
      }
      this.mLoading(true);
      //先检查是否给手续费
      this.$http
        .post("/memberUser/checkmembercash.json", this.vm)
        .then(result => {
          this.mLoading(false);
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
              let strConfirm =
                  //当前打码量不足
                      this.$t('member.withdrawals.wa23') +
                result.data.countGame / 100 +
                      //，将收取
                      this.$t('member.withdrawals.wa24') +
                result.data.washCodeCharge +
                      //%的手续费，你确定要取现吗？
                      this.$t('member.withdrawals.wa25');
              if (result.data.countGame <= 0) {
                strConfirm =
                    //当前没有打码量，将收取            %的手续费，你确定要取现吗？
                        this.$t('member.withdrawals.wa27') +
                  result.data.washCodeCharge +
                        this.$t('member.withdrawals.wa28');
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
          }
        });
    },
    mGetBanks() {
      return this.$http.get("/banktypes.json");
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    }
  }
};
</script>

<style>
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
  width: 200px;
  height: 100px;
}
.Withdrawals .G-card-name {
  font-size: 20px;
  line-height: 50px;
  font-weight: 900;
  height: 50px;
}
.Withdrawals .line-w {
  height: 1px;
  width: 100%;
  border-bottom: 1px solid #3a3a3a;
}
.Withdrawals .G-card-num {
  line-height: 40px;
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
  line-height: 20px;
  font-size: 15px;
  text-align: left;
  margin-top: 15px;
  color: #c8a675;
}
.Withdrawals .el-form-item__label {
  font-weight: 900;
  color: #fff;
}
.Withdrawals .el-form-item {
  background: #545478;
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
.Withdrawals .el-input__inner {
  background-color: #545478;
  color: #fff;
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
  font-size: 18px;
  background-color: #545478;
  height: 35px;
  line-height: 35px;
}
.ivu-select-single .ivu-select-selection {
  border: none;
  /*width: 165px;*/
}
</style>
