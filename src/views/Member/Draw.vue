<template>
  <div class="main-body lucky" style="margin-top: 0">
    <header-component
      :logo="$t('member.draw.d9')"
      :showIcon="true"
      :showLogo="true"
      :jifen="balanceIntegral"
    ></header-component>
    <div class="top bg-lunpan container">
      <!-- <img class="lucky-img" src="../../assets/images/draw/guize@2x.png"> -->
      <div class="lucky-img">{{ $t('member.draw.d9') }}</div>
      <div class="lucky-score">
        {{ $t('member.draw.d1') }}
        <span v-text="consumptionIntegral"></span>
        {{
        $t('member.draw.d2') }}
      </div>
      <!--每次抽奖消耗 -->
      <!-- 积分-->
      <div class="lucky-score">
        {{ $t('member.draw.d3') }}
        <span v-text="balanceIntegral"></span>
        ,
        {{ $t('member.draw.d4') }}
        <span class="lucky-big" v-text="luckyDrawTimes"></span>
        {{
        $t('member.draw.d5') }}
      </div>
      <!--剩余积分  剩余 -->
      <!--抽奖机会 -->
      <div class="banner">
        <div class="turnplate">
          <div class="item" id="wheel" style="width:100%;height:320px; position: relative">
            <div class="awards-item" v-for="(item,i) in awardsList" :key="i" :style="i | angle">
              <span v-text="item.prizeName"></span>
              <img class="awards-img" :src="item.prizePictureAddress">
            </div>
          </div>
        </div>
        <img class="pointer" @click="draw()" :src="imgurl1" alt="award rotation start" width="76px">
      </div>
    </div>
    <!--<button onclick="showMask();">111</button>-->
    <div class="awards">
      <div class="btns">
        <p
          class="btn"
          :class="{btn_active : btn_active}"
          @click="changeBtn('winner')"
        >{{ $t('member.draw.d6')}}</p>
        <!-- 获奖名单-->
        <p
          class="btn"
          :class="{btn_active : !btn_active}"
          @click="changeBtn('owner')"
        >{{ $t('member.draw.d7')}}</p>
        <!--我的奖品 -->
      </div>
      <div class="awards_info" v-show="btn_active">
        <ul class="awards-ul" id="winnerList">
          <li class="awards-li" v-for="(item,i) in winnerList" :key="i" v-if="item.isWin">
            <span>{{item.winningUser.substring(0,3) +'***'+item.winningUser.substring(item.winningUser.length-3,item.winningUser.length)}}</span>
            <span v-text="item.prizeName"></span>
          </li>
        </ul>
      </div>
      <div class="owner" v-show="!btn_active">
        <ul class="awards-ul" id="ownerList">
          <li class="awards-li" v-for="(item,i) in ownerList" :key="i" v-if="item.isWin">
            <span v-text="item.prizeName" style="width:40%"></span>
            <span v-text="item.luckyDrawTimeStr" style="width:60%"></span>
          </li>
        </ul>
      </div>
      <!-- <img :src="imgurl2" width="50%" style="margin-top: 30px"> -->
      <span class="btnl">活动规则</span>
    </div>
    <div class="rules">
      <p>{{rules.activityConditions}}</p>
      <p>{{rules.prizeDescription}}</p>
      <p>{{rules.activityDescription}}</p>
    </div>
  </div>
</template>

