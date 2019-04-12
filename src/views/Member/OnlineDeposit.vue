<template>
  <div id="app">
123123
  </div>
</template>
<script>
import win from "@/mixins/window";
export default {
  mixins: [win],
  data() {
    return {
      rechargeTypes: [],
      rechargeOther: [],
      moneys: [],
      amount: 0,
      needInput: false,
      inputPlaceholder: ""
    };
  },
  computed: {
    cSelectRechargeType() {
      let a = this.rechargeTypes.find(item => item.selected === true);
      return a == undefined ? {} : a;
    }
  },
  mounted() {},
  methods: {
    mInit() {
      //线上支付方式  isAjax=1显示二维码   2本页面打开链接    3新窗口打开链接
      this.$http
        .post("/recharge/rechargeType.json?showType=2")
        .then(result => {
          if (result.code == 0) {
            result.data.apis.forEach((ele, i) => {
              ele.selected = i === 0;
              ele.list.forEach(item => (item.checked = false));
            });
            this.rechargeTypes = result.data.apis;
            this.rechargeOther = result.data.others;
            this.mSelectRechargeType(this.cSelectRechargeType.id);
          } else {
            this.mAlert(result.message);
          }
        })
        .catch(error => {
            //请求出错
          this.mAlert(this.$t('member.onlineDeposit.od13'));
        });
    },
    // 存款方式 选择
    mSelectRechargeType(id) {
      this.rechargeTypes.forEach(item => {
        item.selected = item.id === id;
        if (item.selected) {
          this.mApiOnChange(item.list[0]);
        }
      });
      if (id === 0) {
        this.moneys = [];
        this.needInput = false;
      }
    },
    //支付宝、微信支付渠道切换
    mApiOnChange(api) {
      this.checkedApiType = api;
      var sltType = this.rechargeTypes.find(item => item.selected === true);
      sltType.list &&
        sltType.list.forEach(item => {
          item.checked = api.id === item.id;
        });
      this.moneys = [];
      if (api.verificationMoney) {
        //this.needInput = false;
        var ms = api.verificationMoney.split(",");
        !!ms &&
          ms.forEach(item => {
            this.moneys.push({ api: api, money: item, checked: false });
          });
      } else {
        //this.amount = api.minMoney;
        this.amount ="";
        this.inputPlaceholder =
            //单笔存款限额   到  之间
        this.$t('member.onlineDeposit.od14') + api.minMoney + this.$t('member.onlineDeposit.od15') + api.maxMoney + this.$t('member.onlineDeposit.od16');
      }
    },
    mSelectMoney(money) {
      this.moneys.forEach(item => {
        item.checked = money.money === item.money;
      });
      this.amount = money.money;
    },
    mSubmit() {
      //支付方式
      if (!this.checkedApiType) {
          //请选择充值方式
        this.mAlert(this.$t('member.onlineDeposit.od17'));
        return;
      }
      if (this.amount <= 0) {
          //请选择充值金额
        this.mAlert(this.$t('member.onlineDeposit.od18'));
        return;
      }
      let Amount = parseFloat(this.amount);
      if (isNaN(Amount)) {
          //您输入的充值金额不正确
        this.mAlert(this.$t('member.onlineDeposit.od19'));
        return;
      }
      if (
        Amount < this.checkedApiType.minMoney ||
        Amount > this.checkedApiType.maxMoney
      ) {
        this.mAlert(
            //充值金额必须在    元内
                this.$t('member.onlineDeposit.od20') +
            this.checkedApiType.minMoney +
            "~" +
            this.checkedApiType.maxMoney +
                this.$t('member.onlineDeposit.od21')
        );
        return;
      }
      if (this.checkedApiType.verificationMoney.indexOf(",") > 0) {
        if (
          this.checkedApiType.verificationMoney.indexOf(
            this.amount.toString()
          ) < 0
        ) {
          this.mAlert(
              //充值金额必须为          中的某一个数字
                  this.$t('member.onlineDeposit.od22') +
              this.checkedApiType.verificationMoney +
                  this.$t('member.onlineDeposit.od23')
          );
          return;
        }
      } else {
        if (this.checkedApiType.verificationDot > 0) {
          if (this.amount.toString().indexOf(".") > -1) {
            var arrodt = this.amount.toString().split(".");
            if (this.amount == parseInt(this.amount)) {
              this.mAlert(
                  //充值金额必须携带非0小数，如12.6或100.08，请重新调整充值金额
                      this.$t('member.onlineDeposit.od24')
              );
              return;
            }
          } else {
            this.mAlert(
                //充值金额必须携带非0小数，如12.6或100.08，请重新调整充值金额
                    this.$t('member.onlineDeposit.od25')
            );
            return;
          }
        }
      }
      let dopage = this.checkedApiType.doPage;
      let params = {
        apiid: this.checkedApiType.apiid,
        serviceType: this.checkedApiType.serviceType,
        apitypeid: this.checkedApiType.id,
        orderAmount: this.amount,
        s: Math.random()
      };
      if (this.checkedApiType.isAjax == 1) {
        this.mWinOpen(
            //二维码扫描
           this.$t('member.onlineDeposit.od26'),
          () => import("./CreateQrCode"),
          Object.assign(
            {
              url: dopage
            },
            params
          ),
          600,
          null,
          () => {
            this.mWinClose();
          }
        );
      } else if (this.checkedApiType.isAjax == 2) {
        this.mLoading(true);
        this.$http
          .post(dopage, params)
          .then(result => {
            this.mLoading(false);
            if (result.code == "0") {
              let openUrl = decodeURIComponent(result.data.qrcoDepath);
              this.$router.push({
                name: "CustomerService",
                params: { aType: "cz", cUrl: openUrl }
              });
            } else {
                //请求付款地址失败1
              this.mAlert(this.$t('member.onlineDeposit.od27'));
            }
          })
          .catch(error => {
              //请求付款地址失败2
            this.mAlert(this.$t('member.onlineDeposit.od28'));
          });
      } else {
        this.mLoading(true);
        this.$http
          .post(dopage, params)
          .then(result => {
            this.mLoading(false);
            if (result.code == "0") {
              let openUrl = decodeURIComponent(result.data.qrcoDepath);
              window.open(openUrl);
            } else {
                //请求付款地址失败1
              this.mAlert(this.$t('member.onlineDeposit.od29'));
            }
          })
          .catch(error => {
              //请求付款地址失败2
            this.mAlert(this.$t('member.onlineDeposit.od30'));
          });
      }
    },
    mOtherCZ(url) {
      if (url) {
        this.$router.push({
          name: "CustomerService",
          params: { aType: "cz", cUrl: url }
        });
      } else {
          //存款渠道暂不可用
        this.mAlert(this.$t('member.onlineDeposit.od31'));
      }
    }
  },
  created() {
    // this.$store.commit('CHANGE_TAB','deposit')
    this.mInit();
  }
};
</script>

