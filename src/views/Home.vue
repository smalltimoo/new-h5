<template>
  <div class="home">
    <header-component :showyue="true" :logo="logo" :showIcon="false" :showLogo="true"></header-component>
    <div class="container">
      <div class="slider-wrap">
        <div id="iSlider-wrapper" ref="swipe"></div>
        <div id="hidden-space" style="display:none">
          <p style="font-size:3em;text-align: center;color:#04f512">A node in dom tree.</p>
        </div>
      </div>
      <div class="notice">
        <div class="icon laba">
          <p class="label__num">{{getDate}}</p>
          <p class="label_gonggao">公告</p>
        </div>
        <Divider type="vertical"/>
        <div class="marquee_box">
          <div
            class="list_one"
            style="padding-top:5px;"
            v-if="cGongGaos[0]"
          > <span class="span_icon"></span>{{cGongGaos[0].content}}</div>
           <span class="span_icon icon_gray"></span>
          <div id="scroll_div" class="fl list_other">
            <div id="scroll_begin">{{cLists}}</div>
            <div id="scroll_end"></div>
          </div>
        </div>
      </div>
      <div class="activity" style="padding:0">
        <div class="title">
          <span>{{ $t('home.title1')}}</span>
          <span style="display:none">
            <router-link :to="{name:'Games'}">{{ $t('home.home31')}}</router-link>
          </span>
        </div>
      </div>
      <div class="game_block">
        <router-link
          class="game_link"
          v-for="(item,index) in companyCustomGames"
          :to="{name:'Games',params:{typeId:item.typeId}}"
          :key="index"
        >
          <el-image :src="item.mobileImgUrl" :fit="'cover'">
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
          </el-image>
        </router-link>
      </div>
      <div class="activity">
        <div class="title">
          <span>{{ $t('home.home30')}}</span>
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
import headerComponent from "@/common/Header.vue";
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
    headerComponent,
  },
  props: ["lists"],
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
      num: 2
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
    cLists() {
      let [...temp] = this.cGongGaos;
      temp.shift();
      return temp.length?temp
        .map(item => {
          return item.content;
        })
        .reduce((sum, s) => sum + " " + s):''
    },
    getDate() {
      return new Date().getDate();
    },
    getBanner() {
      var mobileBanner = this.$store.getters.getSysPicObj.mobileBanner;
      var banner = [];
      if (mobileBanner != undefined && mobileBanner != "") {
        let bs = mobileBanner.slice().split(",");
        bs.map(item => {
          // banner.push({ imgUrl: item });
          banner.push({ content: item });
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
      this.$http.post("/webnav.json", {version:2}).then(result => {
        if (result.code == 0) {
          this.companyCustomGames = Object.assign(
            [],
            result.data.companyCustomGametypes.sort((a, b) => {
              a - b;
            })
          );
        }
      });
    },
    activity() {
      this.$http.post("/activities.json", { sysId: 0 }).then(result => {
        if (result.code == 0) {
          this.activities = Object.assign([], result.data.activityVoList);
          let data2 = this.activities.map((item, idx) => {
            item.content = `
                                        <div class="active_title">
                                          <span>${
                                            item.activityTitle
                                          }</span>
                                          <span>${item.endTimeStr}</span>
                                        </div>
                                        <img src="${item.mobileImg}">
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
              animateType: "depth",
              fixPage: false
            }
          );
          self.L.delegate("click", "img", function(ev) {
            ev = ev || window.event;
            let imgUrl = ev.srcElement.currentSrc;
            let item = _this.activities.find(ele => ele.mobileImg == imgUrl);
            _this.$router.push({ name: "Discount", query: { id: item.id } })``;
          });
        }
      });
    },
    closeApp() {
      this.showApp = false;
      localStorage.setItem("showApp", "false");
    },

    //文字横向滚动
    ScrollImgLeft() {console.info('-------------------------------------------------------------------------')
      var speed = 50; //初始化速度 也就是字体的整体滚动速度
      var MyMar = null; //初始化一个变量为空 用来存放获取到的文本内容
      var scroll_begin = document.getElementById("scroll_begin"); //获取滚动的开头id
      var scroll_end = document.getElementById("scroll_end"); //获取滚动的结束id
      var scroll_div = document.getElementById("scroll_div"); //获取整体的开头id
      scroll_end.innerHTML = scroll_begin.innerHTML; //滚动的是html内部的内容,原生知识!
      //定义一个方法
      function Marquee() {
        if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
          scroll_div.scrollLeft -= scroll_begin.offsetWidth;
        else scroll_div.scrollLeft++;
      }
      MyMar = setInterval(Marquee, speed); //给上面的方法设置时间  setInterval
      //鼠标点击这条公告栏的时候,清除上面的方法,让公告栏暂停
      scroll_div.onmouseover = function() {
        clearInterval(MyMar);
      };
      //鼠标点击其他地方的时候,公告栏继续运动
      scroll_div.onmouseout = function() {
        MyMar = setInterval(Marquee, speed);
      };
    },
    neiStyle() {
      setTimeout(() => {
        let self = this;
        let data = this.getBanner;
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
            isDebug: true,
            depth: ".9",
            fixPage: false
          },
          300
        );
        self.S.delegate("click", "img", function(ev) {
          ev = ev || window.event;
          let imgUrl = ev.srcElement.currentSrc;
        });
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
    },
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
    this.requireimg();
    this.$nextTick(vm => {
      this.ScrollImgLeft();
    });

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
    // window.onscroll = function() {
    //   if (document.querySelector(".header")) {
    //     document.querySelector(".header").style.position = "fixed";
    //     document.querySelector(".header").style.marginTop = "0";
    //   }
    // };
  }
};
</script>
<style lang="less" scoped>
.notice {
  width: 348px;
  height: 67px;
  background-color: #ffffff;
  margin: 0px auto 10px;
  box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.05);
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
    .label__num {
      font-size: 24px;
    }
  }
  .label__num {
    width: 60px;
    height: 19px;
    font-size: 24px;
    font-family: SourceHanSansCN-Medium;
    font-size: 12px;
    line-height: 19px;
    letter-spacing: 0px;
    color: #333333;
  }
  .label_gonggao {
    text-align: center;
    width: 60px;
    font-family: SourceHanSansCN-Medium;
    font-size: 12px;
    color: #909399;
    height: 12px;
    line-height: 12px;
    margin-top: 4.5px;
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
    height: 100%; /*关键样式*/
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
    text-align: left;
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
      border-radius: 5px;
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
  // height: 135px;
}
.game_block a.game_link:nth-child(2),
.game_block a.game_link:nth-child(5) {
  width: 137px;
  height: 188px;
  float: left;
  margin-left: 11px;
}
.game_block a.game_link:nth-child(3),
.game_block a.game_link:nth-child(4),
.game_block a.game_link:nth-child(6),
.game_block a.game_link:nth-child(7) {
  width: 204px;
  height: 88px;
  float: right;
  margin-right: 11px;
}
.game_block {
  height: 524px;
}
.game_block a.game_link {
  margin: 6px;
  img {
    width: 100%;
    height: 100%;
  }
}

#iSlider-wrapper2 {
  img {
    width: 312px;
    height: 104px;
    margin: 0 auto;
  }
}

.ivu-poptip-rel {
  margin: 0 5px;
  top: 5px;
}

.list_one,
.list_other {
  height: 50%;
  line-height: 2;
  display: flex;
  align-items: center;
  // transform: translateY(5px);
  overflow: hidden;
}
.list_other  {
  width: 95%;
  margin-left: 5%;
}

#scroll_div {
  // height: 30px;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  background-color: #fff;
  // color: #999999;
  // margin: 1rem 0rem;
  text-align: left;
}
#scroll_begin,
#scroll_end {
  display: inline;
}
</style>
<style lang="less">
#iSlider-wrapper2 ul li {
  width:312px;
  height: 131.5px;
  box-shadow: 0px 2px 11px 1px rgba(0, 0, 0, 0.05);
  padding: 0 7px 4.5px;
  border-radius: 5px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
   .active_title {
    width: 282.623px;
    height: 22px;
  }
  img {
    // width: 312px!important;
    // height: 104px!important;
    width: 282.623px!important;
  height: 94.208px!important;
    border:0;
  }
}
  .active_box {
  width: 282.623px;
  height: 94.208px;
  box-shadow: 0px 2px 11px 1px rgba(0, 0, 0, 0.05);
  padding: 0 7px 4.5px;
  border-radius: 5px;
}
.span_icon {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        margin-right: 6px;
        vertical-align: middle;
        background-color: #3d7eff;
        box-shadow: 0px 4px 14px 0px rgba(79, 139, 248, 0.27);
 }
 .icon_gray {
   background-color: #8cb3ff;
    opacity: 0.5;
    position: absolute;
    left:0;
    bottom: 18px;
 }
</style>