<script>
var _this;
require("../../assets/lib/jQueryRotate.2.2");
require("../../assets/lib/scroll");
import imgurl1 from "../../assets/images/draw/dianwo@3x.png";
import imgurl_en1 from "../../assets/images/draw/dianwo@3x_en.png";
import imgurl2 from "../../assets/images/draw/guize@2x.png";
import imgurl_en2 from "../../assets/images/draw/guize@2x_en.png";
import headerComponent from "@/common/Header.vue";
export default {
  name: "draw",
  data() {
    return {
      rules: {},
      balanceIntegral: 0, //剩余积分
      consumptionIntegral: 0, //抽奖消耗积分
      luckyDrawTimes: 0, //抽奖次数
      awardsList: [], //奖品清单
      winnerList: [], //获奖名单
      ownerList: [], //中奖记录
      btn_active: true,
      drawOldTime: 0,
      drawNewTime: "",

      imgurl1: document.documentElement.lang == "zh" ? imgurl1 : imgurl_en1,
      imgurl2: document.documentElement.lang == "zh" ? imgurl2 : imgurl_en2
    };
  },
  components: {
    headerComponent
  },
  filters: {
    angle(i) {
      var angleNumber =
        i < _this.awardsList.length - 1
          ? 45 * (i + 1) - 25 + i * 0.6
          : 45 * (i + 1) - 25;
      return `transform :rotate(${angleNumber}deg)`;
    }
  },
  methods: {
    mInit() {
      // 用户抽奖信息
      this.$http
        .get("/integralDrawC/queryRouletteSettingList.json")
        .then(result => {
          if (result.code == "0") {
            this.rules = result.data[0];
            this.consumptionIntegral = result.data[0].consumptionIntegral;
          }
        });
      // 用户积分信息
      this.$http.get("/memberUser/memberinfo.json").then(result => {
        if (result.code == "0") {
          this.balanceIntegral = parseInt(result.data.integral / 100);
        }
      });
      // 轮盘奖品
      this.$http.get("/integralDrawC/roulettePrize.json").then(result => {
        if (result.code == "0") {
          this.awardsList = result.data;
        }
      });

      // 中奖名单接口
      this.$http.get("/integralDrawC/getWinningList.json").then(result => {
        if (result.code == "0") {
          console.log(result);
          this.winnerList = result.data;
          this.luckyDrawTimes = result.message <= 0 ? 0 : result.message;
          this.$nextTick(() => {
            awards_scroll();
          });
        }
      });

      // 个人中奖接口
      this.$http
        .post(
          "/integralDrawC/getWinningListById.json",
          JSON.stringify({ limit: 8 })
        )
        .then(result => {
          if (result.code == "0") {
            this.ownerList = result.data;
          }
        });
    },
    draw() {
      this.drawNewTime = new Date().getTime();
      if (this.drawNewTime - this.drawOldTime >= 6000) {
        // this.drawLoading=false;
        this.$http
          .post("/integralDrawC/lotteryDraw.json")
          .then(result => {
            this.drawOldTime = new Date().getTime();
            if (result.code == 0) {
              this.rotateFunc(
                result.message,
                360 - 20 - (360 / 8) * result.message
              );
            }
          })
          .catch(error => {
            this.drawOldTime = new Date().getTime();
            // this.drawLoading=true;
            this.timeOut(error);
          });
      }
    },

    rotateFunc(awards, angle) {
      $(".turnplate").stopRotate();

      $(".turnplate").rotate({
        angle: 0,

        duration: 5000,

        animateTo: angle + 1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^

        callback: function() {
          if (_this.awardsList[awards].isPrize) {
            //恭喜您抽中
            _this.mAlert(
              _this.$t("member.draw.d8") + _this.awardsList[awards].prizeName
            );
          } else {
            _this.mAlert(_this.awardsList[awards].prizeName);
          }
          _this.mInit();
        }
      });
    },
    timeOut(error) {
      $(".turnplate").rotate({
        angle: 0,

        duration: 10000,

        animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的

        callback: function() {
          _this.mAlert(error);
        }
      });
    },

    changeBtn(type) {
      this.btn_active = type == "winner" ? true : false;
      type == "winner" ? awards_scroll() : "";
    }
  },
  created() {
    _this = this;
    this.mInit();
    // this.changelang('imgurl','imgurl1',imgurl1,'png');
    // this.changelang('imgurl','imgurl2',imgurl2,'png');
  },
  beforeDestroy: function() {
    $(".HomeWrapper").removeClass("bg-color");
  }
};

function awards_scroll() {
  $(".awards_info").myScroll({
    speed: 40, //数值越大，速度越慢
    rowHeight: 20 //li的高度
  });
}
</script>
<style>
.bg-color {
  background-color: #ffffff;
}
</style>
<style scoped lang="less">
ul,
ol {
  list-style-type: none;
}

select,
input,
img,
select {
  vertical-align: middle;
}

input {
  font-size: 12px;
}

a {
  text-decoration: none;
  color: #fff;
}

a:hover {
  color: #c00;
  text-decoration: none;
}

.clear {
  clear: both;
}

body {
  background-color: #ffffff;
  margin: 0;
}

.main-body {
  background-color: #ffffff;
  overflow-x: hidden;
  margin-top: -44px;
}