<style>
.PayPage .el-solid .el-radio {
  margin-bottom: 10px;
}
.PayPage .el-radio.is-bordered.is-checked {
  border-color: #ffb301;
}
.PayPage .el-radio__input.is-checked .el-radio__inner {
  background-color: #ffb301;
  border-color: #ffc501;
}
.PayPage .el-radio__input.is-checked + .el-radio__label {
  color: #ffb301;
}
.PayPage .el-radio--mini.is-bordered .el-radio__label,
.PayPage .el-radio--small.is-bordered .el-radio__label {
  color: #fff;
}
.PayPage .zhifubaoWarp {
  margin: 5px 0;
  width: 25%;
  text-align: center;
}
.PayPage .zhifubaoWarp .zhifubao {
  width: 80%;
}
.PayPage .zhifubaoWarp .zhifubao.active {
  color: #c12a23;
  border-color: #c12a23;
  outline: 0;
  background-color: #fbeae9;
}
.choiceItem {
  background: #545478;
  line-height: 60px;
}
.choiceItem .el-button:active {
  color: #ffb301;
  border-color: #ffc501;
}
.choiceItem .el-button:hover {
  color: #ffb301;
  background-color: #efe8d8;
}
.el-form-item__label {
  color: #fff;
}
.el-input__inner {
  background-color: #404061;
  color: #fff;
}
.bank-transition-box {
  color: #545478;
}
.G-Lottery {
  background: #33334e;
  padding-bottom: 15px;
  padding-top: 15px;
}
.G-Lottery .el-col {
  padding: 0 2px;
}

