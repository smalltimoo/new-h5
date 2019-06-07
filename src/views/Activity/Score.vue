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
          <router-link :to="{name:'IndoorTransfer'}">
            <div>
              <img src="../../assets/images/pointmall/jifen4@2x.png" width="30px">
            </div>
            <span>{{this.$t('score.score1')}}</span>
          </router-link>
          <router-link :to="{name:'CapitalRecord'}">
            <div>
              <img src="../../assets/images/pointmall/jifen3@2x.png" width="28px">
            </div>
            <span>{{this.$t('score.score2')}}</span>
          </router-link>
          <router-link :to="{name:'RechargeRecord'}">
            <div>
              <img src="../../assets/images/pointmall/jifen2@2x.png" width="29px">
            </div>
            <span>{{this.$t('score.score3')}}</span>
          </router-link>
          <router-link :to="{name:'TransferRecords'}">
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

