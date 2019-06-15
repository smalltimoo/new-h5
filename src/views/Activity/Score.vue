<template>
  <div class="score">
    <header-component :logo="logo" :showIcon="false" :showLogo="true"></header-component>
    <div class="container">
      <div class="usercard" >
          <div id="usercard"></div>
      </div>

      <div class="router-panel">
        <!-- <div class="title">{{this.$t('member.userMember.um7')}}</div> -->
        <div class="my-pay">
          <!-- 签到 -->
          <router-link :to="{name:'checkin'}">
            <div>
              <img src="../../assets/images/pointmall/jifen4@2x.png" width="30px">
            </div>
            <span>{{this.$t('score.score1')}}</span>
          </router-link>
          <!-- 积分中心 -->
          <router-link :to="{name:'pointcenter'}">
            <div>
              <img src="../../assets/images/pointmall/jifen3@2x.png" width="28px">
            </div>
            <span>{{this.$t('score.score2')}}</span>
          </router-link>
          <!-- 积分明细 -->
          <router-link :to="{name:'pointdetails'}">
            <div>
              <img src="../../assets/images/pointmall/jifen2@2x.png" width="29px">
            </div>
            <span>{{this.$t('score.score3')}}</span>
          </router-link>
          <!-- 积分订单 -->
          <router-link :to="{name:'pointorder'}">
            <div>
              <img src="../../assets/images/pointmall/jifen1@2x.png" width="32px">
            </div>
            <span>{{this.$t('score.score4')}}</span>
          </router-link>
          <!-- <router-link :to="{name:'WithdrawRecord'}">
            <div>
              <img src="./../assets/images/mycenter/wo10@2x.png" width="30px">
            </div>
            <span>{{this.$t('member.userMember.um12')}}</span>
          </router-link>-->
        </div>
      </div>
      <!-- <div class="pst-top"></div> -->
      <el-divider>{{this.$t('score.score5')}}</el-divider>
      <div class="product">
        <!-- <div class="title">{{$t('score.hotExchange')}}</div> -->
        <ul class="products">
          <li @click="mJumpDraw">
            <div class="product-img">
              <img :src="imgurl" width="105px">
            </div>
            <div
              class="product-name"
              style="height: 54px;line-height: 54px"
            >{{$t('score.luckyDrawer')}}</div>
            <!--<div class="use">-->
            <!--<span></span>-->
            <!--<span></span>-->
            <!--</div>-->
          </li>
          <li v-for="item in productData" :key="item.id" @click="mOrder(item)">
            <div class="product-img">
              <img :src="item.img" height="100%">
            </div>
            <div class="product-name" v-text="item.title"></div>
            <div class="use">
              <span>{{$t('symbol.t1')}}{{item.originalPrice}}</span>
              <span>{{item.currentPrice}} {{$t('score.degits')}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div style="height: 20px;"></div>
    </div>

    <Drawer :closable="false" v-model="record" width="100" class="score-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="record=false"/>
                </div>
                <div class="header-middle" style="font-size: 14px; font-weight: bold">{{$t('score.scoreDetail')}}</div>
                <div class="header-right"></div>
            </div>
            <div class="record-title" v-if="integralLog && integralLog.length>0">
                <span><b>{{$t('score.degits')}}</b></span>
                <span><b>{{$t('score.detail')}}</b></span>
                <span><b>{{$t('score.recordTime')}}</b></span>
            </div>
            <div class="record-title" v-for="(item, index) in integralLog" :key="index" v-if="integralLog.length>0">
                <span v-text="item.integral/100"></span>
                <span>
                    <Tooltip :content="item.remark" placement="top" max-width="200px" v-if="item.remark">
                        {{ item.remark}}
                    </Tooltip>
                </span>
                <span v-text="item.operateTimeStr"></span>
            </div>
            <div  class="no-list" v-if="(!integralLog||integralLog.length==0)" style="top: 0;left: 0;"></div>
        </Drawer>

        <Drawer :closable="false" v-model="order" width="100" class="order-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="order=false"/>
                </div>
                <div class="header-middle" style="font-size: 14px; font-weight: bold">{{$t('score.exchangeRecord')}}
                </div>
                <div class="header-right"></div>
            </div>

            <div class="record-title" v-for="(item, index) in dataList" :key="index" v-if="dataList.length>0">
                <div class="order-title">
                    <span v-text="item.orderTitle"></span>
                    <span v-text="item.stateStr"></span>
                </div>
                <div class="order-content">
                    <img :src="item.orderImg" class="order-img">
                    <div class="order-panel">
                        <span>{{$t('score.orderNumber')}} {{item.orderCode}}</span>
                        <span v-text="item.orderContent"
                              style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 230px"></span>
                        <span v-text="item.shipStateStr"></span>
                    </div>
                </div>
                <div style="height: 35px; line-height:35px;text-align: right; padding-right: 20px;display: flex;justify-content: space-between">
                    <span v-text="item.payTimeStr" style="padding-left: 10px"></span>
                    <span> {{$t('score.all')}}{{item.buyNum}}{{$t('score.products')}} &ensp;&ensp;{{$t('score.expend')}}{{item.totalPrice}}{{$t('score.degits')}}</span>
                </div>
            </div>
            <div  class="no-list" v-if="(!dataList||dataList.length==0)" style="top: 0;left: 0;"></div>
        </Drawer>

        <Drawer :closable="false" v-model="buy" width="100" class="buy-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="buy=false"/>
                </div>
                <div class="header-middle" style="font-size: 14px; font-weight: bold">{{$t('score.confirmOrder')}}</div>
                <div class="header-right"></div>
            </div>
            <div class="buy">
                <router-link :to="{name:'Receiving'}">
                    <div class="receive-address" v-if="hasAddress">
                        <div class="address">{{$t('score.receiveAddress')}}:&ensp; {{hasAddress}}</div>
                        <Icon type="ios-arrow-forward" class="icon-menu" style="font-size: 16px;color: #4c4c4c;"/>
                    </div>
                    <div class="add-address" v-else>
                        <i class="el-icon-circle-plus-outline" style="font-size: 20px"></i>&nbsp;
                        {{$t('score.addAddress')}}
                    </div>
                </router-link>

                <div class="order-content">
                    <img :src="rows.img" class="order-img"/>
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
                <!--<div class="note peisong">-->
                <!--<span>留言备注:</span>-->
                <!--<input type="text" v-model="content" class="text"/>-->
                <!--</div>-->
                <div style="padding: 10px; font-size: 16px"><b>{{$t('score.dingdan')}}</b></div>
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
                <!--<div class="flex content">-->
                <!--<span>运费:</span>-->
                <!--<span>+50 积分</span>-->
                <!--</div>-->
                <div class="flex total">
                    <span>{{$t('score.yingfuheji')}}:</span>
                    <span>{{number * rows.currentPrice}} {{$t('score.degits')}}</span>
                </div>
            </div>
            <div class="pay">
                <span>{{$t('score.yingfujifen')}}:</span>
                <span style="color:#ff0000">
                    {{number * rows.currentPrice }} {{$t('score.degits')}}
                </span>
                <span class="comfirm" @click="confirmOrder">{{$t('score.querendingdan')}}</span>
            </div>
        </Drawer>
  </div>
</template>

<script >
import types from "@/store/mutation-types";
import { mapState } from "vuex";
import headerComponent from "@/common/Header.vue";

export default {
  data() {
    return {
      logo: this.$t('score.score'),
      amount: "",
      agnetLevel: "",
      isDraw: false,
      record: false,
      order: false,
      buy: false,
      swipeinfo:[ {
          content: require("../../assets/images/pointmall/banner@2x.png")
        },
        {
          content: require("../../assets/images/pointmall/banner@2x.png")
        },
        {
          content: require("../../assets/images/pointmall/banner@2x.png")
        }],
      searchVM: {
        typeId: "", //类型
        orderBy: "id desc",
        rows: 20
      },
      vm: {
        integral: 0
      },
      needLogin: true,
      products: [],
      productTypes: [],
      initData: {
        total: 0
      },
      hasAddress: false,
      dataList: [],
      rows: {},
      number: 1,
      integralLog: {},
      imgurl: ""
    };
  },
  components: {
    headerComponent
  },
  mounted() {
    if (!this.toNeedLogin()) {
      return;
    }
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
        this.memberLevel = result.data.memberLevel;
        this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
      }
    });
    this.mMemberAmount();
    this.drawGame();
    this.mGetCoin();
  },
  computed: {
    ...mapState({
      sysPicObj: state => state.common.sysPicObj
    }),
    productData() {
      // if (this.tab == '0') {
      //     return this.products;
      // } else {
      return this.products;
      // }
    }
  },
  methods: {
    mGetCoin() {
      this.mLoading(true);
      this.$http
        .post("/managerGame/getWalletCoins.json")
        .then(result => {
          this.walletlist = result.data.walletlist;
          this.totalCoins = this.walletlist.reduce((x, y) => {
            let coin = y.coin;
            if (y.coin < 0) {
              coin = 0;
            }
            return parseFloat(x + coin || 0);
          }, 0);

          this.mLoading(false);
        })
        .catch(err => {
          this.$Message.warning(this.$t("member.userMember.um24")); //获取余额失败
        });
    },
    drawGame() {
      this.$http
        .get("/integralDrawC/queryRouletteSettingSwitch.json")
        .then(result => {
          if (result.data) {
            this.isDraw = result.data;
          }
        });
    },
    mMemberAmount() {
      if (!this.toNeedLogin()) {
        return;
      }
      this.$http.post("/memberUser/memberamount.json").then(result => {
        if (result.code == 0) {
          this.amount = result.data;
        }
      });
    },
    mLoginOut() {
      //确定要退出账号吗
      this.mConfirm(this.$t("member.userMember.um25"), () => {
        //请稍等...
        this.mLoading(true, this.$t("member.userMember.um26"));
        this.$http.post("/logout.json").then(result => {
          if (result.code === 0) {
            //退出成功！
            this.mMessage(this.$t("member.userMember.um27"), "success", 0.5);
            sessionStorage.removeItem(types.SESSION_TOKEN);
            this.$store.commit(types.SESSION_TOKEN);
            this.mLoading(false);
            this.$router.push({ name: "Home" });
          }
        });
      });
    },
    mInit() {
      this.mLoading(true);
      this.$http.get("/memberUser/memberinfo.json").then(result => {
        if (result.code == 0) {
          this.vm.integral = result.data.integral;
        }
      });
    },
    mIntegralLog() {
      this.record = true;
      this.mLoading(true);
      let params = {
        sysId: this.cLoginUser.sysId,
        memberId: this.cLoginUser.id
      };
      this.$http
        .post("/memberCoin/queryIntegralLogs.json", params)
        .then(result => {
          if (result.code == 0) {
            this.integralLog = result.rows;
          }
        });
    },
    mProductType() {
      this.$http.post("/imp/productTypes.json").then(result => {
        if (result.code == 0) {
          this.productTypes = !!result.data ? result.data : [];
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      let params = Object.assign({}, this.searchVM);
      this.$http.post("/imp/products.json", params).then(result => {
        if (result.code == 0) {
          this.products = !!result.data ? result.data : [];
        }
      });
    },
    mPullScoreDetail() {
      this.order = true;
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/imo/myOrders.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.total;
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
    },
    mJumpDraw() {
      if (!this.toNeedLogin()) {
        return;
      }
      this.$router.push({ name: "Draw" });
    },
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
    neiStyle() {
      setTimeout(() => {
        let self = this;
        let data = this.swipeinfo;
        //轮盘
        self.ScoreS = new iSlider(
          document.getElementById("usercard"),
          data,
          {
            isLooping: 1,
            // isOverspread: 1,
            isAutoplay: true,
            animateTime: 800,
            // animateType: "depth",
            isDebug:true,
            plugins:['dot']
          }
        );
      })
       
    },
  },
  created() {
    this.$store.commit("CHANGE_TAB", "UserMember");
    this.mPullData();
    this.neiStyle()
  }
};
</script>

<style scoped>
.user-member >>> .el-divider--vertical {
  display: inline-block;
  width: 0.5px;
  height: 15px;
  /* margin: 0 0.213333rem; */
  vertical-align: middle;
  position: relative;
  color: #fff;
  margin-top: -19px;
}
</style>

