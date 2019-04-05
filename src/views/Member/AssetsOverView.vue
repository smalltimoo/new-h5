<template>
  <div id="app" v-resize="mOnResize">
    <div class="publicpage">
      <div class="assetsOverview publicpage_view">
        <div
          class="TopHeader"
          style=" color: rgb(255, 255, 255); border-bottom: none;"
        >
          <div id="return">
            <router-link :to="{name:'UserMember'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div>
        </div>
        <section class="el-container">
          <div class="bg el-row">
            <main class="el-main">
              <div class="Money el-col el-col-8">
                <div class="grid-content bg-purple-dark">&nbsp;</div>
              </div>
              <div class="el-col el-col-8">
                <div class="grid-content bg-purple-dark Money">{{walletlist[0].coin / 100}}</div>
                <div class="grid-content bg-purple-dark user">{{ $t('member.assetsOverView.ao1') }}</div><!--总资产(元) -->
              </div>
              <div class="el-col el-col-8">
                <div class="grid-content bg-purple-dark">&nbsp;</div>
              </div>
            </main>
          </div>
        </section>
        <h2><!-- 资金明细-->
          {{ $t('member.assetsOverView.ao2') }}
          <span class="rf" style="padding-right: 15px;" @click="mGetCoin">{{ $t('member.assetsOverView.ao3') }}</span><!--刷新额度 -->
        </h2>
        <div class="transition-game">
          <div class="el-row">
            <div class="gamebox">

              <i><img :src="getmobileLogo" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;"></i ><!--主账户 -->
              {{ $t('member.assetsOverView.ao4') }}
              <span class="gameMoney">{{walletlist[0].coin / 100}}</span>
            </div>
          </div>
          <div
            class="el-row"
            v-for="item in walletlist"
            :key="item.gameCompanyId"
            v-if="item.gameCompanyId>1"
          >
            <div class="gamebox">
              <i>
                <img v-if="item.gameCompanyId == 100" src="/static/images/memberCoin/ag.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 101" src="/static/images/memberCoin/dg.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 102" src="/static/images/memberCoin/BG.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 103" src="/static/images/memberCoin/OG.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 104" src="/static/images/memberCoin/wm.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 105" src="/static/images/memberCoin/ams.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 301" src="/static/images/memberCoin/TCG.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 401" src="/static/images/memberCoin/IBC.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 402" src="/static/images/memberCoin/LXTY.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 502" src="/static/images/memberCoin/TGP.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 700" src="/static/images/memberCoin/FY.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 503" src="/static/images/memberCoin/DT.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 602" src="/static/images/memberCoin/KY.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 504" src="/static/images/memberCoin/jdb.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 1011" src="/static/images/memberCoin/dg.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 1012" src="/static/images/memberCoin/dg.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">
                <img v-else-if="item.gameCompanyId == 1022" src="/static/images/memberCoin/BG.png" style="width:50px;height:50px; margin:4px auto;border-radius: 25px;">

              </i>
              {{item.gameCompanyName}}
              <span class="gameMoney">{{item.coin / 100}}</span>
            </div>
          </div>
        </div>
        <div class="footerNav">
          <div class="el-row">
            <div class="el-col el-col-12">
              <router-link :to="{name:'Withdrawals'}" class="tikuan"> {{ $t('member.assetsOverView.ao5') }}</router-link><!--提款 -->
            </div>
            <div class="el-col el-col-12">
              <router-link :to="{name:'OnlineDeposit'}" class="cunkuan">{{ $t('member.assetsOverView.ao6') }}</router-link><!--存款 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AssetsOverView",
  data() {
    return {
      walletlist: [
        {
          coin: 0
        }
      ]
      //   totalCoins: 0
    };
  },
  mounted() {
    this.mGetCoin();
  },
  computed: {
       getmobileLogo: function() {
          var sysobj = this.$store.getters.getSysPicObj;
          if(sysobj.mobileLogo != undefined){
              return sysobj.mobileLogo;
          }
       },
    },
  methods: {
    mGetCoin() {
      this.mLoading(true);
      this.$http
        .post("/managerGame/getWalletCoins.json")
        .then(result => {
          this.walletlist = result.data.walletlist;
          //   this.totalCoins = result.data.walletlist.reduce(
          //     (totalCoins, next) => {
          //       return (totalCoins.coin || 0) + next.coin;
          //     }
          //   );

          this.mLoading(false);
        })
        .catch(err => {
            //获取余额失败
          this.mAlert( this.$t('member.assetsOverView.ao7') );
        });
    },
    mCallBack() {
      this.$emit("callback");
    },
    mOnResize() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      h = h - this.$refs.TopHeader.clientHeight;
      this.width = w;
      this.height = h;
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
.assetsOverview {
  padding-bottom: 50px;
  width: 100%;
}
.assetsOverview .bg {
  width: 100%;
  height: 170px;
  background: #fff
    url("https://mobile.beike188.com/modelHG/image/zichan_blue.887b1d7.png")
    no-repeat;
  background-size: 100% 100%;
}
.assetsOverview .Money {
  font-size: 22px;
  color: #fff;
  font-weight: 900;
}
.assetsOverview .bg-purple-dark {
  color: #fff;
  line-height: 25px;
}
.assetsOverview h2 {
  height: 35px;
  line-height: 35px;
  text-align: left;
  border-top: 1px solid #33334e;
  padding-left: 15px;
  font-size: 14px;
  background: #545478;
}
.assetsOverview .user {
  font-size: 14px;
}
.assetsOverview .transition-game {
  height: 100%;
  width: 100%;
  /* padding-bottom: 80px; */
  background: #0b0f11;
  overflow: hidden;
}
.assetsOverview .transition-game .el-row {
  position: relative;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #33334e;
  background-color: #545478;
}
.assetsOverview .transition-game .el-row i {
  position: absolute;
  display: inline-block;
  width: 58px;
  height: 59px;
  left: 8px;
  top: 2px;
}
.assetsOverview .transition-game .el-row .gameMoney {
  font-size: 14px;
  float: right;
}
.assetsOverview .transition-game .el-row .gamebox {
  height: 60px;
  line-height: 60px;
  padding-left: 80px;
  padding-right: 15px;
  text-align: left;
  font-size: 14px;
}
.assetsOverview .transition-game .el-row b {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
}
.assetsOverview .footerNav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-top: 5px;
  background: #33334e;
  height: 50px;
}
.assetsOverview .footerNav a {
  display: block;
  font-size: 18px;
  width: 85%;
  background: #fff;
  height: 36px;
  line-height: 36px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  border-radius: 5px;
}
.assetsOverview .footerNav .tikuan {
  background: #33334e;
  border: 1px solid #ffa101;
}
.assetsOverview .footerNav .cunkuan {
  background: #ffb301;
  border: 1px solid #ffc501;
}
.x-icon-game-bg {
  background-position: -224px -444px;
}
.moeny_icon {
  background: url("/static/images/icon_money.png");
  height: 58px;
  width: 58px;
}
</style>
