<template>
  <div class="home">
    <!-- <div class="get-app" v-if="sysPicObj.appUrl && showApp">
      <i class="icon-close" style="margin-left: 12px" @click="closeApp"/>
      <div class="img-app">
        <img :src="sysPicObj.mobileLogo" class="img-logo">
        <span style="color:#fff;padding-top: 2px">
          <b>{{ $t('home.home1')}}{{sysPicObj.name}}App</b>
        </span>
        <span>
          <b>{{ $t('home.home2')}}</b>
        </span>
      </div>
      <a class="download" :href="sysPicObj.appUrl" target="_blank">{{ $t('home.home3')}}</a>
    </div> -->
    <header-component :logo="logo" :showIcon="false" :showLogo="true"></header-component>
    <!-- <div class="header" :class="sysPicObj.appUrl && showApp ? 'hasApp' : 'noApp'">
      <div class="header-left">
        <span class="logo">{{logo}}</span>
      </div>
      <div class="header-right">
        <div class="yue">余额:{{yue}}</div>
        <Poptip trigger="click" placement="bottom-end">
          <i class="icon-menu message"></i>
          <ul slot="content">
            <li class="icon-kefu" @click="mOpenCService">{{$t('customservice')}}</li>
            <li class="icon-qq" :style="{display:cQQ1||cQQ2?'block':'none'}">
              <a
                v-if="cQQ1"
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ1+'&version=1&src_type=web'"
              >{{cQQ1}}</a>
              <a
                v-if="cQQ2"
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ2+'&version=1&src_type=web'"
              >{{cQQ2}}</a>
            </li>
            <li class="icon-agent" v-if="agentQQ">
              <a
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'"
              >{{agentQQ}}</a>
            </li>
            <li class="icon-line" v-if="sysInfo.lineUrl">
              <a
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'"
              >{{sysInfo.lineUrl}}</a>
            </li>
          </ul>
        </Poptip>
      </div>
    </div> -->
    <div class="container">
      <div class="slider-wrap">
        <div id="iSlider-wrapper" ref="swipe"></div>
        <div id="hidden-space" style="display:none">
          <p style="font-size:3em;text-align: center;color:#04f512">A node in dom tree.</p>
        </div>
      </div>
      <div class="notice">
        <div class="icon laba">
          <p class="label__num">20</p>
          <p class="label_gonggao">公告</p>
        </div>
        <Divider type="vertical"/>
        <div class="marquee_box">
          <ul class="marquee_list" :style="{ top: -num + 'px'}" :class="{marquee_top:num}">
            <!-- 当显示最后一条的时候（num=0转换布尔类型为false）去掉过渡效果-->
            <li v-for="(item, index) in marqueeList" :key="index">
              <span class="`list_style ${item.ac} `"></span>
              <span>{{item.name}}</span>
              <span>在</span>
              <span class="red">{{item.city}}</span>
              <span>杀敌</span>
              <span class="red">{{item.amount}}</span>
              <span>万</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="activity">
        <div class="title">
          <span>{{ $t('home.title1')}}</span>
          <span>
            <router-link :to="{name:'Discount'}">{{ $t('home.home31')}}</router-link>
          </span>
        </div>
      </div>
      <div class="game_block">
        <router-link  class="game_link" v-for="(img,index) in imgSrcs" :to="{name:'Games'}"  :key="index" @click="this.$router.push({'name':'Games',params:{}})">
            <img :src="img">
        </router-link>
        
      </div>
      <div class="activity">
        <div class="title">
          <span>{{ $t('home.title2')}}</span>
          <span>
            <router-link :to="{name:'Discount'}">{{ $t('home.more')}}</router-link>
          </span>
        </div>
      </div>
      <div class="container activity-panel">
        <div class="slider-wrap">
          <div id="iSlider-wrapper2" ref="swipe"></div>
          <div id="hidden-space2" style="display:none">
            <p style="font-size:3em;text-align: center;color:#04f512">A node in dom tree.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let _this;
import { mapState } from "vuex";
require("islider.js");
import message from "@/mixins/message";
import types from "../store/mutation-types";
import  headerComponent from '@/common/Header.vue'
function StartGameForIframe(gameId) {
  _this.mEnterGame(gameId);
}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (event.data == "StartGameForIframe101") {
    StartGameForIframe(101);
  }
}