.top {
  background-color: #2a85ff;
  padding: 25px 0 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.lucky-img {
  display: inline-block;
  height: 54px;
  line-height: 54px;
  width: 270px;
  color: #ffffff;
  font-size: 48px;
  text-align: center;
  margin-bottom: 20px;
  -webkit-text-stroke: 1px #fff;
  /* -webkit-text-fill-color: transparent; */
}

.lucky-score {
  color: #ffffff;
  height: 18px;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1px;
}

.lucky-big {
  color: yellow;
  font-size: 16px;
}

.banner {
  display: flex;
  /*width: 85%;*/
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 20px;
  position: relative;
  max-width: 640px;
  justify-content: center;
  align-items: center;
}

.pointer {
  position: absolute;
  z-index: 9;
  /*top: -20%;*/
  /*right: 3%;*/
  /*width: 68%;*/
}

.banner .turnplate {
  display: block;
  width: 320px;
  height: 320px;
  position: relative;
  color: #fff;
  background: url(../../assets/images/draw/zhuangpan@2x.png) no-repeat 50% 0;
  background-size: 320px auto;
  transform: rotate(-20deg);
}

.banner .turnplate img.pointer {
  left: 38%;
  width: 80px;
  top: 31%;
}

.mask_layer {
  display: none;
  position: relative;
  z-index: 10;
}

.mask_layer_bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: #fff;
  z-index: 99;
}

.mask_layer_wrap {
  position: fixed;
  opacity: 0.8;
  top: 1000px;
  left: 50%;
  z-index: 100;
  width: 80%;
  height: 30%;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.mask_layer_cnt {
  right: 50%;
  height: 100%;
  position: relative;
  background: red;
  -webkit-box-shadow: 0px 0px 12px #333;
  box-shadow: 0px 0px 12px #333;
}

.awards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 40%;
  margin-top: -23%;
  background: url(../../assets/images/draw/clould@2x.png) 0 0 no-repeat;
  background-size: 100% auto;
}

.btns {
  display: flex;
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.btn {
  outline: none;
  border: 0;
  border-radius: 5px 5px 0 0;
  background-color: #539fff;
  width: 46%;
  color: #fff;
  height: 33px;
  line-height: 32px;
  letter-spacing: 1px;
  text-align: center;
}

.btn_active {
  background-color: #2a85ff;
}

.awards_info {
  border-radius: 0 0 5px 5px;
  margin-top: -1px;
  width: 80%;
  height: 160px;
  color: #fff;
  background: -webkit-linear-gradient(#2a85ff, #71b1ff); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#2a85ff, #71b1ff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#2a85ff, #71b1ff); /* Firefox 3.6 - 15 */
  background: linear-gradient(#2a85ff, #71b1ff); /* 标准的语法 */
  overflow: hidden;
  /*display: none;*/
}

.awards-ul {
  padding: 10px 20px;
  margin-top: 0px;
  color: #fff;
}

.awards-li {
  height: 20px;
  font-size: 14px;
}

.awards-li span:first-child {
  display: block;
  text-align: left;
  padding-right: 10px;
  float: left;
  width: 40%;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
}

.awards-li span:nth-child(2) {
  display: block;
  text-align: right;
  padding-left: 10px;
  float: right;
  width: 40%;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
}

.rules {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: #ffffff;
  color: #7a7a7a;
  margin: 10px 0 25px 0;
  font-size: 12px;
  margin-top: 20px;
}

.rules > p {
  margin: 10px 0 0 0;
  width: 100%;
  text-align: left;
}

.awards-item {
  position: absolute;
  top: 0;
  left: 115px;
  border: solid 0px red;
  width: 85px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 30px;
  font-size: 13px;
  padding-left: 3px;
}

.awards-img {
  width: 35px;
  margin-top: 10px;
}

.owner {
  border-radius: 0 0 5px 5px;
  margin-top: -1px;
  width: 80%;
  height: 160px;
  background: -webkit-linear-gradient(#2a85ff, #71b1ff); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#2a85ff, #71b1ff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#2a85ff, #71b1ff); /* Firefox 3.6 - 15 */
  background: linear-gradient(#2a85ff, #71b1ff); /* 标准的语法 */
  overflow-y: scroll;
}
.btnl {
  margin: 20px auto;
  width: 176px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3d7eff;
  border-radius: 15px;
  font-family: PingFangSC-Regular;
  font-size: 15px;
  letter-spacing: 0px;
  color: #ffffff;
}
</style>


<style lang="less">
.lucky {
  .header {
    background-color: #3481ff;
    .header-left .icon-menu,
    .header-left .logo,
    .yue {
      color: #fff;
    }
    .yue {
      background-color: #0854eb;
    }
  }
}
</style>
