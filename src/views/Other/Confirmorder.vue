<template>
  <div class="confirmorder buy-drawer">
    <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="buy">
      <router-link :to="{name:'Receiving'}">
        <div class="receive-address" v-if="hasAddress">
          <div class="address">{{$t('score.receiveAddress')}}:&ensp; {{hasAddress}}</div>
          <Icon type="ios-arrow-forward" class="icon-menu" style="font-size: 16px;color: #4c4c4c;"/>
        </div>
        <div class="add-address" v-else>
          <i class="el-icon-circle-plus-outline" style="font-size: 20px"></i>
          &nbsp;
          {{$t('score.addAddress')}}
        </div>
      </router-link>

      <div class="order-content">
        <img :src="rows.img" class="order-img">
        <div class="order-panel">
          <div class="flex">
            <span>{{rows.title}}</span>
            <span>{{rows.currentPrice}}{{$t('score.degits')}}</span>
          </div>
          <div class="flex">
            <span>{{rows.typeName}}</span>
            <span>{{$t('symbol.t1')}}{{rows.originalPrice}}</span>
          </div>
          <div class="flex">
            <span class="ready">{{$t('score.kucun')}}: {{rows.stockquantity }}</span>
          </div>
        </div>
      </div>
      <div class="flex peisong">
        <span>{{$t('score.peisong')}}</span>
        <span>{{$t('score.guanfang')}}</span>
      </div>
      <div style="padding: 10px; font-size: 16px">
        <b>{{$t('score.dingdan')}}</b>
      </div>
      <div class="flex content">
        <span>{{$t('score.goumai')}}:</span>
        <span class="calculate">
          <div @click="number>0 ? number-- : null">-</div>
          <div>{{ number}}</div>
          <div @click="number<1000 ? number++ : null">+</div>
        </span>
      </div>
      <div class="flex content">
        <span>{{$t('score.yue')}}:</span>
        <span>{{vm.integral/100}} {{$t('score.degits')}}</span>
      </div>
      <div class="flex content">
        <span>{{$t('score.shangpinzonge')}}:</span>
        <span>{{number * rows.currentPrice}} {{$t('score.degits')}}</span>
      </div>
      <div class="flex total">
        <span>{{$t('score.yingfuheji')}}:</span>
        <span>{{number * rows.currentPrice}} {{$t('score.degits')}}</span>
      </div>
    </div>
    <div class="pay">
      <span>{{$t('score.yingfujifen')}}:</span>
      <span style="color:#ff0000">{{number * rows.currentPrice }} {{$t('score.degits')}}</span>
      <span class="comfirm" @click="confirmOrder">{{$t('score.querendingdan')}}</span>
    </div>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
import types from "@/store/mutation-types";
import { mapState } from "vuex";
export default {
  name: "confirmorder",
  components: {
    headerComponent
  },
  computed: {
    ...mapState({
      sysPicObj: state => state.common.sysPicObj,
      callbackUri: state => state.common.callbackUri
    })
  },
  data() {
    return {
      logo: "订单确认",
      hasAddress: false,
      dataList: [],
      rows: {},
      number: 1,
      integralLog: {},
      imgurl: "",
      
      vm: {
        integral: 0
      },
    };
  },
  methods: {
    mOrder(item) {
      if (!this.toNeedLogin()) {
        return;
      }
      this.hasMemberAddress();
      this.buy = true;
      this.number = 1;
      this.rows = item;
    },
    confirmOrder() {
      this.$http
        .post("/imo/exchange.json", { id: this.rows.id, buyNum: this.number })
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            //兑换成功！
            this.$Message.success(this.$t("store.order.order12"));
            this.mInit();
            this.mPullData();
            this.mPullScoreDetail();
          } else {
            this.$Message.error(result.message);
          }

          this.buy = false;
        });
    },
    hasMemberAddress() {
      this.$http.get("/memberUser/getMemberAddress.json").then(result => {
        if (result.code == 0) {
          if (!!result.data.id) {
            this.hasAddress = result.data.address;
          } else {
            this.hasAddress = false;
          }
        }
      });
    },
  },
  created() {
    // this.mInit();
  }
};
</script>
<style lang="less" scoped>
.confirmorder {
}
</style>
