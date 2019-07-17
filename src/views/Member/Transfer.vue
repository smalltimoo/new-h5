<template>
  <div class="transfer">
    <div class="contain_main">
      <div
        class="item"
        v-for="(item ,index) in walletlist"
        :key="index"
        @click="mGetCoin(item,index)"
      >
        <span class="name">{{item.value}}</span>
        <span
          class="count"
          v-loading="item.loading"
          element-loading-spinner="el-icon-loading"
        >{{item.coin}}</span>

        <!-- <span class="count" v-if="item.coin||item.coin === 0">{{item.coin}}</span> -->
        <!-- <van-loading type="spinner" v-else /> -->
      </div>
    </div>
    <div class="chang_select">
      <el-select class="toselect" v-model="vm.walletOut" @change="selectoptionsa" ref="select1">
        <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="vm.walletIn" @change="selectoptionsb" ref="select2">
        <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="recharge" style="margin-top: 14px;">
      <div>
        <span class="title">{{$t('member.onlineDeposit.os5')}}</span>
        <span class="tmux">{{$t('member.onlineDeposit.od6')}}</span>
      </div>
      <div class="input-panel" style="padding:0">
        <span style="font-size: 16px">
          <b>{{$t('symbol.t1')}}</b>
        </span>
        <input
          type="number"
          v-model="vm.dealCoin"
          class="input-number"
          :placeholder="$t('member.onlineDeposit.os7')"
        />
      </div>
      <div class="recommend" v-if="moneys.length>0">
        <span
          v-for="(item,index) in moneys"
          v-if="index<5"
          :key="index"
          :class="{active: activeAmount==item}"
          @click="vm.dealCoin=item;activeAmount=vm.dealCoin"
        >{{$t('symbol.t1')}}{{ item }}</span>
      </div>
    </div>
    <cube-button
      :active="transferbtntype"
      @click="trans"
      class="trs-btn save-btn"
    >{{$t('member.onlineDeposit.os8')}}</cube-button>
    <!--立即转账-->
    <cube-button
      style="margin-top:10px;"
      :active="true"
      @click="recyc"
      class="save-btn"
    >{{$t('member.onlineDeposit.os9')}}</cube-button>
  </div>
</template>

