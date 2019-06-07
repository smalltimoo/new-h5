<template>
  <div class="withdraw">
    <div
      class="user_bank_card"
      :style="{ 'background': 'url(' + require('../../assets/images/withdraw/'+bgDef+'@2x.png') + ') no-repeat center center', 'background-size': '100% 100%'}"
    >
      <!-- <div class="item" v-for="(item ,index) in withdrawData" :key="index">
        <span class="name">{{item.gameCompanyName}}</span>
        <span class="count">{{item.coin}}</span>
      </div>-->
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
          v-model="amount"
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
          @click="amount=item;activeAmount=amount"
        >{{$t('symbol.t1')}}{{ item }}</span>
      </div>
      <div class="can_withdraw">
        <span>
          {{$t('member.onlineDeposit.os11')}}
          <span class="count">{{amount}}</span>
          {{$t('yuan')}}
        </span>
        <span class="all_withdraw">{{$t('member.onlineDeposit.os12')}}</span>
      </div>
      <div>
        <span style="font-size:15px;color:#4c4c4c" class="title">{{$t('member.onlineDeposit.os13')}}</span>
        <span style="font-size:15px;color:#bfc2cc" class="tmux">{{$t('member.onlineDeposit.os14')}}</span>
      </div>
      <div class="passContainer">
        <input type="password">
        <div class="passItem"></div>
        <div class="passItem"></div>
        <div class="passItem"></div>
        <div class="passItem"></div>
        <div class="passItem"></div>
        <div class="passItem"></div>
      </div>
      <cube-button :active="true" @click="save" class="save-btn">{{$t('member.onlineDeposit.od15')}}</cube-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "withdraw",
  props: ["moneys", "amount", "activeAmount"],
  data() {
    return {
      bgDef: "北京银行"
      //   amount:'',
      //   moneys:[]
    };
  },
  methods: {
    createLocalData() {
      this.$http.post("/memberUser/getbindbank.json").then(result => {
        if (result.code === 0) {
          console.info(result);
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
    }
  },
  created() {
    this.createLocalData();
    this.$parent.moneys=[]
  }
};
</script>

<style lang="less" scoped>
.withdraw {
  width: 100%;
  margin-top: 8px;
  .user_bank_card {
    width: 351px;
    height: 175.5px;
    border-radius: 8px;
    margin: 0 auto;
    .item {
      display: flex;
      width: 92px;
      height: 65px;
      flex-direction: column;
      padding: 10px 0;
      border: 1px solid #f3f3f3;
      span.count {
        margin: 5px 0;
        color: #3d7eff;
      }
      span.name {
        font-size: 14px;
        color: #606266;
      }
    }
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
        color: #cd0005;
      }
    }
    .all_withdraw {
      color: #2d8cf0;
    }
  }
  .passContainer {
    // border-bottom: 1px solid #f3f3f3;
    // border-radius: 16px;
    width:351px;
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
}
</style>
