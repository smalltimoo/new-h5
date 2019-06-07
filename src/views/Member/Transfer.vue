<template>
  <div class="transfer">
    <div class="contain_main">
      <div class="item" v-for="(item ,index) in transferData" :key="index">
        <span class="name">{{item.gameCompanyName}}</span>
        <span class="count">{{item.coin}}</span>
      </div>
    </div>
    <div class="chang_select">
      <el-select v-model="value1" @change="selectoptionsa" ref="select1">
        <el-option
          v-for="item in options"
          :key="item.gameCompanyId"
          :label="item.gameCompanyName"
          :value="item.gameCompanyId"
        ></el-option>
      </el-select>
      <el-select v-model="value2" @change="selectoptionsb" ref="select2">
        <el-option
          v-for="item in options"
          :key="item.gameCompanyId"
          :label="item.gameCompanyName"
          :value="item.gameCompanyId"
        ></el-option>
      </el-select>
    </div>
    <div class="recharge" style="margin-top: 14px;">
        <div>
          <span class="title">{{$t('member.onlineDeposit.os5')}}</span>
          <span class="tmux">{{$t('member.onlineDeposit.od6')}}</span>
        </div>
        <div class="input-panel">
          <span style="font-size: 16px">
            <b>{{$t('symbol.t1')}}</b>
          </span>
          <input
            type="number"
            v-model="amount"
            class="input-number"
            :placeholder="$t('member.onlineDeposit.os7')"
          >
        </div>
        <div class="recommend" v-if="moneys.length>0">
          <span
            v-for="(item,index) in moneys"
            v-if="index<5"
            :key="index"
            :class="{active: activeAmount==item}"
            @click="amount=item;activeAmount=amount"
          >{{$t('symbol.t1')}}{{ item }}</span>
        </div>
      </div>
      <cube-button @tap="trans" class="trs-btn save-btn">{{$t('member.onlineDeposit.os8')}}</cube-button> <!--立即转账-->
      <cube-button :active="true" @tap="recyc" class="save-btn">{{$t('member.onlineDeposit.os9')}}</cube-button>
  </div>
</template>