<script>
import { Promise } from 'q';
export default {
  name: "Transfer",
  props: ["moneys", "amount", "activeAmount"],
  data() {
    return {
      walletlist: [],
      options: [],
      ovalue1: "",
      ovalue2: "",
walletlist:[],
      loading: false,
      vm: {
        walletIn: "",
        walletOut: "",
        dealCoin: ""
      }
      //   amount:'',
      //   moneys:[]
    };
  },
  computed:{
    transferbtntype(){
     let flag = this.walletlist.filter(item=>[this.vm.walletIn,this.vm.walletOut].includes(item.id)).every(val=>val.coin!='获取异常')
     return this.vm.dealCoin != ''&& flag
    }
  },
  methods: {
    createLocalData() {
      if(localStorage.getItem('walletcoinsList')){
        this.options = this.walletlist = JSON.parse(localStorage.getItem('walletcoinsList'));
      }else{
        this.mGetCoins()
      }

      // this.$http
      //   .post("/managerGame/getWalletCoinsForLoad.json")
      //   .then(result => {
      //     if (result.code === 0) {

            // this.options = this.walletlist = result.data.gamecompays.map(
            //   (item, index) => {
            //     item.id = String(item.id)
            //     item.loading = true;
            //     item.coin = 0;
            //     return item;
            //   }
            // );
            [this.vm.walletOut,this.vm.walletIn] = [
              this.walletlist[0].id,
              this.walletlist[1].id
            ];
            this.walletlist.forEach((val, index) => {
              if(index) this.mGetCoin(val, index);
              else this.getMemberAmount()
            });
          // }
        // });
    },
    getMemberAmount(){
      this.walletlist[0].loading = true;
      this.walletlist[0].coin = ''
        this.$http
        .get("/memberUser/memberamount.json")
        .then(result => {
          if (result.code === 0) {
            this.walletlist[0].coin = (result["data"]/100).toFixed(2);
          }
          // this.mLoading(false);
          this.walletlist[0].loading = false;
        })
        .catch(err => {
          //获取余额失败
          // this.mAlert(this.$t("member.indoorTransfer.getMoneyError"));
          this.walletlist[0].coin = '获取异常';
          this.walletlist[0].loading = false;
        });
    },
    selectoptionsa(a) {
      if (this.vm.walletIn!==undefined && a === this.vm.walletIn) {
        [this.vm.walletIn, this.ovalue2] = [this.ovalue1, this.ovalue1];
      }
      this.ovalue1 = a;
    },
    selectoptionsb(a) {
      if (this.vm.walletOut!==undefined && a === this.vm.walletOut) {
        [this.vm.walletOut, this.ovalue1] = [this.ovalue2, this.ovalue2];
      }
      this.ovalue2 = a;
    },
    mGetCoin(item, index) {
      // this.mLoading(true);
      item.loading = true;
      item.coin = '';
      this.$http
        .get("/managerGame/getWalletCoin.json?id=" + item.id)
        .then(result => {
          if (result.code === 0) {
            this.walletlist[index].coin = (result["data"]/100).toFixed(2);
          }else{
            this.walletlist[index].coin = '获取异常'
          }
          // this.mLoading(false);
          item.loading = false;
        })
        .catch(err => {
          //获取余额失败
         this.walletlist[index].coin = '获取异常'
         item.loading = false;
        });
    },
    recyc() {
      Promise.all(this.walletlist.forEach((val, index) => {
        if (index) {
          this.vm2 = {
            walletIn: "0",
            walletOut: val.id,
            dealCoin: val.coin
          };
          this.$http
            .post("/managerGame/wallettransferall.json", this.vm2)
            .then(result => {});
        }
      })).then(res=>{
        // this.createLocalData();
      }).catch(err=>{
        //  this.mAlert('余额回收失败');
      }).finally(()=>{
        this.createLocalData();
      })

    },

    trans() {
      if (this.loading) {
        return;
      }
      // if (this.transferType == "") {
      //   //请选择操作方式
      //   this.$Message.warning(this.$t("member.indoorTransfer.it9"));
      //   return;
      // }
      // if (this.wallet == "" || this.wallet <= 0) {
      //   //请选择要操作的钱包
      //   this.$Message.warning(this.$t("member.indoorTransfer.it10"));
      //   return;
      // }
      if (this.vm.dealCoin % 1 != 0) {
        //请输入整数
        this.$Message.warning(this.$t("member.indoorTransfer.inputNumber"));
        return;
      }
      if (this.vm.dealCoin < 1) {
        //转账金额必须大于1元
        this.$Message.warning(this.$t("member.indoorTransfer.it11"));
        return;
      }
      // if (this.transferType == 0) {
      //   this.vm.walletIn = this.wallet;
      //   this.vm.walletOut = 0;
      // } else if (this.transferType == 1) {
      //   this.vm.walletIn = 0;
      //   this.vm.walletOut = this.wallet;
      // }
      if (this.vm.walletIn == -1 || this.vm.walletOut == -1) {
        this.$Message.warning(this.$t("member.indoorTransfer.it10"));
        return;
      }
      this.mLoading(true);
      this.loading = true;
      this.$http
        .post("/managerGame/wallettransfer.json", this.vm)
        .then(result => {
          this.mLoading(false);
          this.loading = false;
          if (result.code == 0) {
            // this.mRefreshAccountInfo();
            this.createLocalData();
            this.$Message.success(this.$t("member.indoorTransfer.it12")); //操作成功
            this.mInit();
            this.vm.dealCoin = 0;
            if (result.data < 0) {
              this.$Message.warning(this.$t("member.indoorTransfer.it13")); //记录转账记录失败
            } else if (result.data == 2) {
              this.$Message.warning(this.$t("member.indoorTransfer.it14")); //操作中心账户失败
            } else if (result.data == 3) {
              this.$Message.warning(this.$t("member.indoorTransfer.it15")); //游戏厅操作失败
            } else if (result.data == 4) {
              this.$Message.warning(this.$t("member.indoorTransfer.it16")); //游戏厅未返回，请联系客服
            }
          } else {
            this.$Message.warning(result.message);
          }
        });
    }
  },
  created() {
    this.createLocalData();
    // this.getMemberAmount();
    this.$parent.moneys = [100, 200, 500, 1000, 5000];
    // console.info(this.moneys)
  }
};
</script>

<style lang="less" scoped>
.transfer {
  width: 100%;
  margin-top: 8px;
  .contain_main {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    .item {
      display: flex;
      width: 91.5px;
      height: 59.25px;
      flex-direction: column;
      padding: 10px 0;
      //  border-bottom: 1px solid #f3f3f3;
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
      content: "";
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
    .item:nth-child(4n) {
      border-right: none;
    }
    .item:nth-child(4n-3) {
      border-left: none;
    }
    .item:nth-child(4n-3):before {
      content: "";
      position: absolute;
      left: 20px;
      top: auto;
      bottom: 0px;
      right: 0;
      height: 1px;
      width: 320px;
      background-color: #f3f3f3;
    }
  }
  .chang_select {
    display: flex;
    justify-content: center;
    margin: 30px 0 16px;
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
  .trs-btn {
    background-color: #ededed;
    color: #303133;
  }
  /deep/ .el-loading-spinner {
    top: 0;
    margin-top: 0;
  }
  .toselect:after,
  .toselect:before {
    border: solid transparent;
    content: " ";
    height: 0;
    left: 100%; //根据三角形的位置，可以随意更改。
    position: absolute;
    width: 0;
  }

  .toselect:after {
    border-width: 10px;
    border-left-color: #dbdbdb;
    top: 20px; //根据三角的位置改变
  }

  .toselect:before {
    border-width: 5px;
    border-left-color: #dbdbdb;
    top: 16px;
    z-index: 1;
  }
}
</style>