.G-Lottery .el-col i.x-icon-lotter-active {
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 22px;
  height: 22px;
  margin-bottom: -2px;
}
.G-Lottery .el-col .icon {
  display: inline-block;
  vertical-align: middle;
  margin-left: -10px;
  /* margin-right: 10px; */
}
.G-Lottery .grid-content {
  position: relative;
  padding-left: 20px;
  text-align: left;
  font-size: 14px;
  line-height: 45px;
  border: 1px solid #545478;
  margin: 5px auto;
  height: 45px;
  color: #545478;
  background: #fff;
}
.G-Lottery .grid-content.active {
  border: 1px solid #c8a675 !important;
}
.G-Lottery .grid-content .Gicon {
  position: absolute;
  left: 10px;
  top: 7px;
}
.LotteryWrapper {
  width: 100%;
  color: #e0e0e0;
}
.recommond {
  position: absolute;
  top: 8px;
  right: 7px;
  width: 30px;
  height: 12px;
  background-size: cover;
}
.Alipay .el-button--primary {
  background-color: #ffb301;
  border-color: #ffc501;
}
.Alipay .el-button--primary:active {
  background-color: #c48a05;
}
.PayPage .el-radio--small,
.PayPage .is-bordered {
  margin-bottom: 10px;
}
.PayPage .el-form,
.PayPage .el-radio-group {
  background: #33334e;
}
.PayPage input {
  border: none;
}
.PayPage .el-form-item__content,
.PayPage .el-form-item__label {
  line-height: 50px;
}
.PayPage .el-form-item {
  margin-bottom: 0;
}
.PayPage .el-form-item__content {
  position: relative;
}
.PayPage .Description {
  position: absolute;
  font-size: 14px;
  right: 0;
  top: 0;
  height: 50px;
  width: 100px;
  color: #c8a675;
}
.PayPage .PayPage-transition {
  width: 100%;
  height: 40px;
  background: #3d3d5f;
}
.PayPage .PayPage-transition p {
  font-size: 15px;
  text-align: right;
  padding-right: 15px;
  line-height: 40px;
}
.PayPage .PayPage-transition_ {
  font-size: 15px;
  width: 100%;
  min-height: 40px;
  padding-right: 15px;
  background: #41415d;
}
.PayPage .PayPage-transition_ p {
  line-height: 30px;
  text-align: right;
}
.PayPage .G-Warm {
  text-align: left;
  padding: 10px;
}
.PayPage .G-Warm .G_info_title {
  height: 30px;
  line-height: 30px;
  font-size: 15px;
}
.PayPage .G-Warm .G_info_p_title {
  height: 25px;
  line-height: 25px;
  font-size: 14px;
}
.PayPage .G-Warm .G_info_text {
  line-height: 20px;
  font-size: 13px;
}
.PayPage .NoList {
  line-height: 120px;
  height: 120px;
  width: 95%;
  margin: 15px auto;
  font-size: 13px;
  background: #fff;
  color: #545478;
  border-radius: 5px;
}
.PayPage .el-card {
  width: 160px;
  margin: 10px auto;
  height: 160px;
}
.HomeWrapper {
  /*background: #33334e;*/
}
.filter {
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 14px;
  z-index: 15;
  color: #fff;
  padding:0;
}
.filter a {
  font-size: 14px;
  font-weight: 800;
}
</style>