export default {
  name: "Home",
  mixins: [message],
  components: {
    headerComponent
  },
  data() {
    return {
      options: [
        {
          value: "zh",
          label: "简体中文"
        },
        {
          value: "th",
          label: "ไทย"
        }
      ],
      swipeinfo: [
        {
          content: require("../assets/images/2x/lbt@2x.png")
        },
        {
          content: require("../assets/images/2x/lb@2x.png")
        },
        {
          content: require("../assets/images/2x/hd@2x.png")
        }
      ],
      swipeinfo2: [
        {
          content: require("../assets/images/2x/lbt@2x.png"),
          activityTitle: "新会员专享五重好礼",
          endTimeStr: "2019.04.30-2019.10.30"
        },
        {
          content: require("../assets/images/2x/lb@2x.png"),
          activityTitle: "新会员专享五重好礼",
          endTimeStr: "2019.04.30-2019.10.30"
        },
        {
          content: require("../assets/images/2x/hd@2x.png"),
          activityTitle: "新会员专享五重好礼",
          endTimeStr: "2019.04.30-2019.10.30"
        }
      ],
      imgSrcs: [],
      showApp: true,
      gameType: 0,
      isDraw: false,
      agentQQ: "",
      lunBoTus: [],
      activities: [],
      drawBanner: "",
      companyCustomGames: [],
      alert: {},
      swiperOption: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      yue: 2000.0,
      logo: "万豪娱乐",
      num: 2,
      marqueeList: [
        {
          name: "1军",
          city: "北京",
          amount: "10"
        },
        {
          name: "2军",
          city: "上海",
          amount: "20"
        },
        {
          name: "3军",
          city: "广州",
          amount: "30"
        },
        {
          name: "4军",
          city: "重庆",
          amount: "40"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      theme: state => state.common.theme,
      sysPicObj: state => state.common.sysPicObj
    }),
    selectedGames() {
      return Object.values(this.companyCustomGames).filter(item => {
        if (this.gameType == 0) {
          return item.state == 3 || item.state == 2;
        } else if (this.gameType == 2) {
          return item.typeId == 2 || item.typeId == 3;
        } else {
          return this.gameType == item.typeId;
        }
      });
    },
    cGongGaos() {
      return this.$store.getters.getGonggaos;
    },
    getBanner() {
      var mobileBanner = this.$store.getters.getSysPicObj.mobileBanner;
      var banner = [];
      if (mobileBanner != undefined && mobileBanner != "") {
        let bs = mobileBanner.split(",");
        bs.map(item => {
          banner.push({ imgUrl: item });
        });
      }
      return banner;
    },
    cQQ1() {
      let sysInfo = this.$store.getters.getSysInfo;
      this.drawBanner = sysInfo.rouletteSlide;
      this.agentQQ = sysInfo.agentQQ;
      return sysInfo.customQQ ? sysInfo.customQQ : "";
    },
    cQQ2() {
      if (process.env.VUE_APP_ISAPP == "TRUE") {
        let qq = process.env.VUE_APP_QQ;
        return qq ? qq : "";
      }
    }
  },
  methods: {
    changeTheme(theme) {
      this.$store.commit(types.THEME, theme);
    },
    drawGame() {
      this.$http
        .get("/integralDrawC/queryRouletteSettingSwitch.json")
        .then(result => {
          if (result.data) {
            this.isDraw = result.data;
            if (this.isDraw) {
              this.getBanner.push({
                imgUrl: this.drawBanner,
                isDraw: this.isDraw
              });
            }
          }
        });
    },
    mEnterGame(roomId, gameId, comGameType, gameName, gameCompanyId) {
      if (!this.toNeedLogin()) {
        return;
      }
      if (!roomId) {
        roomId = 0;
      }
      if (!gameId) {
        gameId = 0;
      }
      if (!comGameType) {
        comGameType = "";
      }

      // OG和AG会出现域名跳转问题 ios下有问题。
      if (gameCompanyId == 100 || gameCompanyId == 103) {
        this.$http
          .post("/managerGame/getMemberGameUrl.json", {
            gameCompanyId: roomId,
            comGameType: comGameType,
            username: this.cLoginUser.username
          })
          .then(result => {
            if (result.code == 0) {
              let gameUrl = result.data.dgUrl.mobileUrl;
              window.location.href = gameUrl;
            } else {
              this.$Message.error(result.message);
            }
          })
          .catch(error => {
            this.$Message.error(_this.$t("games.gameContainer.gameContainer3"));
          });

        return;
      }

      if (comGameType == 5) {
        this.$router.push({
          name: "GameList",
          params: {
            gameCompanyId: roomId,
            gameName: gameName
          }
        });
      } else {
        this.$router.push({
          name: "GameContainer",
          params: {
            gameCompanyId: roomId,
            gameId: gameId,
            comGameType: comGameType
          }
        });
      }
    },
    allGame() {
      this.$http
        .post("/gamesbytype.json", { playType: -1, state: 1, sysId: 0 })
        .then(result => {
          if (result.code == 0) {
            this.companyCustomGames = Object.assign(
              {},
              result.data.companyCustomGames
            );
          }
        });
    },
    activity() {
      this.$http.post("/activities.json", { sysId: 0 }).then(result => {
        if (result.code == 0) {
          this.activities = Object.assign({}, result.data.activityVoList);
        }
      });
    },
    closeApp() {
      this.showApp = false;
      localStorage.setItem("showApp", "false");
    },
    showMarquee: function(num) {
      this.marqueeList.push(this.marqueeList[0]);
      var max = this.marqueeList.length;
      var that = this;
      let marqueetimer = setInterval(function() {
        num++;
        if (num >= max) {
          num = 0;
        }
        that.num = num * 30;
      }, 2000);
    },
    neiStyle() {
      setTimeout(() => {
        let self = this;
        let data = this.swipeinfo;
        //轮盘
        self.S = new iSlider(
          document.getElementById("iSlider-wrapper"),
          data,
          {
            isLooping: 1,
            // isOverspread: 1,
            isAutoplay: true,
            animateTime: 800,
            animateType: "depth",
            isDebug:true,
            depth:'.9'
          },
          300
        );
        let data2 = this.swipeinfo2.map((item, idx) => {
          item.content = `<div class="active_box" style="width:312px;height:100%;">
                                        <div class="active_title" style="width:100%;height:22px;">
                                          <span style="width: 110px;text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis" >${
                                            item.activityTitle
                                          }</span>
                                          <span>${item.endTimeStr}</span>
                                        </div>
                                        <img src="${item.content}">
                                      </div>
                                      `;
          return item;
        });
        //优惠活动
        self.L = new iSlider(
          document.getElementById("iSlider-wrapper2"),
          data2,
          {
            isLooping: 1,
            isOverspread: 1,
            isAutoplay: true,
            animateTime: 800,
            animateType: "depth"
          }
        );
      });
    },
    requireimg() {
      let tempArr = [
        "cp@2x.png",
        "dz@2x.png",
        "ty@2x.png",
        "qp@2x.png",
        "jj@2x.png",
        "zr@2x.png",
        "by@2x.png"
      ];
      this.imgSrcs = tempArr.map((val, inx) => {
        return require(`../assets/images/2x/${val}`);
      });
    }
  },
  mounted() {
    this.neiStyle();
  },
  created() {
    _this = this;
    this.$store.commit("CHANGE_TAB", "Home");
    this.showApp = localStorage.getItem("showApp") ? false : true;
    this.drawGame();
    this.allGame();
    this.activity();
    // this._initSwiper();
    this.showMarquee(this.num);
    this.requireimg();

    // window.onscroll = function () {
    //     let scrollheight = document.body.scrollTop == 0 ? document.documentElement.scrollTop
    //         : document.body.scrollTop
    //     if (scrollheight >= 44) {
    //         document.querySelector('.header').style.position = 'fixed';
    //         if (_this.sysPicObj.appUrl && _this.showApp) {
    //             document.querySelector('.header').style.marginTop = '0'
    //             document.querySelector('.get-app') ? document.querySelector('.get-app').style.display = 'none' : null
    //         } else {
    //             document.querySelector('.header').style.marginTop = '0';
    //         }

    //     } else {
    //         if (_this.sysPicObj.appUrl && _this.showApp) {
    //             document.querySelector('.header').style.position = 'inherit';
    //             document.querySelector('.header').style.marginTop = '5px';
    //             document.querySelector('.get-app').style.display = 'flex'
    //         } else {
    //             document.querySelector('.header').style.position = 'fixed';
    //             document.querySelector('.header').style.marginTop = '0'
    //         }
    //     }

    // }
  },
  destroyed() {
    _this = undefined;
    window.onscroll = function() {
      if (document.querySelector(".header")) {
        document.querySelector(".header").style.position = "fixed";
        document.querySelector(".header").style.marginTop = "0";
      }
    };
  }
};
</script>
<style lang="less" scoped>


.notice {
  width: 348px;
  height: 67px;
  background-color: #ffffff;
  margin: 0 auto;
  box-shadow: 0px 2px 11px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  ul {
    li {
      // width: 288px;
      height: 13px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 38px;
      letter-spacing: 0px;
      color: #606266;
    }
  }
  .icon.laba {
    padding-top: 15px;
  }
  .label_num {
    width: 60px;
    height: 19px;
    font-family: SourceHanSansCN-Medium;
    font-size: 12px;
    line-height: 19px;
    letter-spacing: 0px;
    color: #333333;
  }
  .label_gonggao {
    text-align: center;
    width: 60px;
    height: 24px;
    font-family: SourceHanSansCN-Medium;
    font-size: 12px;
    line-height: 24px;
    color: #909399;
  }
  .list_style {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #c5d9ff;
    margin: 3px 10px;
  }
  .list_style.active {
    background-color: #3d7eff;
  }
  .marquee_box {
    display: block;
    position: relative;
    width: 272px;
    height: 52px; /*关键样式*/
    overflow: hidden;
    float: left;
  }
  .marquee_list {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
  .marquee_top {
    transition: top 0.5s;
  } /*关键样式*/
  .marquee_list li {
    height: 30px; /*关键样式*/
    line-height: 30px; /*关键样式*/
    font-size: 14px;
    padding-left: 20px;
    background-color: #fff;
  }
  .marquee_list li span {
    padding: 0 2px;
  }
  .ivu-divider-vertical {
    width: 1px;
    height: 40px;
    line-height: 30px;
    top: 0.4rem;
    float: left;
  }
}
/*ul wrapper*/
.slider-wrap {
  width: 100%;
  height: 184px;
  #iSlider-wrapper,
  #iSlider-wrapper2 {
    height: 184px;
    width: 100%;
    overflow: hidden;
    position: absolute;
  }

 /deep/ ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      margin: 0;
      padding: 0;
      height: 164px;
      width: 294px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-pack: center;
      -webkit-box-align: center;
      list-style: none;
      img {
        width: 100%;
        height: 100%;
        background-size: cover;
      }
    }
  }
}

.game_block a.game_link:nth-child(1) {
  display: inline-block;
  width: 351px;
  height: 135px;
}
.game_block a.game_link:nth-child(2),
.game_block a.game_link:nth-child(5) {
  width: 137px;
  height: 188px;
  float: left;
  margin-left: 12px;
}
.game_block a.game_link:nth-child(3),
.game_block a.game_link:nth-child(4),
.game_block a.game_link:nth-child(6),
.game_block a.game_link:nth-child(7) {
  width: 204px;
  height: 88px;
  float: right;
  margin-right: 12px;
}
.game_block {
  height: 524px;
}
.game_block a.game_link {
  margin: 7px 4px;
  img{
    width: 100%;
    height: 100%
  }
}

#iSlider-wrapper2 {
  img {
    width: 312px;
    height: 104px;
    margin: 0 auto;
  }
}
.active_box {
  width: 326px;
  height: 135px;
  box-shadow: 0px 2px 11px 1px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  .active_title {
    width: 100%;
    height: 22px;
  }
}
.ivu-poptip-rel {
  margin: 0 5px;
  top: 5px;
}
</style>