<script>
export default {
  name: "Transfer",
  props:['moneys','amount','activeAmount'],
  data() {
    return {
      transferData: [],
      options: [],
      ovalue1: "",
      ovalue2: "",
      value1: "",
      value2: "",
    //   amount:'',
    //   moneys:[]
    };
  },
  methods: {
    createLocalData() {
      this.$http.post("/managerGame/getWalletCoins.json").then(result => {
        if (result.code === 0) {
          this.options = this.transferData = result.data.walletlist;
        }
      });
    },
    selectoptionsa(a) {
      if (this.value2 && a === this.value2) {
        [this.value2, this.ovalue2] = [this.ovalue1, this.ovalue1];
      }
      this.ovalue1 = a;
    },
    selectoptionsb(a) {
      if (this.value1 && a === this.value1) {
        [this.value1, this.ovalue1] = [this.ovalue2, this.ovalue2];
      }
      this.ovalue2 = a;
    },
    recyc (){

    },
    trans(){

    },
     save() {
      // this.$store.dispatch('setIntervals', 30);
      let amount = parseFloat(this.amount);
      let over =
        amount >= this.selectData.minMoney &&
        amount <= this.selectData.maxMoney;
      if (this.tab == "bank") {
        over =
          amount >= this.selectData.minMoney / 100 &&
          amount <= this.selectData.maxMoney / 100;
      }
      let isAjax = this.selectData.isAjax;
      let dopage = this.selectData.doPage;
      let params = {
        apiid: this.selectData.apiid,
        serviceType: this.selectData.serviceType,
        apitypeid: this.selectData.id,
        orderAmount: this.amount,
        s: Math.random()
      };
      if (document.documentElement.payInterval) {
        this.$Message.error("两次充值时间需间隔30s");
        return;
      }
      if (isNaN(amount)) {
        this.$Message.warning(this.$t("member.onlineDeposit.od19")); //您输入的充值金额不正确
        return;
      }
      if (this.tab != "scan" && !over) {
        if (this.tab == "bank") {
          this.$Message.warning(
            //充值金额必须在xxx元内
            this.$t("member.onlineDeposit.od20") +
              this.selectData.minMoney / 100 +
              "~" +
              this.selectData.maxMoney / 100 +
              this.$t("member.onlineDeposit.od21")
          );
        } else {
          this.$Message.warning(
            //充值金额必须在xxx元内
            this.$t("member.onlineDeposit.od20") +
              this.selectData.minMoney +
              "~" +
              this.selectData.maxMoney +
              this.$t("member.onlineDeposit.od21")
          );
        }
        return;
      }
      if (this.tab == "bank") {
        this.now = moment().format("YYYY-MM-DD HH:mm:ss");
        this.vmunderline.companyAccountId = this.selectData.id;
        this.vmunderline.minMoney = this.selectData.minMoney;
        if (
          this.selectData.accountType == 1 ||
          this.selectData.accountType == 2
        ) {
          this.minAmount = parseInt(Math.random() * (99 - 10 + 1) + 10, 10);
          this.vmunderline.orderAmount =
            parseFloat(this.amount) + parseFloat(this.minAmount) / 100;
        } else {
          this.vmunderline.orderAmount = this.amount;
        }

        this.underlineDrawer = true;
        return;
      }
      if (isAjax == 1) {
        this.mWinOpen(
          this.$t("member.onlineDeposit.od26"), //二维码扫描
          () => import("./CreateQrCode"),
          Object.assign({ url: dopage }, params),
          "280",
          null,
          () => {
            this.mWinClose();
          }
        );
      } else if (isAjax == 2) {
        this.mLoading(true);
        this.$http
          .post(dopage, params)
          .then(result => {
            this.mLoading(false);
            if (result.code == "0") {
              let openUrl = decodeURIComponent(result.data.qrcoDepath);
              window.location.href = openUrl;
              // this.$router.push({
              //     name: "CustomerService",
              //     params: {aType: "cz", title:'在线支付', cUrl: openUrl,}
              // });
            } else {
              //请求付款地址失败1
              this.$Message.error(this.$t("member.onlineDeposit.od27"));
            }
          })
          .catch(error => {
            //请求付款地址失败2
            this.$Message.error(this.$t("member.onlineDeposit.od28"));
          });
      } else if (isAjax == 3) {
        this.mLoading(true);
        this.$http
          .post(dopage, params)
          .then(result => {
            this.mLoading(false);
            if (result.code == "0") {
              let openUrl = decodeURIComponent(result.data.qrcoDepath);
              window.location.href = openUrl;
            } else {
              this.$Message.error(this.$t("member.onlineDeposit.od29")); //请求付款地址失败1
            }
          })
          .catch(error => {
            this.$Message.error(this.$t("member.onlineDeposit.od30")); //请求付款地址失败2
          });
      } else {
        this.mOtherCZ(
          this.selectData.url +
            "?u=" +
            (!!this.cLoginUser.username ? this.cLoginUser.username : "")
        );
      }
    },
  },
  created() {
    this.createLocalData();
    this.$parent.moneys = [100,200,500,1000,5000]
    console.info(this.moneys)
  }
};
</script>

<style lang="less" scoped>
.transfer {
  width: 100%;
  margin-top:8px;
  .contain_main {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    .item {
      display: flex;
      width: 92px;
      height: 65px;
      flex-direction: column;
      padding: 10px 0;
       border-bottom: 1px solid #f3f3f3;
      position: relative;
      span.count {
        margin: 5px 0;
        color: #3d7eff;
      }
      span.name {
        font-size: 14px;
        color: #606266;
      }
    }
      .item:not(:nth-child(4n)):after {
        content: '';
        position: absolute;
        left: auto;
        top: auto;
        bottom: 7px;
        right: 0;
        height: 70%;
        width: 1px;
        background-color: #f3f3f3;
    }
    // .item:after {
    //     content: '';
    //     position: absolute;
    //     left: 18px;
    //     top: auto;
    //     bottom: 0;
    //     right: auto;
    //     height: 6px;
    //     width: 105px;
    //     background-color: #f3f3f3;
    // }
    .item:nth-child(4n){
        border-right: none;
    }
    .item:nth-child(4n-3){
        border-left: none;
    }
  }
  .chang_select {
      display: flex;
      justify-content: center;
      margin:30px 0 16px;
       /deep/ .el-select {
        width: 175px;
        height: 40px;
    }
    /deep/ .el-select:nth-child(1) input {
	    background-color: #dbdbdb;
	    border-radius: 2px 0px 0px 2px;
    }
    /deep/ .el-select:nth-child(2) input {
	    background-color: #ededed;
	    border-radius: 0px 2px 2px 0px;
    }

    /deep/ .el-icon-arrow-up:before {
        content: "\E6E1";
        width: 19px;
        height: 12px;
        color: #303133;
        font-weight: bolder;
    }
  }
  .trs-btn{
      background-color: #ededed;
      color: #303133;
  }
 
}
</style>
